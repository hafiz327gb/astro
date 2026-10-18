# Schaefer 1991 vs full visibility — quantity separation

## Finding
Primary bibliographic/abstract evidence for Schaefer (1991), *Length of the Lunar Crescent*, confirms that Hapke surface brightness is used to explain cusp fading and a ~7 degree disappearance. A later reconstruction states the historical 1991 diagnostic in terms of **illuminance per unit angular length expressed as a magnitude**, with a fixed threshold near magnitude 8.

This is not the same observable as the 1993 extended-source contrast threshold C(B,zeta), and it is not a license to turn an arbitrary 0.5/1/2 arcmin segment into a circular target.

## Consequence for code
Keep two independent historical/reconstruction paths:
1. SCHAEFER_1991_LENGTH: one-dimensional crescent-length diagnostic; local signal per unit angular length -> magnitude/length -> fixed historical threshold.
2. SCHAEFER_VISIBILITY: full sky-background/eye-threshold model. Its numerator/target integration must be reconstructed from the visibility papers and Blackwell formalism without importing the arbitrary arcElementArcmin bridge.

The failed Observation 186 local visibility run demonstrates why these must not be conflated: doubling the arbitrary segment length nearly doubled V.

## Source-status rule
- Hapke cusp-fading/7-degree conclusion: PRIMARY-SUPPORTED (Schaefer 1991 abstract/record).
- magnitude-8 per-unit-angular-length implementation: SECONDARY-RECONSTRUCTED until exact primary text/equation is recovered.
- finite arc segment -> equivalent circular target: REJECTED experimental bridge for the final model.
