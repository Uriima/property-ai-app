# Deployment Guide

The Property AI Estimator is a static browser web app designed for Vercel.

## Branch and deployment model

- `main` powers the production/live Vercel app.
- Upgrade work should happen on feature branches.
- Pull requests into `main` should be reviewed using the Vercel Preview Deployment.
- Do not merge a pull request until the preview has been tested.

## Vercel configuration

The repository includes:

```text
vercel.json
```

It routes `/` to `index.html`, keeping the app compatible with static Vercel hosting.

## Build settings

No build command is required for this static version.

Suggested Vercel settings:

- Framework preset: Other / Static
- Build command: leave empty
- Output directory: leave empty or repository root, depending on Vercel UI
- Install command: leave empty

## Environment variables and secrets

**No new secrets are required for this phase.**

No environment variables are needed for:

- Local development
- Vercel Preview
- Vercel Production

If future phases add APIs or external services, add placeholder names to `.env.example`, document them here, and add real values only in Vercel Project Settings → Environment Variables.

## How to test a Vercel Preview Deployment

1. Open the preview URL generated for the pull request.
2. Confirm the landing page loads.
3. Click **Start Property Estimate**.
4. Upload or take up to 5 photos.
5. Select Lagos, FCT, Rivers, or Other/manual location.
6. Complete the property basics.
7. Generate the estimate.
8. Confirm the result shows a range, midpoint, confidence score, value drivers, risk factors, assumptions, and disclaimer.
9. Click **Start Another Estimate** and confirm the flow resets.
10. Test on mobile width and desktop width.

## Known limitations for deployment reviewers

- The estimate uses local structured rules, not a live valuation API.
- Uploaded photos are not stored or sent to a backend.
- Pricing assumptions are sample estimates and should be periodically reviewed.
