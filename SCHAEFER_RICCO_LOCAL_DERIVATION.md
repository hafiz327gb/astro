# Ricco-law cancellation and the unresolved crescent

## Source-locked result
Schaefer 1993 Eq. 36a states, for a small uniform circular target,
C_th = A(B) (theta_CVA/zeta)^2,
where A(B)=max(2.4 B^-0.1, 20 B^-0.4).
This is explicitly Ricco's law.

For a uniform equivalent circular target of angular area A_t = pi zeta^2/4,
actual contrast C = (F_t/A_t)/B, where F_t is target-only integrated luminance (luminance x angular area).

Then
V = C/C_th
  = [F_t/(B A_t)] / [A(B) theta_CVA^2/zeta^2]
  = 4 F_t / [pi B A(B) theta_CVA^2].

Therefore zeta cancels exactly in the Ricco regime. The physically relevant quantity is integrated target signal inside the eye's unresolved integration region, not an arbitrary geometric segment length converted to a disk.

## Implication
The failed LOCAL_VISIBILITY_V1 varied nearly linearly with 0.5/1/2 arcmin because it changed F_t by choosing an arbitrary along-arc length while remaining in/near Eq.36a. The correct reconstruction must define the eye's integration region from theta_CVA / PSF / source convolution, not a free arcElementArcmin.

## Next engine rule
For unresolved crescent width:
1. compute calibrated 2-D crescent radiance;
2. convolve/source-combine with atmospheric seeing and eye response per Schaefer second-moment framework;
3. integrate the crescent signal over a resolution element whose scale is theta_CVA(B,S), not a user-selected arc length;
4. in the pure Ricco branch evaluate the integrated-signal form above directly;
5. use resolved branches only when the effective source extent exceeds theta_CVA.

Status: algebraic consequence of ORIGINAL Schaefer Eq.36a + standard contrast definition; the application to a local crescent resolution element is DERIVED/RECONSTRUCTED.
