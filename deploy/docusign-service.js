// docusign-service.js — StoneBridge DocuSign Integration
// Uses Authorization Code Grant (JWT-based server-to-server via user consent)

const docusign = require('docusign-esign');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const DS_CLIENT_ID     = process.env.DOCUSIGN_CLIENT_ID;
const DS_CLIENT_SECRET = process.env.DOCUSIGN_CLIENT_SECRET;
const DS_ACCOUNT_ID    = process.env.DOCUSIGN_ACCOUNT_ID;
const DS_USER_ID       = process.env.DOCUSIGN_USER_ID;
const DS_BASE_URI      = process.env.DOCUSIGN_BASE_URI || 'https://na4.docusign.net';
const DS_REDIRECT_URI  = process.env.DOCUSIGN_REDIRECT_URI;

// Token cache
let _accessToken = null;
let _tokenExpiry = 0;

// Token storage path
const TOKEN_FILE = path.join(__dirname, '.docusign_token.json');

function loadCachedToken() {
  try {
    if (fs.existsSync(TOKEN_FILE)) {
      const data = JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf8'));
      if (data.access_token && data.expires_at && Date.now() < data.expires_at - 60000) {
        _accessToken = data.access_token;
        _tokenExpiry = data.expires_at;
        return true;
      }
    }
  } catch (e) {}
  return false;
}

function saveCachedToken(token, expiresIn) {
  _accessToken = token;
  _tokenExpiry = Date.now() + (expiresIn * 1000);
  try {
    fs.writeFileSync(TOKEN_FILE, JSON.stringify({
      access_token: token,
      expires_at: _tokenExpiry
    }));
  } catch (e) {}
}

// Exchange authorization code for token (called once from /docusign/callback)
async function exchangeCodeForToken(code) {
  const credentials = Buffer.from(`${DS_CLIENT_ID}:${DS_CLIENT_SECRET}`).toString('base64');
  const resp = await axios.post('https://account.docusign.com/oauth/token', 
    new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: DS_REDIRECT_URI
    }).toString(),
    {
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  saveCachedToken(resp.data.access_token, resp.data.expires_in);
  if (resp.data.refresh_token) {
    try {
      const existing = JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf8'));
      existing.refresh_token = resp.data.refresh_token;
      fs.writeFileSync(TOKEN_FILE, JSON.stringify(existing));
    } catch(e) {}
  }
  return resp.data.access_token;
}

// Refresh using stored refresh token
async function refreshToken() {
  try {
    const stored = JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf8'));
    if (!stored.refresh_token) return false;
    const credentials = Buffer.from(`${DS_CLIENT_ID}:${DS_CLIENT_SECRET}`).toString('base64');
    const resp = await axios.post('https://account.docusign.com/oauth/token',
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: stored.refresh_token
      }).toString(),
      {
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    saveCachedToken(resp.data.access_token, resp.data.expires_in);
    if (resp.data.refresh_token) {
      stored.refresh_token = resp.data.refresh_token;
      stored.access_token = resp.data.access_token;
      stored.expires_at = _tokenExpiry;
      fs.writeFileSync(TOKEN_FILE, JSON.stringify(stored));
    }
    return true;
  } catch(e) {
    return false;
  }
}

async function getAccessToken() {
  if (_accessToken && Date.now() < _tokenExpiry - 60000) return _accessToken;
  if (loadCachedToken()) return _accessToken;
  if (await refreshToken()) return _accessToken;
  throw new Error('DOCUSIGN_NOT_AUTHORIZED: No valid token. Visit /docusign/auth to authorize.');
}

function getConsentUrl() {
  const scopes = 'signature%20extended';
  return `https://account.docusign.com/oauth/auth?response_type=code&scope=${scopes}&client_id=${DS_CLIENT_ID}&redirect_uri=${encodeURIComponent(DS_REDIRECT_URI)}`;
}

function buildAgreementText(order, tierInfo) {
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const agrNum = `SBS-${new Date().getFullYear()}-${String(order.id).padStart(3,'0')}`;

  return `STONEBRIDGE SOLUTIONS INC.
STANDARD SERVICE AGREEMENT

Agreement No. ${agrNum}
Effective Date: ${today}

PARTIES

StoneBridge Solutions Inc. | 6225 TownCenter Drive, Suite 867, Clemmons, NC 27012
carl@stonebridgesolutions.io

Client: ${order.business_name || 'TBD'}
Client Representative: ${order.contact_name}
Client Email: ${order.email}
Client Phone: ${order.phone}

This Standard Service Agreement is entered into as of ${today} by and between StoneBridge Solutions Inc., a North Carolina corporation ("StoneBridge"), and ${order.business_name} ("Client").

---

SCHEDULE A - SELECTED SERVICE

Product: ${tierInfo.name}
Total Project Price: ${tierInfo.price}
Initial Payment (50%): ${tierInfo.deposit} - due before work begins
Final Payment (50%): ${tierInfo.deposit} - due upon approval or deemed acceptance
Target Turnaround: ${tierInfo.turnaround}
Revision Allowance: 3 consolidated revision rounds

DELIVERABLES
${tierInfo.deliverables}

COMMENCEMENT PREREQUISITES
The build timer starts only after StoneBridge confirms receipt of ALL of the following:
1. Initial payment, cleared
2. This fully executed Agreement
3. Completed project intake form
4. All required Client-supplied materials (logo, photos, services list, contact info)

The timer does not start upon inquiry, deposit, or form submission alone.

CLIENT INITIAL: _____________ (I understand when my clock starts)

---

STANDARD TERMS (Sections 1-24 apply in full)

SCOPE (Section 2): StoneBridge performs only services expressly listed above. No implied services.

CLIENT INITIAL: _____________ (I understand what is and is not included)

PAYMENT & IP (Section 6): No IP rights transfer until all fees paid in full. If Client initiates a chargeback or payment is returned, StoneBridge may immediately suspend the IP license, take the site offline, and withhold all files. Client will also owe the chargeback processing fee plus 10% of the disputed amount.

CLIENT INITIAL: _____________ (I understand payment terms and chargeback consequences)

ACCEPTANCE (Section 7.2): If Client does not provide written feedback within 5 business days of draft delivery, the deliverable is deemed accepted.

CLIENT INITIAL: _____________ (I understand deemed acceptance)

NO BUSINESS-RESULT GUARANTEE (Section 16.3): StoneBridge does not guarantee search rankings, load times, traffic, leads, or revenue.

CLIENT INITIAL: _____________ (I understand no business results are guaranteed)

LIABILITY CAP (Section 18.2): StoneBridge maximum liability is limited to fees paid under this Service Order.

CLIENT INITIAL: _____________ (I understand the liability cap)

GOVERNING LAW (Section 22): North Carolina law. Venue: Forsyth County, NC.

CLIENT INITIAL: _____________ (I agree to NC law and Forsyth County venue)

FULL TERMS: The complete 24-section Standard Service Agreement is available at stonebridgesolutions.io/service-agreement and is incorporated herein by reference.

---

SIGNATURES

By signing below, each Party confirms it has read, understood, and agreed to this Agreement and all Schedules.

STONEBRIDGE SOLUTIONS INC.               CLIENT: ${order.business_name}

Signature: _______________________        Signature: _______________________

Printed Name: Carl Loser                  Printed Name: _______________________

Title: Owner                              Title: _______________________

Date: _______________________            Date: _______________________

Email: carl@stonebridgesolutions.io       Email: ${order.email}

Agreement No.: ${agrNum}                 Agreement No.: ${agrNum}

---

StoneBridge Solutions Inc. | 6225 TownCenter Drive, Suite 867, Clemmons, NC 27012
Corporate/Registered Office: 4030 Wake Forest Road, Suite 349, Raleigh, NC 27609
A North Carolina business attorney should review this agreement before operational use.
`;
}

const TIER_INFO = {
  simple: {
    name: '3-Page Static Website',
    price: '$350 flat',
    deposit: '$175',
    turnaround: '48 hours from confirmed commencement',
    deliverables: '- Home, Services & Contact pages\n- Contact form + click-to-call\n- Google Maps & business hours\n- Mobile-responsive design\n- 3 design revisions included'
  },
  standard: {
    name: '5-Page Static Website',
    price: '$500 flat',
    deposit: '$250',
    turnaround: '7 calendar days from confirmed commencement',
    deliverables: '- Everything in Simple\n- Up to 5 pages + photo gallery\n- Review & testimonial section\n- Mobile-responsive design\n- 3 design revisions included'
  },
  premium: {
    name: '7-Page Static Website',
    price: '$650 flat',
    deposit: '$325',
    turnaround: '10 calendar days from confirmed commencement',
    deliverables: '- Everything in Standard\n- Up to 7 pages for full coverage\n- Room for every service you offer\n- Mobile-responsive design\n- 3 design revisions included'
  }
};

async function sendAgreement(order) {
  const token = await getAccessToken();
  const tierInfo = TIER_INFO[order.tier] || TIER_INFO['standard'];
  const docText = buildAgreementText(order, tierInfo);
  const agrNum = `SBS-${new Date().getFullYear()}-${String(order.id).padStart(3,'0')}`;

  const apiClient = new docusign.ApiClient();
  apiClient.setBasePath(`${DS_BASE_URI}/restapi`);
  apiClient.addDefaultHeader('Authorization', `Bearer ${token}`);

  const envelopesApi = new docusign.EnvelopesApi(apiClient);

  const envelopeDef = new docusign.EnvelopeDefinition();
  envelopeDef.emailSubject = `StoneBridge Service Agreement - ${order.business_name} (${agrNum})`;
  envelopeDef.emailBlurb = `Hi ${order.contact_name},\n\nPlease review and sign your StoneBridge Solutions Service Agreement for your ${tierInfo.name}.\n\nOnce both parties have signed, you will receive a copy automatically. Your project clock starts after we receive your signed agreement, initial payment, completed intake form, and all required materials.\n\nQuestions? Reply to this email.\n\n- Carl Loser\nStoneBridge Solutions`;

  const docB64 = Buffer.from(docText).toString('base64');
  const doc = new docusign.Document();
  doc.documentBase64 = docB64;
  doc.name = `StoneBridge Service Agreement ${agrNum}`;
  doc.fileExtension = 'txt';
  doc.documentId = '1';
  envelopeDef.documents = [doc];

  const clientSigner = new docusign.Signer();
  clientSigner.email = order.email;
  clientSigner.name = order.contact_name;
  clientSigner.recipientId = '1';
  clientSigner.routingOrder = '1';

  const clientSigTab = new docusign.SignHere();
  clientSigTab.documentId = '1';
  clientSigTab.pageNumber = '1';
  clientSigTab.anchorString = 'Signature: _______________________        Signature:';
  clientSigTab.anchorXOffset = '215';
  clientSigTab.anchorYOffset = '0';
  clientSigTab.anchorUnits = 'pixels';

  const clientDateTab = new docusign.DateSigned();
  clientDateTab.documentId = '1';
  clientDateTab.pageNumber = '1';
  clientDateTab.anchorString = 'Date: _______________________            Date:';
  clientDateTab.anchorXOffset = '215';
  clientDateTab.anchorYOffset = '0';
  clientDateTab.anchorUnits = 'pixels';

  const clientNameTab = new docusign.FullName();
  clientNameTab.documentId = '1';
  clientNameTab.pageNumber = '1';
  clientNameTab.anchorString = 'Printed Name: _______________________';
  clientNameTab.anchorXOffset = '100';
  clientNameTab.anchorYOffset = '0';
  clientNameTab.anchorUnits = 'pixels';

  const makeInitial = (anchorStr) => {
    const t = new docusign.InitialHere();
    t.documentId = '1'; t.pageNumber = '1';
    t.anchorString = anchorStr;
    t.anchorXOffset = '-180'; t.anchorYOffset = '-5';
    t.anchorUnits = 'pixels';
    t.scaleValue = '0.6';
    return t;
  };

  clientSigner.tabs = new docusign.Tabs();
  clientSigner.tabs.signHereTabs = [clientSigTab];
  clientSigner.tabs.dateSignedTabs = [clientDateTab];
  clientSigner.tabs.fullNameTabs = [clientNameTab];
  clientSigner.tabs.initialHereTabs = [
    makeInitial('CLIENT INITIAL: _____________ (I understand when my clock starts)'),
    makeInitial('CLIENT INITIAL: _____________ (I understand what is and is not included)'),
    makeInitial('CLIENT INITIAL: _____________ (I understand payment terms and chargeback consequences)'),
    makeInitial('CLIENT INITIAL: _____________ (I understand deemed acceptance)'),
    makeInitial('CLIENT INITIAL: _____________ (I understand no business results are guaranteed)'),
    makeInitial('CLIENT INITIAL: _____________ (I understand the liability cap)'),
    makeInitial('CLIENT INITIAL: _____________ (I agree to NC law and Forsyth County venue)')
  ];

  const carlEmail = process.env.ALERT_EMAILS || 'carl@stonebridgesolutions.io';
  const sbSigner = new docusign.Signer();
  sbSigner.email = carlEmail;
  sbSigner.name = 'Carl Loser';
  sbSigner.recipientId = '2';
  sbSigner.routingOrder = '2';

  const sbSigTab = new docusign.SignHere();
  sbSigTab.documentId = '1'; sbSigTab.pageNumber = '1';
  sbSigTab.anchorString = 'Signature: _______________________        Signature:';
  sbSigTab.anchorXOffset = '0'; sbSigTab.anchorYOffset = '0';
  sbSigTab.anchorUnits = 'pixels';

  const sbDateTab = new docusign.DateSigned();
  sbDateTab.documentId = '1'; sbDateTab.pageNumber = '1';
  sbDateTab.anchorString = 'Date: _______________________            Date:';
  sbDateTab.anchorXOffset = '0'; sbDateTab.anchorYOffset = '0';
  sbDateTab.anchorUnits = 'pixels';

  sbSigner.tabs = new docusign.Tabs();
  sbSigner.tabs.signHereTabs = [sbSigTab];
  sbSigner.tabs.dateSignedTabs = [sbDateTab];

  envelopeDef.recipients = new docusign.Recipients();
  envelopeDef.recipients.signers = [clientSigner, sbSigner];
  envelopeDef.status = 'sent';

  const result = await envelopesApi.createEnvelope(DS_ACCOUNT_ID, { envelopeDefinition: envelopeDef });
  return { envelopeId: result.envelopeId, agrNum };
}

module.exports = { sendAgreement, exchangeCodeForToken, getConsentUrl };
