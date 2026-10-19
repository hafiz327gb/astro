# Observation 186 anisotropic benchmark — run 39227540396

Status: SUCCESSFUL EXECUTION / SCIENTIFIC FAIL.

Results:
- first V>=1 at -25 min: V=1.346, Sun altitude +4.56 deg, Moon altitude +15.04 deg.
- sunset: V=32.70.
- +20 min (ARCL ~11.9 diagnostic epoch): V=223.85.
- best sampled: +30 min, V=366.59.
- published historical Observation 186: R=0.0 +/- 0.5 (borderline visibility).

The morphology-preserving aperture prototype therefore does NOT solve the absolute visibility excess. Its behavior is very close to the earlier Ricco/CVA model (first about -25 min; best hundreds), despite retaining 2-D crescent geometry.

## Scientific conclusion
The dominant error is not:
1. ephemeris geometry,
2. 26.33 mag/arcsec2 photometric zero point,
3. smooth-vs-rough Hapke central spatial weighting,
4. whole-crescent scalar second moment alone,
5. loss of 2-D morphology alone.

The common remaining assumption across the failed local/CVA/anisotropic engines is the mapping of Eq.12 whole-Moon integrated magnitude into a local crescent target flux and then applying Blackwell Eq.36 as if that local flux were the target signal. That bridge is not source-locked to Schaefer's proprietary LunarCal implementation.

Therefore the current project must NOT claim a validated absolute Schaefer R reconstruction. Preserve these engines as diagnostics. The defensible deliverable is a published-equation reconstruction with an explicit unresolved numerator/visual-target bridge, plus empirical validation/calibration as a separate MODIFIED model if desired.

No fitted multiplier should be introduced under the SCHAEFER_RECONSTRUCTION label.
