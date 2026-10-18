/*
 HAPKE_FULL_V1 — rough-surface lunar photometry sensitivity engine.
 Implements Hapke 1984-style bidirectional reflectance components with the
 Helfenstein & Veverka disk-integrated lunar parameter set. This is an
 independent reconstruction, not proprietary LunarCal.
*/
(function(g){'use strict';
const D=Math.PI/180;
const P={w:.21,h:.07,S0:.71,b:.29,c:.39,thetaBarDeg:20};
function H(x,w){const gamma=Math.sqrt(1-w);return (1+2*x)/(1+2*gamma*x);}
function hg1(cosA,b){return (1-b*b)/Math.pow(1+2*b*cosA+b*b,1.5);}
function phase(cosA,b,c){return (1-c)*hg1(cosA,b)+c*hg1(-cosA,b);}
function opposition(alpha,h,S0){return 1+S0/(1+Math.tan(alpha/2)/h);}
function roughWeight(mu0,mu,theta){ // deterministic first-order macroscopic roughness attenuation
 const q=Math.tan(theta); return 1/Math.sqrt((1+q*q*(1-mu0*mu0))*(1+q*q*(1-mu*mu)));
}
function brdf(mu0,mu,alpha,p=P){if(mu0<=0||mu<=0)return 0;const ca=Math.cos(alpha),pp=phase(ca,p.b,p.c),B=opposition(alpha,p.h,p.S0);return p.w/(4*Math.PI)*mu0/(mu0+mu)*(B*pp+H(mu0,p.w)*H(mu,p.w)-1)*roughWeight(mu0,mu,p.thetaBarDeg*D);}
function stripAtPsi(phaseDeg,psiDeg,nx=5001,p=P){const a=phaseDeg*D,y=Math.sin(Math.abs(psiDeg)*D),xm=Math.sqrt(Math.max(0,1-y*y)),dx=2*xm/(nx-1);let sum=0;for(let j=0;j<nx;j++){const x=-xm+j*dx,z=Math.sqrt(Math.max(0,1-x*x-y*y)),mu=z,mu0=x*Math.sin(a)+z*Math.cos(a);if(mu0>0){const wt=(j===0||j===nx-1)?.5:1;sum+=wt*brdf(mu0,mu,a,p)*dx;}}return sum;}
function diskIntegral(phaseDeg,n=501,p=P){const a=phaseDeg*D,step=2/(n-1);let sum=0;for(let iy=0;iy<n;iy++){const y=-1+iy*step;for(let ix=0;ix<n;ix++){const x=-1+ix*step,r2=x*x+y*y;if(r2>1)continue;const z=Math.sqrt(1-r2),mu0=x*Math.sin(a)+z*Math.cos(a);if(mu0<=0)continue;sum+=brdf(mu0,z,a,p)*step*step;}}return sum;}
function centralFractionPerRadius(phaseDeg,p=P){const s=stripAtPsi(phaseDeg,0,5001,p),d=diskIntegral(phaseDeg,501,p);return {strip:s,disk:d,ratio:s/d};}
g.HapkeFullV1={P,brdf,stripAtPsi,diskIntegral,centralFractionPerRadius};
})(typeof window!=='undefined'?window:globalThis);