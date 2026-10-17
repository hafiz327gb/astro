const fs=require('fs'),vm=require('vm'); global.Astronomy=require('astronomy-engine'); vm.runInThisContext(fs.readFileSync('schaefer_reconstruction_v1_1.js','utf8')); vm.runInThisContext(fs.readFileSync('schaefer_local_strip_v1.js','utf8'));
const P=SchaeferLocalStripV1.profiles();
const pick=(p,d)=>SchaeferLocalStripV1.at(p,d);
const out=P.map(p=>({phaseAngleDeg:p.phaseAngleDeg,elongationDeg:p.elongationDeg,
 center:pick(p,0).relative,p30:pick(p,30).relative,p60:pick(p,60).relative,p80:pick(p,80).relative,p89:pick(p,89).relative,
 rawCenter:pick(p,0).signal,raw60:pick(p,60).signal,raw80:pick(p,80).signal}));
fs.writeFileSync('local_strip_result.json',JSON.stringify(out,null,2)); console.log(JSON.stringify(out,null,2));