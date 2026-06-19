# Secure Employee Onboarding Form

A client-side encrypted form that collects sensitive employee data and transmits it securely via EmailJS.

## Features

- Password-gated access portal
- Client-side PGP encryption of sensitive data
- Automatic billing address sync with home address
- EmailJS integration for email delivery
- Browser-based encryption (no server-side processing)

## Prerequisites

- **Node.js v24+** (for running local tests)
- **Modern browser** (Chrome, Firefox, Safari, Edge) with JavaScript enabled
- **EmailJS account** with:
  - Public API key
  - Service ID
  - Template ID

## Configuration

Before running, update `script.js` with your credentials:

```javascript
const EMAILJS_PUBLIC_KEY = "your_public_key";      // Replace with your EmailJS public key
const EMAILJS_SERVICE_ID = "your_service_id";      // Replace with your service ID
const EMAILJS_TEMPLATE_ID = "your_template_id";    // Replace with your template ID
const COMPANY_ACCESS_PASSWORD = "ONBOARDING";      // Change this to your desired password
const hrPublicKeyArmored = `...`;                  // Optional: Paste your PGP public key for encryption
```

## Run Local Test

```powershell
cd "C:\Users\NITRO\Desktop\emailjs"
& 'C:\Program Files\nodejs\node.exe' test/test_runner.js
```

Expected output:
```
emailjs.send called: true alerts: 0
TEST PASS: script executed and dispatched as expected.
```

## Use in Browser

1. Open `index.html` in your web browser
2. Enter the access code (default: `ONBOARDING`) to unlock the form
3. Fill in all required fields:
   - Personal info (name, email)
   - ID details (license number, state)
   - Home address
   - Billing address (or use "Same as Home Address" checkbox)
   - Financial info (SSN, bank account, routing number)
4. Click "Lock & Send Securely"
5. Data is encrypted client-side and transmitted via EmailJS
6. Success screen appears when complete

## File Structure

```
emailjs/
├── index.html              # Main form UI
├── script.js               # Form logic, encryption, and EmailJS integration
├── README.md               # This file
└── test/
    └── test_runner.js      # Node.js test harness for script.js
```

## External Libraries

- **EmailJS**: Email delivery service
- **OpenPGP.js**: Client-side PGP encryption (optional, when configured)

## Security Notes

- All encryption happens in the browser before transmission
- No sensitive data is stored on disk or server
- PGP encryption is optional and requires a valid armored public key
- The form password is configurable in `script.js`

## Troubleshooting

**"EmailJS library failed to load"**
- Ensure the CDN script tag is properly included in `index.html`
- Check browser console for network errors

**Test fails with "some expectations not met"**
- Verify all mocked elements in `test_runner.js` match the form IDs in `index.html`
- Check that `script.js` exports all required functions

**Form submission doesn't work**
- Verify EmailJS public key, service ID, and template ID are correct in `script.js`
- Check browser console for error messages
- Ensure OpenPGP library is loaded if PGP encryption is configured
