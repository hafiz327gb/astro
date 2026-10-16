# Schaefer Reconstruction V1

Research workspace for the lunar-crescent visibility reconstruction based on Bradley E. Schaefer's published visibility framework.

## Status

Current code is **RECONSTRUCTED**, not a claim to reproduce proprietary LunarCal byte-for-byte.

The model currently contains:
- Observation 186 benchmark (Richardson, 28 Apr 1987; 30.0 N, 90.1 W).
- Astronomy Engine ephemeris geometry.
- Component atmospheric extinction.
- Schaefer sky-brightness equations.
- Blackwell/Schaefer visual-threshold branches currently source-locked for the bright-background regime.
- Hapke-shaped lunar disk numerical reconstruction using Helfenstein & Veverka parameters.
- Schaefer second-moment equivalent target: zeta = sqrt(8 mu).
- First-threshold and best-visibility scan.

## Important limitations

1. Macroscopic roughness currently uses deterministic numerical microfacets. It is not yet the exact closed-form Hapke 1984 roughness correction.
2. Some lower-background/intermediate visual-threshold branches are intentionally left pending rather than guessed.
3. The lunar image shape is Hapke-based but absolute signal is currently normalized using Schaefer's integrated lunar-magnitude relation.
4. Results must be regression-tested against Schaefer's published R values before scientific use.

## Files

- schaefer_reconstruction_v1_1.js — numerical core.
- schaefer_v1_1_runner.html — browser benchmark for Observation 186.

Papers in this repository remain the source library. Future research notes, equation sheets, benchmark outputs and code revisions should also be kept here so the project has one persistent source of truth.
