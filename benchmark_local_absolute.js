const fs=require('fs'),vm=require('vm'); global.Astronomy=require('astronomy-engine');
for(const f of ['schaefer_reconstruction_v1_1.js','schaefer_local_strip_v1.js','schaefer_local_absolute_v1.js']) vm.runInThisContext(fs.readFileSync(f,'utf8'));
const phases=[150,160,165,170,172.1]; const R=15.3;
const out=phases.map(phaseDeg=>({phaseDeg,elongationDeg:180-phaseDeg,...SchaeferLocalAbsoluteV1.calibratedStrip({phaseDeg,psiDeg:0,moonRadiusArcmin:R,extinctionMag:0,arcElementArcmin:1})}));
fs.writeFileSync('local_absolute_result.json',JSON.stringify(out,null,2)); console.log(JSON.stringify(out,null,2));