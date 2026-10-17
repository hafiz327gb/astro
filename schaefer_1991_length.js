/*
 SCHAEFER_1991_LENGTH — historical crescent-length diagnostic.
 Status: RECONSTRUCTED from Schaefer (1991) framework using LOCAL_STRIP_V1.1.
 IMPORTANT: the absolute zero-point is isolated as calibration, not silently
 fitted into the physical visibility engine. Default anchor uses the published
 Schaefer result that the central strip reaches the adopted magnitude-8
 threshold at phase angle chi ~= 172.1 deg (elongation ~= 7.9 deg).
*/
(function(global){
'use strict';
if(!global.SchaeferLocalStripV1) throw Error('Load schaefer_local_strip_v1.js first');
const DEFAULTS={thresholdMag:8.0,anchorPhaseDeg:172.1,psiStepDeg:0.25,nx:5001};

function rawProfile(phaseDeg,opt={}){
 const o=Object.assign({},DEFAULTS,opt);
 return SchaeferLocalStripV1.localStripProfile(phaseDeg,{psiStepDeg:o.psiStepDeg,nx:o.nx});
}
function zeroPoint(opt={}){
 const o=Object.assign({},DEFAULTS,opt), p=rawProfile(o.anchorPhaseDeg,o);
 const g0=SchaeferLocalStripV1.at(p,0).signal;
 // m_G = ZP - 2.5 log10(G); set m_G(center, anchor)=thresholdMag.
 return o.thresholdMag+2.5*Math.log10(g0);
}
function profile(phaseDeg,opt={}){
 const o=Object.assign({},DEFAULTS,opt), p=rawProfile(phaseDeg,o), zp=zeroPoint(o);
 const rows=p.rows.map(r=>{
   const mag=r.signal>0 ? zp-2.5*Math.log10(r.signal) : Infinity;
   return Object.assign({},r,{stripMag:mag,visible:mag<=o.thresholdMag});
 });
 let psiMax=0;
 for(const r of rows) if(r.visible) psiMax=Math.max(psiMax,r.psiDeg);
 // symmetric crescent: visible angular arc around midpoint.
 return {phaseAngleDeg:phaseDeg,elongationDeg:180-phaseDeg,zeroPoint:zp,
   thresholdMag:o.thresholdMag,psiMaxDeg:psiMax,visibleArcDeg:2*psiMax,rows};
}
function sweep(){
 return [150,155,160,165,167.5,170,171,172,172.1,172.5,173,175].map(x=>{
   const p=profile(x); const c=SchaeferLocalStripV1.at(p,0);
   return {phaseAngleDeg:x,elongationDeg:180-x,centerStripMag:c.stripMag,
     psiMaxDeg:p.psiMaxDeg,visibleArcDeg:p.visibleArcDeg};
 });
}
global.Schaefer1991Length={DEFAULTS,rawProfile,zeroPoint,profile,sweep};
})(typeof window!=='undefined'?window:globalThis);
