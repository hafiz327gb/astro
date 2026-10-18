# Photometric zero-point audit — correction to prior diagnosis

## Primary-source equations
Schaefer 1993 gives:
- Eq.10: m_v = -16.57 - 2.5 log10(I*), I* in foot-candles.
- Eq.11: I* = 2.95e-7 integral(B dOmega), B in nL and Omega in steradians.
- 1 nL = 26.33 mag per square arcsecond.

## Derivation
For an extended source of uniform surface brightness mu [mag/arcsec^2]:
B[nL] = 10^(0.4(26.33-mu)).
For total magnitude m over angular area A_arcsec2:
m = mu - 2.5 log10(A_arcsec2).
Therefore:
integral B dA_arcsec2 = 10^(0.4(26.33-m)).
Converting arcsec^2 to arcmin^2:
integral B dA_arcmin2 = 10^(0.4(26.33-m))/3600.

Thus the existing function integratedMagnitudeToSignal_nL_arcmin2() is dimensionally correct under its stated units. The previous hypothesis that the /3600 or 26.33 zero point was the dominant error is REJECTED.

Independent Eq.10/Eq.11 check gives the same relation to rounding: 1 arcsec = 4.8481368e-6 rad, so one arcsec^2 = 2.35044e-11 sr. Combining Eq.10 and Eq.11 yields the same integrated zero point near 26.33.

## New diagnosis
Observation 186's V~338 cannot be fixed by changing the magnitude-to-nL conversion. The remaining suspect is the spatial lunar radiance distribution / numerator:
- current local_absolute_v1 normalizes a simplified smooth Hapke surrogate to Eq.12 whole-Moon integrated magnitude;
- Schaefer explicitly says lunar surface brightness requires the highly complex Hapke equations with Helfenstein & Veverka parameters;
- the simplified surrogate can assign far too large a fraction of the Moon's total flux to the central thin-crescent strip.

Next test: compare the fraction of total disk flux placed into the central CVA strip by the current surrogate against a full Hapke rough-surface implementation / published crescent-length photometry. Do not alter the verified 26.33 conversion.

Status:
- 26.33 zero point: ORIGINAL SCHAEFER.
- integrated conversion /3600: DERIVED and VERIFIED.
- current smooth Hapke spatial weighting: RECONSTRUCTED and now primary suspect.
