# Numerator correction — 2026-10-17

Observation 186 automated benchmark passed the ephemeris checks but failed the visibility numerator badly.

## Benchmark result

- lag = 55.55305 min (historical ~55.5 min)
- near ARCL 11.9 deg: ARCL = 11.89856 deg
- hSun = -4.32271 deg
- hMoon = 6.16813 deg
- current DAZ convention = +0.42558 deg (historical dataset ~-0.4 deg; sign convention)
- current model first threshold = ~32 min before sunset
- current Vmax = 1232.32

Therefore astronomy geometry is accepted for V1; the whole-crescent visibility representation is rejected.

## Why the current numerator is rejected

The current code compresses the entire long crescent into one second-moment equivalent circular target (~24.6 arcmin diameter in this benchmark) and normalizes its total signal with an integrated whole-Moon magnitude relation. That is not an acceptable representation of a thin, unresolved crescent strip for naked-eye detection.

Schaefer 1991 instead treats cusp fading through brightness integrated across the local crescent width. Later reconstructions describe the quantity as illuminance per unit angular length G(chi,psi). The signal drops strongly toward the cusps because the crescent becomes narrower/dimmer.

## Replacement architecture: LOCAL_STRIP_V1

Do not use the whole crescent's 2-D second moment as one visual disk.

For each position angle psi along the crescent:
1. Construct the illuminated lunar cross-section normal to the local arc.
2. Compute Hapke-weighted radiance across the local width.
3. Integrate across width to obtain local strip signal G(chi,psi).
4. Represent only a short arc segment (initial diagnostic length 1 arcmin) as the local visual target; do not combine the entire crescent into one 25-arcmin disk.
5. Apply atmospheric extinction to the local signal.
6. Compare each local segment with the Blackwell/Schaefer threshold appropriate to its equivalent angular size and sky brightness.
7. Define local visibility ratio V_local(psi,t).
8. The visible arc is the contiguous region where V_local >= 1.
9. A time is a candidate first-visibility time when at least one physically resolvable/contiguous local region crosses threshold.
10. Keep any rule for combining multiple segments into Schaefer's historical single R explicitly RECONSTRUCTED unless a primary source gives the exact rule.

## Required regression tests

- Observation 186 must no longer become visible ~32 min before sunset merely because total crescent length boosts the equivalent target.
- At ARCL approaching ~7 deg, the visible arc should collapse toward zero as an emergent model behavior, not as a hard cutoff.
- At larger elongation, visible arc length must grow monotonically in the Schaefer-1991 diagnostic test, modulo atmospheric/observer conditions.
- Preserve the already-passing lag/ARCL geometry tests.

## Source status

- Schaefer 1991 use of Hapke lunar surface brightness and physical cusp fading: ORIGINAL framework.
- G(chi,psi) terminology / explicit later reconstruction details: RECONSTRUCTED description.
- 1 arcmin local segment for the first numerical diagnostic: RECONSTRUCTED implementation choice, not claimed as original LunarCal.
