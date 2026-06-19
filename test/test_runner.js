const fs = require('fs');
const vm = require('vm');
const path = 'c:\\Users\\NITRO\\Desktop\\emailjs\\script.js';
const code = fs.readFileSync(path, 'utf8');

// Simple spies and mocks
const emailjsCalls = { init: null, send: null };
const emailjs = {
  init: (key) => { emailjsCalls.init = key; },
  send: async (service, template, data) => { emailjsCalls.send = { service, template, data }; return {}; }
};

const fetchCalls = [];
const fetch = async (url, opts) => { fetchCalls.push({ url, opts }); return { ok: true, status: 200, json: async () => ({}) }; };

const openpgp = {
  readKey: async ({ armoredKey }) => ({ fake: 'key', armoredKey }),
  createMessage: async ({ text }) => ({ text }),
  encrypt: async ({ message, encryptionKeys }) => 'ENCRYPTED_CIPHER_TEXT'
};

const alerts = [];
const alert = (msg) => { alerts.push(msg); console.log('ALERT:', msg); };

// Minimal DOM implementation
const elements = {};
function makeElem(id, opts = {}) {
  const el = {
    id,
    value: opts.value || '',
    checked: !!opts.checked,
    classList: {
      classes: new Set(opts.classNames || []),
      add(cls) { this.classes.add(cls); },
      remove(cls) { this.classes.delete(cls); },
      contains(cls) { return this.classes.has(cls); }
    },
    addEventListener(name, cb) { this._cb = cb; },
  };
  elements[id] = el;
  return el;
}

const document = {
  getElementById: (id) => elements[id] || makeElem(id),
};

const window = {
  addEventListener: (ev, cb) => { if (ev === 'DOMContentLoaded') cb(); }
};

// Prepare expected DOM elements used by script.js
[ 'unlockBtn','sameAsHome','onboardingForm','submitBtn','empName','empEmail','idNumber','idState',
  'homeStreet','homeCity','homeState','homeZip','billingStreet','billingCity','billingState','billingZip',
  'ssn','accountNum','routingNum','gatePassword','passwordError','gateScreen','formScreen','successScreen'
].forEach(id => makeElem(id));

// Populate form values
elements['empName'].value = 'Jane Tester';
elements['empEmail'].value = 'jane@example.com';
elements['idNumber'].value = 'A1234567';
elements['idState'].value = 'ca';
elements['homeStreet'].value = '123 Main St';
elements['homeCity'].value = 'Townsville';
elements['homeState'].value = 'ca';
elements['homeZip'].value = '90001';
elements['billingStreet'].value = '';
elements['billingCity'].value = '';
elements['billingState'].value = '';
elements['billingZip'].value = '';
elements['ssn'].value = '123-45-6789';
elements['accountNum'].value = '000111222';
elements['routingNum'].value = '1100001';

// Ensure submit button exists
elements['submitBtn'].value = '';

const context = {
  console,
  emailjs,
  openpgp,
  fetch,
  alert,
  window,
  document,
  setTimeout,
  clearTimeout,
};

vm.createContext(context);

(async () => {
  try {
    // Execute the script in the prepared context
    vm.runInContext(code, context);

    // After load, find the exported handler
    const handler = context.handleFormSubmission;
    if (typeof handler !== 'function') {
      console.error('handleFormSubmission not found in script context.');
      process.exit(2);
    }

    // Call handler with fake event
    await handler({ preventDefault: () => {} });

    // Validate expected calls and UI changes
    const okEmail = !!emailjsCalls.send && emailjsCalls.send.data && emailjsCalls.send.data.encrypted_vault_data;
    const successShown = !elements['successScreen'].classList.contains('hidden') && elements['formScreen'].classList.contains('hidden');

    console.log('emailjs.send called:', !!emailjsCalls.send, 'alerts:', alerts.length);

    if (okEmail && successShown) {
      console.log('TEST PASS: script executed and dispatched as expected.');
      process.exit(0);
    } else {
      console.error('TEST FAIL: some expectations not met. okEmail=', okEmail, 'successShown=', successShown);
      process.exit(3);
    }
  } catch (err) {
    console.error('ERROR during test run:', err);
    process.exit(4);
  }
})();
