# Absolute local visibility bridge — design note

## Purpose
Replace the failed whole-crescent equivalent-disk numerator with a local-strip numerator while preserving Schaefer's published definition of R.

Published definition (Doggett & Schaefer 1994 / Schaefer framework):
R = max_t log(B_moon / B_threshold).
R > 0 is the visibility side of the boundary.

## What is source-locked
- Atmospheric extinction remains component-based (Rayleigh/aerosol/ozone).
- Sky background remains Schaefer 1993: night + min(twilight, daylight) + city (+ moonlight where relevant).
- Human threshold remains Blackwell/Schaefer Eq. 36 branches.
- Local lunar morphology is represented by width-integrated Hapke strip signal G(psi), as motivated by Schaefer 1991.

## Critical unresolved bridge
G from LOCAL_STRIP_V1 is currently in normalized Hapke numerical units. The 1991 magnitude-8 length diagnostic can set a *historical length-model zero point*, but that zero point must NOT be imported as the absolute calibration of the full atmospheric visibility model.

For the full model we need a physically consistent conversion:
G_Hapke(psi) -> apparent local lunar illuminance/brightness at the eye,
then compare it to a threshold defined for a local target of specified angular extent.

No undocumented rule for combining multiple visible strips into Schaefer's proprietary single historical R has been recovered. Therefore V1.3 will report:
- V_local(psi,t)
- maxPsi V_local
- contiguous visible arc
- T_first = first time any required contiguous local region reaches threshold
- T_best = time of maximum reconstructed local visibility
and will label any mapping from these quantities to a historical Schaefer R as RECONSTRUCTED.

## Calibration constraints
Observation 186 (Richardson) is a validation target, not a free calibration target:
published R ~= 0.0 +/- 0.5. We must not choose a multiplier solely to force this record to R=0.

Independent constraints:
1. integrated lunar magnitude / total flux;
2. Hapke spatial weighting across the illuminated disk;
3. actual angular pixel/strip area;
4. atmospheric transmission;
5. Blackwell target-size threshold.

## Next implementation
Build LOCAL_ABSOLUTE_V1 by normalizing the Hapke image so its area-integrated signal equals Schaefer's integrated lunar magnitude at the same phase. Then integrate calibrated radiance across a short local arc element. The arc-element length will be exposed as a reconstruction parameter and sensitivity-tested rather than hidden.
