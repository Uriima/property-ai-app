# Local Setup Guide

This guide is written for a non-developer owner or reviewer who wants to run and test the Property AI Estimator web app locally.

## Requirements

- A modern browser such as Chrome, Edge, Safari, or Firefox
- Python 3 installed locally, or any simple static web server

No Node.js install is required for the current static version.

## Step-by-step setup

1. Open a terminal in the project folder.
2. Start a local static server:

```bash
python3 -m http.server 4173
```

3. Open this address in your browser:

```text
http://localhost:4173
```

4. Click **Start Property Estimate**.
5. Test the guided flow:
   - Add up to 5 property photos or continue without photos.
   - Select a state, city/LGA, and known area or enter an area manually.
   - Add property basics.
   - Add optional value factors if known.
   - Generate the valuation result.

## Environment variables

**No new secrets are required for this phase.**

There is no database, login provider, payment provider, email service, cloud storage, OpenAI, Gemini, Firebase, Supabase, or Cloudinary requirement.

## Photo upload behavior

- Photos are selected in the browser only.
- Max photos: 5.
- Max file size: 6MB per image.
- Supported image types: browser-supported image files such as JPG, PNG, WEBP, and GIF.
- Mobile browsers should open the camera for **Take Photo** where supported.
- Desktop browsers open the normal file picker.
- Photos are previewed locally and can be removed before estimating.

## Updating pricing assumptions

Open:

```text
data/location-pricing.json
```

To add a new state or city, copy the structure used for Lagos, FCT, or Rivers. For example:

```json
"Example State": {
  "displayName": "Example State",
  "defaultBasePrice": 25000000,
  "cities": {
    "Example LGA": {
      "defaultBasePrice": 30000000,
      "areas": {
        "Example Area": 35000000
      }
    }
  }
}
```

Keep the file valid JSON: use double quotes, commas between items, and no comments inside the JSON.

## Test the subscription-ready access states

The first free estimate and paid placeholder use local browser storage only. No sensitive property details or photos are stored.

### Start as a new user

Open the browser developer console and run:

```js
localStorage.removeItem("property_ai_free_test_used");
localStorage.removeItem("property_ai_paid_user");
```

Then complete one estimate. The result should display in view-only mode and the report download button should be disabled. Starting another estimate should show the Starter subscription prompt beginning at **₦2,000/month**.

### Test the future paid-user placeholder

Open the browser developer console and run:

```js
localStorage.setItem("property_ai_paid_user", "true");
```

Paid-placeholder testing should allow repeat estimates and enable the preliminary text-report download button. This development flag is not a real subscription and must not be exposed as a normal user-facing setting.

**No payment gateway is integrated in this phase.** A future payment phase should use Paystack or Flutterwave and replace the local paid placeholder with authenticated subscription status.
