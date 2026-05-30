# Property AI Estimator Web App

A premium, photo-first Nigerian property valuation **web app**. It runs in the browser, is deployable on Vercel, and does not require login, payments, a database, or external AI/API secrets for this phase.

## What the app does

1. Shows a clean landing screen with a **Start Property Estimate** button.
2. Guides the user through a simple app-like flow:
   - Property photos
   - Location
   - Property basics
   - Optional value factors
   - AI-assisted valuation result
3. Produces an explainable estimate range in Nigerian Naira:
   - Low estimate
   - Midpoint estimate
   - High estimate
   - Confidence score
   - Positive value drivers
   - Risk factors
   - Assumptions
   - Professional valuation disclaimer

## Important product notes

- This is a browser-based responsive **web app**, not a mobile app build.
- No Android, iOS, Flutter, React Native, APK, app-store, or native mobile tooling is used.
- No uploaded photos leave the browser in this phase.
- Photos improve the displayed confidence score and user experience only; there is no real external AI image analysis yet.
- **No new secrets are required for this phase.**

## Current tech stack

- Static HTML (`index.html`)
- Plain JavaScript (`app.js`)
- Plain CSS (`style.css`)
- Editable JSON pricing config (`data/location-pricing.json`)
- Web manifest and service worker for app-like browser behavior
- Vercel static deployment via `vercel.json`

## Run locally

Because this app fetches `data/location-pricing.json`, run it through a local web server instead of opening `index.html` directly.

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

## Run the location-flow check

A lightweight Node test verifies that the Location step continues without any Replit/backend API call and that the final estimate uses local pricing data:

```bash
node tests/location-flow.test.js
```

## Deploy on Vercel

Vercel can serve this repository as a static web app. The included `vercel.json` routes `/` to `index.html`.

Expected workflow:

- `main` branch remains production.
- Feature branches and pull requests generate Vercel Preview Deployments.
- Test the preview URL before merging into `main`.

## Secrets and environment variables

No external service is required in this phase.

- **No new secrets are required for this phase.**
- `.env.example` is included only to make that clear.
- Do not add real secrets to the repository.

## Updating Nigerian pricing assumptions

The owner-editable pricing file is:

```text
data/location-pricing.json
```

Use it to update:

- Base price by state
- Base price by city/LGA
- Area/neighbourhood base prices
- Property type multipliers
- Condition multipliers
- Finishing multipliers
- Road, power, water, and security adjustments

After editing the JSON file, run the app locally and complete a sample estimate to confirm the result still displays correctly.

## Current limitations

- Estimates are guidance only and are not formal valuation reports.
- No property title verification is performed.
- No external market feed is connected.
- No photos are uploaded or analysed by a real AI vision model in this phase.
- Pricing assumptions are sample values and should be reviewed by a Nigerian real estate professional.
