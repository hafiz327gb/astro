# Local-strip diagnostic — run 4

Run: 39019907210
Commit: 0c67b448f5a20ade20c38c21002e59f8ce50c352

## Result

The direct-chord integration removed the false zero/sparse-bin artifact. For every tested elongation (30° down to 5°), the normalized local strip signal now decreases smoothly from crescent midpoint toward the cusp.

Representative normalized profile at elongation 10°:
- psi 0°: 1.0000
- psi 30°: 0.8630
- psi 60°: 0.4932
- psi 80°: 0.1695
- psi 89°: 0.01695

At elongation 7.5°:
- psi 0°: 1.0000
- psi 30°: 0.8636
- psi 60°: 0.4946
- psi 80°: 0.1704
- psi 89°: 0.01706

The *shape* changes little with elongation, but the absolute signal collapses strongly. Midpoint raw signal falls from 8.087e-4 at 30° elongation to 5.321e-5 at 7.5° and 2.341e-5 at 5°. Thus crescent disappearance must emerge from an absolute visual threshold, not from normalized profile shape.

## Interpretation

LOCAL_STRIP geometry now passes the basic cusp-fading sanity check. The next scientific problem is absolute calibration of the local strip signal. Do not normalize each elongation independently when testing Danjon disappearance.

Next:
1. derive/lock conversion from Hapke radiance/integrated strip to an absolute local visual signal;
2. apply direct atmospheric extinction;
3. compare against Schaefer/Blackwell local threshold;
4. compute visible arc and first threshold crossing for Observation 186.

Raw machine-readable values are in benchmarks/local_strip_run4.json.
