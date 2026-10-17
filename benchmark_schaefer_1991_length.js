const fs=require('fs'),vm=require('vm'); global.Astronomy=require('astronomy-engine');
for(const f of ['schaefer_reconstruction_v1_1.js','schaefer_local_strip_v1.js','schaefer_1991_length.js']) vm.runInThisContext(fs.readFileSync(f,'utf8'));
const out={meta:{model:'SCHAEFER_1991_LENGTH',status:'RECONSTRUCTED',thresholdMag:8,anchorPhaseDeg:172.1},sweep:Schaefer1991Length.sweep()};
fs.writeFileSync('schaefer_1991_length_result.json',JSON.stringify(out,null,2)); console.log(JSON.stringify(out,null,2));