# Observation 186 Ricco-CVA run 1 — scientific analysis

Run 39144648011 executed successfully.

## Result
- sunset: 1987-04-29T00:35:34.708Z
- moonset: 1987-04-29T01:31:07.891Z
- lag: 55.55305 min
- first V>=1: -25 min relative to sunset
  - Sun altitude +4.5606 deg
  - Moon altitude +15.0404 deg
  - phase angle 168.435 deg
  - Bsky 9.4713e7 nL
  - theta_CVA 0.7314 arcmin
  - integrated CVA-cell signal 1.6421e7 (current photometric units)
  - V=1.079
- maximum in scan: +31 min
  - Sun altitude -6.5714 deg
  - Moon altitude +4.0793 deg
  - Bsky 5980 nL
  - theta_CVA 3.0821 arcmin
  - V=337.695

## Verdict
The CVA/Ricco derivation successfully removes the arbitrary 0.5/1/2 arcmin free parameter, but it does NOT solve the absolute-scale problem. Observation 186 remains predicted visible in daylight and far too easy near optimum compared with the published borderline R~0 +/-0.5.

Therefore the remaining dominant error is upstream of the eye-size cancellation: the conversion
integrated lunar magnitude -> 'nL arcmin^2' in integratedMagnitudeToSignal_nL_arcmin2()
is not yet source-locked and is almost certainly being interpreted with incompatible photometric units/zero points.

The function currently uses:
10^[0.4(26.33-m)] / 3600.
Before any further visibility tuning, derive this conversion from the luminance/magnitude definitions in Schaefer 1993 (or replace it with a directly sourced equation). Do not calibrate a multiplier to Richardson.

Status:
- CVA integration concept: retained.
- absolute signal conversion: REJECTED/PENDING SOURCE-LOCK.
- Observation 186: scientific FAIL for current absolute engine.
