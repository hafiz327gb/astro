# Pakistan First-Visibility Model — Phase 1: observation data contract

Model ID: `MODIFIED_SCHAEFER_PAKISTAN`

The empirical phase must not begin by fitting formulas. First create one reproducible observation table in which every row is one site-evening observation attempt.

## Required raw fields
- record_id
- gregorian_date (local civil date, YYYY-MM-DD)
- hijri_month / hijri_year (labels only; never used as predictors)
- site_name, latitude_deg, longitude_deg, elevation_m
- timezone
- observation_status: SIGHTED | NOT_SIGHTED | UNCERTAIN
- first_seen_local_time (HH:MM:SS when recorded; null otherwise)
- observation_start_local_time / observation_end_local_time when known
- optical_aid: NAKED_EYE | BINOCULAR | TELESCOPE | OTHER | UNKNOWN
- naked_eye_confirmed: true/false/unknown
- observer_count when known
- weather/cloud/haze/transparency notes
- source/reference and free notes

## Derived fields (computed by engine, never hand-entered)
At sunset and at observed first-seen time where available:
Sun/Moon altitude and azimuth, ARCL, ARCV, DAZ, lag, age, topocentric crescent width, illuminated fraction, parallax, semidiameter, atmospheric/extinction variables, Yallop/Bruin/Odeh/Schaefer diagnostics.

## Labels
Primary naked-eye training label:
- positive: naked-eye sighting with usable site/date and credible timing/status.
- negative: explicit naked-eye non-sighting with an adequate observing interval.
- excluded from primary fit: optical-aid-only, uncertain report, missing site/date, or ambiguous non-sighting.

Do NOT treat absence of a report as a negative observation.

## Leakage rules
Hijri month identity, report source identity, observer identity, and any post-observation criterion/classification are not predictors. Observed first-seen time is a target/validation field, not an input to the visibility classifier.

## Split strategy
Split by lunation, not by individual row. All sites from the same lunation must stay in the same fold. This prevents the same Moon geometry from leaking into train and validation sets.

Initial evaluation:
1. leave-one-lunation-out cross-validation while the dataset is small;
2. later reserve the newest ~20% of lunations as a chronological holdout;
3. report sensitivity, specificity, balanced accuracy, Brier score/probability calibration, and timing MAE for positive records with reliable first-seen times.

## First-visibility target
For a fitted probability curve P(visible at time t), define model first visibility only after a threshold is selected on training data:
T_first = first t for which P(t) >= p_threshold.
Threshold selection must occur inside training folds, never on the held-out lunation.

No Richardson-derived multiplier, no hard-coded 7-degree Danjon cutoff, and no mixing historical model outputs into the ground-truth label.
