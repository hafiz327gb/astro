/*
 LOCAL_ABSOLUTE_V1 — absolute local crescent signal reconstruction.
 RECONSTRUCTED, transparent bridge: normalize smooth-Hapke disk radiance so
 its area integral equals Schaefer's integrated lunar magnitude at that phase.
 Then integrate a finite local arc element. No Observation-186 fitting.
*/
(function(global){
'use strict';
if(!global.SchaeferV1||!global.SchaeferLocalStripV1) throw Error('Load SchaeferV1 and LocalStrip first');
const D=Math.PI/180;
function diskIntegral(phaseDeg,opt={}){
 const N=opt.n||700, a=phaseDeg*D, sun=[Math.sin(a),0,Math.cos(a)], p=Object.assign({},SchaeferV1.DEFAULTS.hapke,opt.hapke||{});
 let sum=0,area=0; const d=2/N, da=d*d;
 for(let iy=0;iy<N;iy++){const y=-1+(iy+.5)*d;for(let ix=0;ix<N;ix++){const x=-1+(ix+.5)*d,q=x*x+y*y;if(q>=1)continue;const z=Math.sqrt(1-q),mu0=x*sun[0]+z*sun[2];if(mu0<=0)continue;const w=SchaeferV1.hapkeSmooth(mu0,z,a,p);sum+=w*da;area+=da;}}
 return {integral:sum,illuminatedProjectedAreaNorm:area};
}
function calibratedStrip({phaseDeg,psiDeg=0,moonRadiusArcmin,extinctionMag=0,arcElementArcmin=1,opt={}}){
 const strip=SchaeferLocalStripV1.stripAtPsi(phaseDeg,psiDeg,{nx:opt.nx||5001,hapke:opt.hapke});
 const disk=diskIntegral(phaseDeg,opt);
 const mTop=SchaeferV1.schaeferMoonMagnitude(phaseDeg);
 const totalTop=SchaeferV1.integratedMagnitudeToSignal_nL_arcmin2?SchaeferV1.integratedMagnitudeToSignal_nL_arcmin2(mTop):Math.pow(10,.4*(26.33-mTop))/3600;
 const totalGround=totalTop*Math.pow(10,-.4*extinctionMag);
 // diskIntegral uses normalized projected x,y; physical solid-angle scale is R^2.
 // strip.signal integrates dx, so local radiance integrated across width is:
 // totalGround * strip.signal/(disk.integral*R), per arcmin of along-arc length.
 const perArcmin=totalGround*strip.signal/(disk.integral*moonRadiusArcmin);
 const elementSignal=perArcmin*arcElementArcmin;
 return {phaseDeg,psiDeg,mTop,totalTop,totalGround,diskIntegral:disk.integral,stripRaw:strip.signal,
   perArcminSignal_nL_arcmin2_per_arcmin:perArcmin,arcElementArcmin,elementSignal_nL_arcmin2:elementSignal,
   status:'RECONSTRUCTED__INTEGRATED_MAGNITUDE_NORMALIZED_LOCAL_STRIP'};
}
global.SchaeferLocalAbsoluteV1={diskIntegral,calibratedStrip};
})(typeof window!=='undefined'?window:globalThis);
