/*
 LOCAL_STRIP_V1 diagnostic for Schaefer crescent shortening.
 This is a reconstruction diagnostic, not proprietary LunarCal.
 It computes a normalized Hapke-weighted cross-width signal versus position angle.
*/
(function(global){
'use strict';
const D=Math.PI/180, clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
function localStripProfile(phaseAngleDeg, opts={}){
  if(!global.SchaeferV1) throw Error('Load schaefer_reconstruction_v1_1.js first');
  const p=Object.assign({},SchaeferV1.DEFAULTS.hapke,opts.hapke||{});
  const N=opts.grid||301, a=phaseAngleDeg*D, sun=[Math.sin(a),0,Math.cos(a)], obs=[0,0,1];
  const bins=Array.from({length:181},()=>({signal:0,count:0}));
  // Smooth Hapke kernel is used here intentionally: the purpose of this first
  // diagnostic is to test the local-width representation before roughness details.
  for(let iy=0;iy<N;iy++){
    const y=-1+(iy+.5)*2/N;
    for(let ix=0;ix<N;ix++){
      const x=-1+(ix+.5)*2/N, q=x*x+y*y;
      if(q>=1) continue;
      const z=Math.sqrt(1-q), n=[x,y,z], mu0=dot(n,sun), mu=z;
      if(mu0<=0) continue;
      const w=SchaeferV1.hapkeSmooth(mu0,mu,a,p);
      if(!(w>0)) continue;
      // psi=0 at midpoint of bright limb; 90 near cusp. Fold N/S symmetry.
      const psi=Math.atan2(Math.abs(y),Math.abs(x))*180/Math.PI;
      const k=Math.max(0,Math.min(180,Math.round(psi*2)));
      bins[k].signal+=w; bins[k].count++;
    }
  }
  const rows=bins.map((b,k)=>({psiDeg:k/2,signal:b.signal,count:b.count}));
  const max=Math.max(...rows.map(r=>r.signal));
  rows.forEach(r=>r.relative=max?r.signal/max:0);
  return {phaseAngleDeg,elongationDeg:180-phaseAngleDeg,rows};
}
function profiles(){
 return [150,155,160,165,167.5,170,172.5,175].map(localStripProfile);
}
global.SchaeferLocalStripV1={localStripProfile,profiles};
})(typeof window!=='undefined'?window:globalThis);
