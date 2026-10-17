/*
 LOCAL_STRIP_V1.1 diagnostic for Schaefer crescent shortening.
 RECONSTRUCTED diagnostic; not proprietary LunarCal.
 Directly evaluates each requested position angle psi by fixing y=sin(psi)
 and integrating the illuminated lunar chord across x. This removes the
 sparse-bin artifact in v1.0.
*/
(function(global){
'use strict';
const D=Math.PI/180, clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];

function stripAtPsi(phaseAngleDeg,psiDeg,opts={}){
  if(!global.SchaeferV1) throw Error('Load schaefer_reconstruction_v1_1.js first');
  const p=Object.assign({},SchaeferV1.DEFAULTS.hapke,opts.hapke||{});
  const Nx=opts.nx||4001, a=phaseAngleDeg*D;
  const sun=[Math.sin(a),0,Math.cos(a)];
  const y=Math.sin(clamp(Math.abs(psiDeg),0,90)*D);
  const xmax=Math.sqrt(Math.max(0,1-y*y));
  if(xmax===0) return {psiDeg,signal:0,illuminatedWidthNorm:0,samples:0};
  let sum=0, illuminated=0, used=0;
  const dx=2*xmax/Nx;
  for(let i=0;i<Nx;i++){
    const x=-xmax+(i+.5)*dx, q=x*x+y*y;
    if(q>=1) continue;
    const z=Math.sqrt(1-q), n=[x,y,z], mu0=dot(n,sun);
    if(mu0<=0) continue;
    const w=SchaeferV1.hapkeSmooth(mu0,z,a,p);
    if(!(w>0)) continue;
    sum += w*dx;             // width-integrated local signal G(psi), normalized units
    illuminated += dx;
    used++;
  }
  return {psiDeg,signal:sum,illuminatedWidthNorm:illuminated,samples:used};
}

function localStripProfile(phaseAngleDeg,opts={}){
  const step=opts.psiStepDeg||0.5, rows=[];
  for(let psi=0;psi<=90+1e-9;psi+=step) rows.push(stripAtPsi(phaseAngleDeg,psi,opts));
  const max=Math.max(...rows.map(r=>r.signal));
  rows.forEach(r=>r.relative=max?r.signal/max:0);
  return {phaseAngleDeg,elongationDeg:180-phaseAngleDeg,rows};
}
function at(profile,psi){return profile.rows.reduce((a,b)=>Math.abs(b.psiDeg-psi)<Math.abs(a.psiDeg-psi)?b:a)}
function profiles(){return [150,155,160,165,167.5,170,172.5,175].map(x=>localStripProfile(x));}
global.SchaeferLocalStripV1={VERSION:'1.1-direct-chord',stripAtPsi,localStripProfile,profiles,at};
})(typeof window!=='undefined'?window:globalThis);
