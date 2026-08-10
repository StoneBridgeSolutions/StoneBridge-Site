# STONEBRIDGE SOLUTIONS — FULL BUILD CHECKLIST
Builder, Pipeline, Contracts, Payments — August 2026
Last Updated: August 10, 2026 (Stage 1 DB work + Stage 2 Stripe catalog completed by Claude)

## CONTEXT FOR AI
- Full session transcript: /mnt/transcripts/ (check journal.txt for index)
- Google Drive checklist: https://docs.google.com/document/d/1cYLWEckirk1GWiY7IpKju9-bN3mjsj-slSiZmMyRLuo/edit
- GitHub repo: StoneBridgeSolutions/StoneBridge-Site (branch: main)
- Server: srv1416856.hstgr.cloud (187.77.219.6)
- Supabase project: stonebridge-remote (xvzhsaivjbjlhzgckfkw) — CORRECTED Aug 10, 2026.
  Original ID hbxdzhzxznqegbdpgsqb above was stale/wrong; verified against live
  data (real test order, business_id 1cfbce29-2125-4c41-9a2d-12b4367c41a7).
- API: /root/stonebridge-orders/server.js (PM2: stonebridge-orders, port 3005)
- Site files: /root/stonebridge-marketing/dist/
- DocuSign integration key: 1750125b-7e98-4495-9248-1199f390c33f (sandbox auth active)
- RapidAPI key: 0650f7ec51msh7f8323ac240dc07p18cc1bjsn5b11b1d34ab7
- RapidAPI host: domains-api.p.rapidapi.com (Domains API, Basic free tier)
- Care Plan early commit Stripe price: price_1U2CutJVEx5yNpj6wXAvVa02 ($35/mo)
- Care Plan standard Stripe price: price_1U2CueJVEx5yNpj6TNlYscQL ($50/mo)

## TASK
Push this checklist to GitHub as STONEBRIDGE_BUILD_CHECKLIST.md in the 
StoneBridgeSolutions/StoneBridge-Site repo (root of repo, branch: main), 
then begin Stage 1 below.

---

## ARCHITECTURE NOTE (added Aug 10, 2026)
An intake system already existed in stonebridge-remote before this checklist:
client_intake_tokens + client_intake_responses + intake_admin_config. Rather
than build a second, competing intake_sessions/intake_links system as
originally spec'd below, Stage 1 EXTENDED the existing tables instead. See
Stage 1 checkboxes for exactly what was added.

## STAGE 1 — FOUNDATION & INFRASTRUCTURE ← START HERE
Prerequisites everything else depends on

- [x] Sign up for RapidAPI → Domains API Basic/Free subscribed
- [x] Add RAPIDAPI_KEY to /root/stonebridge-orders/.env
- [x] Add RAPIDAPI_DOMAIN_HOST to .env
- [ ] INTAKE_MASTER_KEY — OPEN DECISION, not done. An admin passcode already
      exists in Supabase (intake_admin_config.passcode, plaintext, 1 row set).
      Decide: keep DB-passcode approach as-is, or migrate to bcrypt hash in
      .env as originally spec'd. Two auth systems should not coexist.
- [x] intake_sessions equivalent — DONE Aug 10, 2026 (not built fresh — see
      architecture note above). Extended existing client_intake_responses:
      added password_hash (text, nullable), created_at (timestamptz).
      Migration: extend_intake_tables_for_builder_flow
- [x] intake_links equivalent — DONE Aug 10, 2026. Extended existing
      client_intake_tokens: added order_id (uuid, FK -> website_orders.id),
      first_name (text), email (text), expires_at (timestamptz).
      Migration: extend_intake_tables_for_builder_flow
- [x] care_plan_early_commit column — ALREADY EXISTED on website_orders
      before this checklist was written (verified Aug 10, 2026, not newly
      added). Checklist below was wrong to list this as pending.
- [ ] Add nginx routes /intake/ and /admin/intake/ proxying to port 3005
      — BLOCKED, needs Hostinger terminal (no VPS access available to Claude)
- [ ] Update stonebridge-orders .env with all new Stripe price IDs (Stage 2)
      — BLOCKED, needs Hostinger terminal. Full price ID list is in Stage 2
      below, all confirmed live in Stripe as of Aug 10, 2026.

---

## STAGE 2 — STRIPE PRODUCTS & PRICING

DEPOSIT PRICES (already created)
- [x] Simple deposit $175 — price_1U2CrQJVEx5yNpj68ssAHGi1
- [x] Standard deposit $250 — price_1U2CrgJVEx5yNpj6jqAZCGrm
- [x] Premium deposit $325 — price_1U2CrtJVEx5yNpj6MLvpUm1J

FINAL BALANCE PRICES (pay in full)
- [x] Simple final balance ($175) — price_1U2CrYJVEx5yNpj6tC5tfQb6
      (already existed pre-checklist, checklist wrongly listed as pending)
- [x] Standard final balance ($250) — price_1U2CrmJVEx5yNpj6dGynwTve
      (already existed pre-checklist)
- [x] Premium final balance ($325) — price_1U2Cs0JVEx5yNpj6IFcWLJTk
      (already existed pre-checklist)

PAYMENT PLAN PRODUCTS (Stripe subscriptions, recurring monthly)
Rules:
- Pay in full always available, no fee
- Plans only available when remaining balance after 50% deposit >= $500
- 3-month: remaining $500-$750, fee +10%, (remaining * 1.10) / 3 per month
- 6-month: remaining $750-$1,500, fee +12%, (remaining * 1.12) / 6 per month
- 12-month: remaining $1,500+, fee +15%, $250 immediate then
  ((remaining - $250) * 1.15) / 12 per month
- Non-payment/cancellation: deposit non-refundable, site offline,
  IP reverted, domain reverted if StoneBridge-controlled

- [x] 3-month plan Stripe PRODUCT — prod_V36odufNAE6ZYd (created Aug 10, 2026)
- [x] 6-month plan Stripe PRODUCT — prod_V36oBkir96qqTu (created Aug 10, 2026)
- [x] 12-month plan Stripe PRODUCT — prod_V36ofleMllDou8 (created Aug 10, 2026)
      NOTE: these are Products only, no fixed Price attached, since the
      monthly amount depends on each client's remaining balance. Fee
      formulas are stored in each product's metadata. server.js must
      compute the amount and pass it via price_data at subscription
      creation time — do not look up a pre-set price_id for these.

ADD-ON PRICES (one-time) — all created Aug 10, 2026
- [x] Extra page 4th (+$100) — price_1U30ZGJVEx5yNpj6QrSE2dt3
- [x] Extra page 6th (+$90) — price_1U30ZQJVEx5yNpj65fNlDbgh
- [x] Extra page 7+ each (+$80) — price_1U30ZWJVEx5yNpj6d3BjBwSK
- [x] Extra section (+$35 each, after 5/page or after 15 on 1-page site)
      — price_1U30ZeJVEx5yNpj67CDX1Cnt (also reused for 1-page 16+ below)
- [x] Copywriting per page standard up to 5 sections ($25)
      — price_1U30ZlJVEx5yNpj6LDx0da5M
- [x] Copywriting per extra charged section (+$10)
      — price_1U30ZsJVEx5yNpj69yOLJvrD
- [x] Copywriting from URL — extra sections only ($5, standard sections free)
      — price_1U30ZzJVEx5yNpj6GcrwTehL
- [x] Full site copywriting + 5 extra sections package ($175, up to 7 pages)
      — price_1U30a6JVEx5yNpj65ZionKcW
      Suggested at billing if individual total exceeds $175, shows savings.
      One or the other — not combinable with individual.
- [x] Logo creation ($35 base, 2 revisions included) — price_1U30aDJVEx5yNpj6O31Pb8gs
- [x] Logo extra revision (+$20 each after 2) — price_1U30aKJVEx5yNpj6nLnlN2ke
      2 color PNG files, transparent background, client owns rights
- [x] 1-page site extra sections 16+ ($35 each) — reuses Extra Section price
      above (price_1U30ZeJVEx5yNpj67CDX1Cnt), same amount, no separate price
      needed
- [x] Care Plan early commit ($35/mo) — price_1U2CutJVEx5yNpj6wXAvVa02
- [x] Care Plan standard ($50/mo) — price_1U2CueJVEx5yNpj6TNlYscQL
- [x] Third-party integrations: custom quote only, no fixed price (correct
      as-is, no Stripe object needed)

---

## STAGE 3 — ADMIN LINK GENERATOR
Generate intake links manually for off-pipeline clients (name + email only)

- [ ] Build /admin/intake page — bcrypt master key protected
- [ ] Form: first name + email → UUID token → store in intake_links table
- [ ] Generated link: stonebridgesolutions.io/builder?token=UUID
- [ ] Show link on screen (copy button) + auto-email to client
- [ ] Client email: "Hi [First Name], here's your website builder link: [link].
      It saves automatically so pick up where you left off anytime."
- [ ] Admin dashboard: all sessions — name, email, progress %, last active, completed
- [ ] Master key: read access to ALL sessions regardless of client password
- [ ] Works for pipeline clients (order_id present) AND off-pipeline (no order_id)

---

## STAGE 4 — BUILDER FORM
Prompt-by-prompt intake. Auto-save 8 seconds after last keystroke.

STEP 0 — Link Validation & Resume
- [ ] Validate token from URL against intake_links table
- [ ] If order_id present: pre-fetch from website_orders Supabase table
- [ ] If session has progress: resume from last completed step
- [ ] Auto-save to Supabase every 8 seconds of inactivity

STEP 1 — Password Protection
- [ ] "Would you like to password-protect your builder?" Yes / No
- [ ] Yes: create password, bcrypt hash stored in intake_sessions
- [ ] No: show notice — "Anyone with this link can view your answers.
      It will not be indexed by search engines."
- [ ] On return visit: if password set, prompt before loading

STEP 2 — Business Information
- [ ] Pre-fill from order: business name, contact name, services (all editable)
- [ ] "Are you a registered legal entity?" Yes / No / In progress
- [ ] If Yes: legal entity name, registered business address,
      registered agent address, EIN (optional), relationship to business
      (Owner / Officer / Authorized Agent / Member / Other)
- [ ] If No: legal mailing address (required), full legal name
- [ ] What does your business do? (pre-filled if available, editable)
- [ ] What are you trying to accomplish with this website?
- [ ] Who is your target audience?
- [ ] Main competitors (URLs if possible)
- [ ] Timeline: ASAP / Within 2 weeks / Within a month / No rush
- [ ] Preferred contact during revisions: Email / Text / Phone

STEP 3 — Branding & Styling
- [ ] Site name (may differ from business name)
- [ ] Tone (checkboxes): Professional / Friendly / Bold / Minimalist /
      Luxury / Playful / Other (text)
- [ ] Colors: color pickers (primary, secondary, accent)
      OR "Let StoneBridge choose"
- [ ] Logo: Upload existing / Need one created ($35, 2 revisions, +$20 after) /
      Don't have one yet
- [ ] Favicon: Upload / Use logo / StoneBridge choose
- [ ] Font: Modern sans-serif / Classic serif / Mixed / No preference
- [ ] Inspiration: up to 5 URLs + comment per site
- [ ] Anything to avoid (colors, styles, elements)

STEP 4 — Domain
- [ ] "Do you have a domain?" Yes / No / Not sure
- [ ] If Yes: domain name + registrar (GoDaddy/Namecheap/Google/Cloudflare/Other)
- [ ] If No/Not sure: domain search
      → Domains API (RapidAPI) → show available/taken + price (+10% markup)
      → If unavailable: show suggestions
      → Save up to 5 fallback preferences in order
- [ ] "Would you like StoneBridge to register and manage your domain?"
      Yes / No / Already handled

STEP 5 — Site Structure & Pages
- [ ] Package (pre-selected from order if available):
      Simple 1-page / Simple 3-page / Standard 5-page / Premium 7-page
- [ ] Pricing rules:
      - 4-page site = 3-page price + $100
      - 6-page site = 5-page price + $90
      - 7+ extra pages = +$80 each
      - Sections: standard pages up to 5 included; 6+ = $35/section
      - 1-page site: up to 15 sections included; 16+ = $35/section
- [ ] For each page: name, description, suggested sections (checkboxes),
      custom sections (text), copywriting preference
- [ ] Per-page copywriting options:
      a) "I have my own copy" — text area
      b) "Copy from a URL I own" — URL field
         (free for standard sections, $5 for extra sections)
         + "What should we capture from this page?" note field
      c) "StoneBridge writes it" — $25/page standard; $10/extra section
      d) "Notes for StoneBridge" — comment text area
         Label: "Share anything helpful: ideas, keywords, vibe.
         This is NOT copywriting — it's guidance for us."
- [ ] Terms & Privacy: always included, no extra charge
      - Client provides own content (paste area) OR StoneBridge generates template
      - If client provides: preserve exact wording, styling only
      - If not: generate from business info with legal disclaimer
- [ ] Third-party integrations (checkboxes):
      Stripe / Email marketing / Booking / Social feed / Other
      Note: "Custom quote — you'll provide login credentials"

STEP 6 — Add-Ons & Package Suggestion
- [ ] Logo (if not selected in Step 3)
- [ ] Show copywriting cost breakdown
- [ ] Smart suggestion: if individual copy + sections > $175:
      "You'd pay $[X] individually. Full Site Package saves you $[Y]."
      Full Site Package ($175): replaces all individual copy, one or the other
- [ ] Payment plan preview (informational, actual selection at Step 7)

STEP 7 — Pricing Summary & Submit
- [ ] Full itemized breakdown:
      Base package / Extra pages / Extra sections / Copywriting /
      Logo / Domain / Total / Deposit (50%) / Remaining balance
- [ ] Payment plan options (if remaining >= $500):
      3-month / 6-month / 12-month / Pay in full
      Show monthly amount + total cost with fee for each plan
- [ ] Submit → save to Supabase → generate all outputs → send emails

---

## STAGE 5 — OUTPUT GENERATION
What gets created on submit

- [ ] Supabase: mark completed, store JSON, link order_id if pipeline client
- [ ] Email to Carl: formatted HTML with all answers + pricing summary
- [ ] Markdown summary: organized by step, emailed as .md attachment
- [ ] AI prompt .txt file (dynamic, paste directly into any AI):

FORMAT:
Create a [X]-page static website for [Business Name], a [business type]
based in [City, State].

TARGET AUDIENCE: [answer]
GOAL: [answer]

BRAND & STYLE:
- Tone: [tones]
- Primary color: [hex or "StoneBridge to choose"]
- Secondary: [hex or description]
- Font: [selection]
- Logo: [provided / needs creation / TBD]
- Avoid: [list]

INSPIRATION:
- [URL]: [comment]

PAGES ([X] total):
PAGE [N]: [Name]
Sections: [list]
Copywriting: [copy / "StoneBridge writes" / "From URL: [url]"]
Notes: [guidance notes]

TERMS & PRIVACY: [content / "Generate from business info"]
INTEGRATIONS: [list]

LEGAL:
Entity: [legal name or "Individual — [Name]"]
Address: [address]
EIN: [if provided]

ADDITIONAL SERVICES CONTRACTED: [list]

NOTES FOR AI:
Build to feel [tone] for [audience].
Inspired by [URLs] — [comments].
Avoid [list].
Mark all content gaps as [CONTENT NEEDED].

- [ ] Privacy/Terms file: client content preserved exactly OR template generated
      with disclaimer: "Generated as general template. Consult an attorney."

---

## STAGE 6 — CONTRACT GENERATION

PRE-DOCUSIGN COLLECTION (confirm before generating)
- [ ] Legal entity name
- [ ] Legal registered agent address
- [ ] EIN (optional)
- [ ] Relationship to business

DYNAMIC AGREEMENT FIELDS
- [ ] Package + price
- [ ] Payment schedule (deposit + remaining + plan if selected)
- [ ] Payment plan terms: monthly amount, duration, fee, non-payment clause
      Non-payment: deposit non-refundable, site offline, IP reverted,
      domain reverted if StoneBridge-controlled
- [ ] Add-ons contracted
- [ ] Care Plan terms (if selected)
- [ ] Legal entity info + addresses

CHANGES CLAUSE (add to all agreements)
"StoneBridge Solutions Inc. reserves the right to update these terms at any
time. Clients will be notified of material changes via email. Continued use
of services after notice constitutes acceptance."

SCHEDULE D — ADDITIONAL AVAILABLE SERVICES (not contracted)
- [ ] List all unselected services with pricing
- [ ] Disclaimer: "Services in Schedule D require separate written
      authorization. Client will not be charged without explicit approval."

PRIVACY/TERMS DISCLAIMER (all agreements)
"Pages created by StoneBridge Solutions are general templates and do not
constitute legal advice. Consult a qualified attorney before publishing."

DOCUSIGN
- [ ] Auto-sign configured for Carl (server-side, no manual click)
- [ ] ID verification enabled on client signer
- [ ] Routing: client signs first → Carl auto-signs → emails to both
- [ ] DocuSign Connect webhook: on completion → send Stripe deposit link

---

## STAGE 7 — PIPELINE INTEGRATION
Correct legal order:

1. Client submits form → redirect to /thank-you "Check email to sign"
2. DocuSign agreement auto-sent → client signs → Carl auto-signs
3. DocuSign webhook → Stripe deposit payment link sent to client
4. Client pays deposit → builder link sent to client
5. Client completes builder → Carl receives all outputs
6. Carl manually starts clock → client notified

- [ ] Change form redirect: /cart.html → /thank-you page
- [ ] DocuSign fires immediately on form submit
- [ ] DocuSign webhook → deposit payment link email
- [ ] Stripe deposit webhook → builder link email
- [ ] Builder submit → Carl alert + manual clock start from admin panel
- [ ] Client notified with expected start date on clock start

---

## STAGE 8 — STRIPE CUSTOMER PORTAL & CARE PLAN
(Verified Aug 10, 2026: zero portal configurations exist on the live Stripe
account — this stage is genuinely untouched, not just unchecked.)
- [ ] Enable Stripe Customer Portal (allow cancel, update payment, view invoices)
- [ ] Add portal link to post-launch client email
- [ ] Enable Stripe dunning emails (Settings → Billing → Subscriptions)
- [ ] Enable Smart Retries

---

## STAGE 9 — FINAL CLEANUP
- [ ] Update Google Drive to-do list
- [ ] Test full pipeline end-to-end
- [ ] Confirm DocuSign production auth (switch from sandbox after production
      OAuth is resolved — see session notes)
