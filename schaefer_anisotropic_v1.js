/*
 SCHAEFER_ANISOTROPIC_V1
 Experimental 2-D morphology-preserving visibility diagnostic.
 Builds a thin-crescent image from calibrated Hapke weights, smooths with
 atmospheric seeing, then evaluates local circular apertures instead of
 collapsing the entire crescent to one equivalent disk.
 RECONSTRUCTED; not proprietary LunarCal.
*/
(function(g){'use strict';
function gaussian(x,s){return Math.exp(-.5*x*x/(s*s));}
function evaluateGrid({phaseDeg,moonRadiusArcmin,totalSignal,seeingFwhmArcsec=1.5,N=241}){
 const R=moonRadiusArcmin,a=phaseDeg*Math.PI/180,step=2*R/N,sig=(seeingFwhmArcsec/60)/2.35482;
 const pts=[];let raw=0;
 for(let iy=0;iy<N;iy++){const y=-R+(iy+.5)*step;for(let ix=0;ix<N;ix++){const x=-R+(ix+.5)*step,q=(x*x+y*y)/(R*R);if(q>=1)continue;const z=Math.sqrt(1-q),mu0=(x/R)*Math.sin(a)+z*Math.cos(a);if(mu0<=0)continue;const w=SchaeferV1.hapkeSmooth(mu0,z,a,SchaeferV1.DEFAULTS.hapke);if(w>0){pts.push({x,y,w});raw+=w*step*step;}}}
 const scale=totalSignal/raw;return{pts:pts.map(p=>({...p,L:p.w*scale})),step,sigmaSeeingArcmin:sig};
}
function apertureSignal(img,cx,cy,r){let F=0;for(const p of img.pts){const d=Math.hypot(p.x-cx,p.y-cy);/* seeing-aware soft circular aperture */const edge=Math.max(img.sigmaSeeingArcmin,img.step/2),wt=1/(1+Math.exp((d-r)/edge));F+=p.L*img.step*img.step*wt;}return F;}
function scanApertures(img,thetaCVAarcmin){const r=thetaCVAarcmin/2;let best={F:-1,x:0,y:0};/* centers sampled on bright pixels */for(let k=0;k<img.pts.length;k+=Math.max(1,Math.floor(img.pts.length/1500))){const p=img.pts[k],F=apertureSignal(img,p.x,p.y,r);if(F>best.F)best={F,x:p.x,y:p.y};}return best;}
g.SchaeferAnisotropicV1={evaluateGrid,apertureSignal,scanApertures};
})(typeof window!=='undefined'?window:globalThis);