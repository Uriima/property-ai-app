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

## Subscription-ready preview checks

This phase includes a browser-only free-test limit and a development paid-user placeholder:

```text
property_ai_free_test_used
property_ai_paid_user
```

Before testing the Vercel Preview as a new user, open the browser developer console and run:

```js
localStorage.removeItem("property_ai_free_test_used");
localStorage.removeItem("property_ai_paid_user");
```

Preview reviewers should confirm:

1. The first estimate displays as view-only and report download is disabled.
2. Another estimate attempt opens the Starter subscription prompt beginning at **₦2,000/month**.
3. The Subscribe CTA explains that checkout is still being prepared and directs users to Tafid Real Estate.
4. Setting `localStorage.setItem("property_ai_paid_user", "true")` allows repeat valuations and enables the preliminary text-report download.
5. Mobile preview widths show the paywall without horizontal overflow.

**No payment gateway is integrated in this phase.** A future production payment integration should use Paystack or Flutterwave. Do not treat the development paid-user local storage flag as secure production entitlement storage.

## Property photo screening preview check

The Vercel Preview should be tested with both suitable and unrelated photos. The browser loads pinned TensorFlow.js MobileNet assets from jsDelivr and performs the suitability check on-device. Photos are not uploaded to a backend image-analysis service, and no AI image-analysis secret is required.

Confirm that:

1. A clear property exterior or interior photo can be verified and previewed.
2. A clearly unrelated photo such as a shoe is rejected before valuation.
3. A friendly retry message appears when screening fails or model assets cannot load.
4. The user can still generate an estimate without uploading a photo if they did not attempt to submit an unsuitable image.

This is a lightweight suitability guard, not a formal inspection or custom YOLO property detector.
