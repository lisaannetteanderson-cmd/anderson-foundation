// CONFIGURATION BLOCK (Replace placeholders with your active keys)
const EMAILJS_PUBLIC_KEY = "fNCtgqZEu09Tftmcu";
const EMAILJS_SERVICE_ID = "service_nobkqbc";
const EMAILJS_TEMPLATE_ID = "template_qewfmgu";

// SET YOUR ACCESSIBILITY FORM PASSWORD HERE
const COMPANY_ACCESS_PASSWORD = "ONBOARDING"; 

// PASTE YOUR ARMORED PUBLIC PGP KEY BLOCK BELOW
const hrPublicKeyArmored = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP.js v5.0.0

[PASTE YOUR KEY LINES HERE]
-----END PGP PUBLIC KEY BLOCK-----`;

// Safe Initialization Wrapper: Waits for external window libraries to finish loading
window.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize EmailJS engine safely
    if (typeof emailjs !== 'undefined') {
        // EmailJS expects the public key string directly
        emailjs.init(EMAILJS_PUBLIC_KEY);
    } else {
        console.error("Error: EmailJS library failed to load from CDN.");
    }

    // 2. Firmly bind interactive event elements 
    const unlockButton = document.getElementById('unlockBtn');
    const billingCheckbox = document.getElementById('sameAsHome');
    const mainForm = document.getElementById('onboardingForm');

    if (unlockButton) unlockButton.addEventListener('click', verifyGatePassword);
    if (billingCheckbox) billingCheckbox.addEventListener('change', syncBillingAddress);
    if (mainForm) mainForm.addEventListener('submit', handleFormSubmission);
});

// Authentication gate checker
function verifyGatePassword() {
    const enteredElem = document.getElementById('gatePassword');
    const errorContainer = document.getElementById('passwordError');
    const gateScreen = document.getElementById('gateScreen');
    const formScreen = document.getElementById('formScreen');

    const enteredInput = enteredElem ? enteredElem.value : '';

    if (enteredInput === COMPANY_ACCESS_PASSWORD) {
        if (gateScreen) gateScreen.classList.add('hidden');
        if (formScreen) formScreen.classList.remove('hidden');
        if (errorContainer) errorContainer.classList.add('hidden');
    } else {
        if (errorContainer) errorContainer.classList.remove('hidden');
    }
}

// Automatically sync billing fields with home inputs
function syncBillingAddress() {
    const checkbox = document.getElementById('sameAsHome');
    if (!checkbox) return;

    const billingStreet = document.getElementById('billingStreet');
    const billingCity = document.getElementById('billingCity');
    const billingState = document.getElementById('billingState');
    const billingZip = document.getElementById('billingZip');

    const homeStreet = document.getElementById('homeStreet');
    const homeCity = document.getElementById('homeCity');
    const homeState = document.getElementById('homeState');
    const homeZip = document.getElementById('homeZip');

    if (checkbox.checked) {
        if (billingStreet && homeStreet) billingStreet.value = homeStreet.value;
        if (billingCity && homeCity) billingCity.value = homeCity.value;
        if (billingState && homeState) billingState.value = homeState.value;
        if (billingZip && homeZip) billingZip.value = homeZip.value;
    } else {
        if (billingStreet) billingStreet.value = '';
        if (billingCity) billingCity.value = '';
        if (billingState) billingState.value = '';
        if (billingZip) billingZip.value = '';
    }
}

// Master Encryption & Transmission Core Logic
async function handleFormSubmission(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    if (btn) {
        btn.disabled = true;
        btn.innerText = "Encrypting Form Fields...";
    }

    const empName = document.getElementById('empName').value;
    const empEmail = document.getElementById('empEmail').value;

    // Validation fail-safe to guarantee OpenPGP component is active inside browser window
    if (typeof openpgp === 'undefined') {
        alert("Cryptographic Engine missing. Processing halted for your security.");
        btn.disabled = false;
        btn.innerText = "Lock & Send Securely";
        return;
    }

    try {
        // 1. Structure the raw data block
        const rawSensitiveData = `
=== DECRYPTED RECORD ===
Full Name: ${empName}
Email: ${empEmail}

-- IDENTIFICATION --
ID Number: ${document.getElementById('idNumber').value}
ID State: ${document.getElementById('idState').value.toUpperCase()}

-- HOME ADDRESS --
Street: ${document.getElementById('homeStreet').value}
City/ST/ZIP: ${document.getElementById('homeCity').value}, ${document.getElementById('homeState').value.toUpperCase()} ${document.getElementById('homeZip').value}

-- BILLING ADDRESS --
Street: ${document.getElementById('billingStreet').value}
City/ST/ZIP: ${document.getElementById('billingCity').value}, ${document.getElementById('billingState').value.toUpperCase()} ${document.getElementById('billingZip').value}

-- FINANCIAL --
SSN: ${document.getElementById('ssn').value}
Bank Account: ${document.getElementById('accountNum').value}
Bank Routing: ${document.getElementById('routingNum').value}
=========================`;

        // 2. Perform client-side localized asymmetric OpenPGP encryption
        const readKeyResult = await openpgp.readKey({ armoredKey: hrPublicKeyArmored });
        const encryptedCiphertext = await openpgp.encrypt({
            message: await openpgp.createMessage({ text: rawSensitiveData }),
            encryptionKeys: readKeyResult
        });

        // 3. Dispatch via EmailJS Wrapper
        if (btn) btn.innerText = "Transmitting to Email Box...";
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            employee_name: empName,
            employee_email: empEmail,
            encrypted_vault_data: encryptedCiphertext
        });

        // 5. Swap UI display views to show the Success Landing screen
        document.getElementById('formScreen').classList.add('hidden');
        document.getElementById('successScreen').classList.remove('hidden');

    } catch (err) {
        alert('Pipeline Failure: ' + err.message);
        console.error(err);
        btn.disabled = false;
        btn.innerText = "Lock & Send Securely";
    }
}
