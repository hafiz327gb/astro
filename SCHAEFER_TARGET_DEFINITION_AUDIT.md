# Target-definition audit: why whole-crescent Eq.25 is not a valid threshold target

The existing reconstruction already implements Schaefer 1993 Eq.25:
zeta = sqrt(8 mu), with seeing second moment added.
It then divides the *entire integrated crescent flux* by the equivalent circular area and applies Eq.36.

That procedure is mathematically valid only when the source can be represented by the circularly symmetric target distribution assumed by the threshold formalism. A thin crescent is highly anisotropic: unresolved across its ~0.3 arcmin width but extended tens of arcminutes along the arc. Its global second moment is dominated by arc length, yielding zeta ~25 arcmin and the known gross overprediction.

The later CVA-cell experiment fixed the global-size pathology but introduced the opposite unsupported assumption: coherent Ricco integration along one full theta_CVA segment. Its failure shows that neither 'whole crescent as one disk' nor 'one arbitrary/local flux cell as a disk' is source-locked.

## Constraint for final reconstruction
Do not reduce the crescent to one scalar zeta before accounting for its 2-D anisotropic brightness distribution. The source must first be convolved with the visual/seeing response, then a local contrast/threshold operation applied to the resulting image (or an exact published Schaefer equivalent if recovered). Only circularly symmetric components may use the simple second-moment addition/equivalent-diameter shortcut without additional derivation.

This explains why the remaining problem is target morphology/visual convolution, not lunar photometric zero point or Hapke weighting.

Status: Eq.25 and Eq.36 are ORIGINAL SCHAEFER; applying them directly to the anisotropic crescent as one disk is a RECONSTRUCTION now rejected by benchmark.
