# Schaefer reconstruction — scientific closure and model boundary

## 1. What is source-locked
The project has independently reproduced the published framework for:
- evening ephemeris geometry and topocentric scan;
- component atmospheric extinction;
- Schaefer sky-brightness framework;
- Eq. 12 integrated lunar magnitude;
- Eq. 20–25 second-moment/equivalent-diameter framework;
- Blackwell/Schaefer Eq. 36 threshold branches currently implemented;
- 26.33 mag arcsec^-2 = 1 nL zero point and its integrated-flux conversion;
- Hapke-based crescent morphology as an imported/reconstructed lunar photometry component.

## 2. What is NOT source-locked
No primary source recovered so far specifies enough detail to reproduce the proprietary LunarCal bridge that turns the highly anisotropic thin crescent into the single target quantity used for Schaefer's published R.

Rejected as final reconstructions by Observation 186:
- whole crescent -> one equivalent circular target;
- arbitrary finite arc segment -> circular target;
- one-CVA Ricco flux cell;
- 2-D crescent + local CVA aperture.

These remain diagnostic experiments only.

## 3. Benchmark closure
Observation 186 geometry reproduces well (lag ~55.55 min; ARCL ~11.90 deg near +20 min).
But absolute visibility does not:
- published historical R = 0.0 +/- 0.5;
- Ricco/CVA reconstruction: first visibility ~-25 min, best V ~338;
- anisotropic reconstruction: first visibility -25 min, sunset V ~32.7, +20 min V ~223.9, best sampled V ~366.6.
Full-vs-smooth Hapke changes the central-strip/total-disk fraction only ~3% near the relevant phase, so Hapke spatial weighting cannot explain the discrepancy.

## 4. Scientific conclusion
A byte-for-byte or numerically validated reproduction of Schaefer/LunarCal R is not justified from the recovered published equations alone. The missing element is the source-locked visual-target/numerator bridge, not ephemeris geometry or the verified photometric zero point.

Therefore:
- SCHAEFER_RECONSTRUCTION = published-equation research model, with unresolved absolute R bridge explicitly flagged.
- SCHAEFER_DIAGNOSTICS = 1991 crescent-length, local strip, Ricco/CVA, anisotropic tests.
- MODIFIED_SCHAEFER = future independently validated/calibrated model; it MUST NOT be labeled original Schaefer and MUST NOT fit a multiplier to one benchmark.

## 5. Calculator path
The practical calculator should keep historical models independent. For the new Pakistan-oriented first-visibility model:
1. scan time continuously around sunset;
2. compute physical/astronomical predictors from the source-locked modules;
3. define first visibility as the first threshold crossing;
4. fit/calibrate only the MODIFIED model against the Pakistan observation dataset using training/validation separation;
5. report uncertainty and model identity;
6. preserve original Bruin/Yallop/Odeh/Schaefer outputs separately for comparison.

This closes the Schaefer reconstruction phase without fabricating undocumented LunarCal internals.
