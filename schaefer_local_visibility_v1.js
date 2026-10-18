/*
 SCHAEFER_LOCAL_VISIBILITY_V1 — reconstructed local-target visibility.
 Uses absolute local strip signal, Schaefer sky, component extinction and
 Blackwell/Schaefer threshold. Arc-element length is explicit sensitivity input.
*/
(function(global){'use strict';
if(!global.SchaeferV1||!global.SchaeferLocalAbsoluteV1) throw Error('dependencies missing');
function evaluate({date,observer,heightKm=0,kA=.06,kO3=.031,kSky=.20,arcElementArcmin=1,psiDeg=0}){
 const g=SchaeferV1.geometry(date,observer), ext=SchaeferV1.lunarExtinction(g.moon.altitude,heightKm,kA,kO3);
 const sky=SchaeferV1.skyBrightness({hSun:g.sun.altitude,hMoon:g.moon.altitude,arcl:g.arcl,k:kSky});
 const ill=Astronomy.Illumination('Moon',date), R=SchaeferV1.moonAngularRadiusArcmin(ill.geo_dist);
 const sig=SchaeferLocalAbsoluteV1.calibratedStrip({phaseDeg:ill.phase_angle,psiDeg,moonRadiusArcmin:R,extinctionMag:ext.deltaMag,arcElementArcmin});
 // Approximate local target area = illuminated strip width * along-arc element.
 // Width comes from the directly illuminated chord fraction times lunar radius.
 const strip=SchaeferLocalStripV1.stripAtPsi(ill.phase_angle,psiDeg,{nx:5001});
 const widthArcmin=strip.illuminatedWidthNorm*R;
 const area=Math.max(1e-12,widthArcmin*arcElementArcmin);
 const Bcres=sig.elementSignal_nL_arcmin2/area;
 // Equivalent circular target preserving local rectangular element area.
 const zeta=2*Math.sqrt(area/Math.PI);
 const th=SchaeferV1.contrastThreshold(sky.Bsky,zeta);
 const Cactual=Bcres/sky.Bsky, V=th.Cth?Cactual/th.Cth:null;
 return {date:new Date(date),g,ext,sky,phaseDeg:ill.phase_angle,moonRadiusArcmin:R,psiDeg,arcElementArcmin,widthArcmin,areaArcmin2:area,zetaArcmin:zeta,Bcres_nL:Bcres,Cactual,Cth:th.Cth,V,thresholdBranch:th.branch,status:'RECONSTRUCTED_LOCAL_TARGET'};
}
global.SchaeferLocalVisibilityV1={evaluate};
})(typeof window!=='undefined'?window:globalThis);