/*
 SCHAEFER_RICCO_CVA_V1
 CVA-driven unresolved-crescent reconstruction. No free arc-element length.
 The integration cell along the crescent is theta_CVA(B,S); local width signal
 comes from the calibrated Hapke chord. Eq.36a is evaluated in its integrated
 Ricco form, so arbitrary equivalent target diameter cancels.
 STATUS: DERIVED/RECONSTRUCTED from Schaefer 1993 Eq.36a.
*/
(function(global){'use strict';
if(!global.SchaeferV1||!global.SchaeferLocalAbsoluteV1) throw Error('dependencies missing');
function cvaBrightArcmin(B,S=1){ return (40/60)/S * Math.pow(10,8.28*Math.pow(B,-0.29)); }
function riccoA(B){return Math.max(2.4*Math.pow(B,-0.1),20*Math.pow(B,-0.4));}
function evaluate({date,observer,heightKm=0,kA=.06,kO3=.031,kSky=.20,psiDeg=0,S=1}){
 const g=SchaeferV1.geometry(date,observer);
 const ext=SchaeferV1.lunarExtinction(g.moon.altitude,heightKm,kA,kO3);
 const sky=SchaeferV1.skyBrightness({hSun:g.sun.altitude,hMoon:g.moon.altitude,arcl:g.arcl,k:kSky});
 const ill=Astronomy.Illumination('Moon',date), R=SchaeferV1.moonAngularRadiusArcmin(ill.geo_dist);
 const theta=cvaBrightArcmin(sky.Bsky,S), A=riccoA(sky.Bsky);
 // Integrate exactly one CVA along the local crescent. In the Ricco regime
 // this is the eye-defined unresolved integration element, not a free parameter.
 const sig=SchaeferLocalAbsoluteV1.calibratedStrip({phaseDeg:ill.phase_angle,psiDeg,moonRadiusArcmin:R,extinctionMag:ext.deltaMag,arcElementArcmin:theta});
 const F=sig.elementSignal_nL_arcmin2;
 const V=4*F/(Math.PI*sky.Bsky*A*theta*theta);
 return {date:new Date(date),phaseDeg:ill.phase_angle,psiDeg,hSun:g.sun.altitude,hMoon:g.moon.altitude,arcl:g.arcl,Bsky:sky.Bsky,thetaCVA_arcmin:theta,riccoA:A,Fcell_nL_arcmin2:F,V,status:'DERIVED_RECONSTRUCTED_RICCO_CVA'};
}
global.SchaeferRiccoCVAV1={cvaBrightArcmin,riccoA,evaluate};
})(typeof window!=='undefined'?window:globalThis);