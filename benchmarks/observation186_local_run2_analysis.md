# Observation 186 local visibility — run 2 analysis

Run 39095308536 succeeded after the diagnostic-field bug fix.

## Results
Sensitivity to reconstructed along-arc element length:
- 0.5 arcmin: first V>=1 at -21 min; best +25 min; Vbest 72.61.
- 1.0 arcmin: first at -27 min; best +25 min; Vbest 145.21.
- 2.0 arcmin: first at -31 min; best +25 min; Vbest 290.42.

At 1 arcmin first crossing, Sun altitude is +4.97 deg, Moon altitude +15.44 deg, local crescent width ~0.310 arcmin, zeta ~0.628 arcmin, branch 36a.

## Scientific verdict
FAIL as an absolute visibility reconstruction. The local-target geometry removed the previous 25-arcmin equivalent-disk pathology, but the model still predicts naked-eye visibility in daylight and produces an implausibly large best visibility ratio for a published borderline observation (Richardson R~0 +/-0.5).

This isolates a deeper scaling/quantity mismatch: the integrated-magnitude conversion currently called total signal is being treated as nL*arcmin^2/local surface-brightness signal without a fully source-locked photometric unit derivation. The finite arc-element length also scales V almost linearly (0.5/1/2 arcmin -> Vbest ~72.6/145.2/290.4), proving that this arbitrary reconstruction parameter cannot define the final threshold.

## Consequence
Do NOT promote LOCAL_VISIBILITY_V1 to the main Schaefer model. Keep it as a failed diagnostic. Next task is to reconstruct the correct photometric quantity and eye integration rule from Schaefer's equations, rather than tuning an arc length or multiplier to Observation 186.
