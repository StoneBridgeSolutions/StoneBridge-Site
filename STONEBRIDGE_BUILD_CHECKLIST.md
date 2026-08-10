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

The RPC functions backing this system (create_intake_link, get_intake_link,
list_intake_links, revoke_intake_link, change_intake_passcode,
save_intake_draft, submit_intake) were verified as real, working logic —
not stubs. create_intake_link/get_intake_link/list_intake_links were updated
Aug 10, 2026 to actually use the new order_id/first_name/email/expires_at
columns (they weren't wired in originally). get_intake_link now also
enforces expiry. Passcode check is plaintext SQL comparison inside each
SECURITY DEFINER function, not bcrypt/RLS — functionally sound (anon can
call the function but not read data without the right passcode) but weaker
than the bcrypt-in-.env approach originally spec'd. Still an open decision,
see INTAKE_MASTER_KEY line below.

TABLE CLEANUP (Aug 10, 2026): Removed 11 unused tables + 1 view related to
Retell/voice-agent and phone/CRM-log features that are no longer part of
the plan: agent_intake_fields, call_minute_logs, agent_free_minutes,
voice_agent_setup_requests, retell_agents, voice_agents, voice_agent_setups,
retell_logs, crm_logs, phone_numbers, ai_phone_agents, plus the
call_minutes_monthly view. All had 0 rows; no data was lost. Confirmed via
Supabase advisors afterward that nothing else references the dropped
objects.

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
- [x] Update stonebridge-orders .env with all new Stripe price IDs (Stage 2)
      DONE Aug 10, 2026 — accessed VPS directly via Hostinger's browser web
      terminal (bos.hostingervps.com), not just given as instructions.
      Backed up .env first (.env.backup-20260810). Appended 20 Stripe env
      vars (all price/product/portal-config IDs from Stage 2 + Stage 8).
      Restarted stonebridge-orders via pm2 — confirmed clean restart,
      "injected env (100)" (up from 78), running on port 3005, no errors.
- [x] Add nginx routes /intake/ and /admin/intake/ proxying to port 3005
      CORRECTED, not done as originally spec'd — this was based on a wrong
      architecture assumption. Checked the actual frontend
      (/root/stonebridge-marketing): it's a React SPA. Routes /intake,
      /intake/voice-ai, /intake/intake-forms already exist client-side in
      App.jsx. nginx's existing `location / { try_files $uri $uri/ $uri.html
      /index.html; }` catch-all ALREADY serves any client-side route,
      including a future /admin/intake — no new nginx config needed, ever,
      for this. server.js (port 3005) has ZERO intake-related routes and
      isn't involved in this flow at all — the frontend is meant to call
      Supabase RPCs directly via the Supabase JS client, not through
      server.js.
      IMPORTANT GAP FOUND: Intake.jsx (209 lines) is just a menu/chooser
      page. IntakeForms.jsx is only 24 lines — a stub, not a real form.
      Neither calls submit_intake/save_intake_draft/get_intake_link or any
      Supabase RPC. Despite the backend RPC functions being solid (see
      architecture note above), the actual client-facing builder form does
      NOT functionally exist yet. Same is true for /admin/intake — no route
      or page exists for it at all. Stage 3 and Stage 4 need real frontend
      build work, not just wiring.
- [ ] BUG FOUND, NOT FIXED (Aug 10, 2026): .env has STRIPE_PUBLISHABLE_KEY
      defined TWICE — line ~117 is the live key (pk_live_...), line ~121 is
      a test key (pk_test_...). The second definition silently overrides
      the first when the .env is parsed, meaning the live site may
      currently be sending the TEST publishable key to the Stripe.js
      checkout frontend while the backend uses the live secret key — a
      mismatch that could be breaking real customer payments right now.
      Did not touch this without asking Carl first. Needs a decision: which
      line to remove/comment out.

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
- CANCELLATION RULE (added Aug 10, 2026): payment plans cannot be
  self-serve cancelled by the client — cancelling a payment plan (for
  services already built/completed) makes the full remaining balance
  due immediately, not just stops future installments. Care Plan
  (ongoing service) remains cancellable by the client anytime, no
  penalty, standard at-period-end behavior.

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

## BUILDER UX REBUILT (Aug 10, 2026)
Before working through the Stage 4 spec below (which describes the original
8-step design), note that builder.html was rebuilt into a real one-card-
per-screen wizard on the LIVE system (not the spec below, which predates
this and is kept for field-content reference only). Built and verified live
against the real order in website_orders:
  - Each existing section (Colors, Tone, Audience, Features, Business,
    Legal, Domain, Terms, Timeline, Logo, Photos — 11 total) is now its own
    full-screen card, one visible at a time.
  - Top nav bar with 11 clickable pills, jump to any section anytime.
    Visited sections show dimmed/gold; current section highlighted solid gold.
  - Back / Next buttons at the fixed bottom bar. Back hidden on card 1.
  - "I'm Done — Start My Build" only replaces Next once ALL 11 cards have
    been visited AND you're on the last one. If you reach the last card
    without visiting everything, the button reads "Next unanswered ->" and
    jumps to the first unvisited card instead.
  - Removed the "This starts your 48-hour build clock" line from under the
    done button per Carl's request (the JS confirm() popup before
    submission was left in place as a safety check, not requested for
    removal).
  - <select> dropdowns restyled to match the dark navy/gold theme (were
    unstyled browser defaults before) — custom gold chevron icon, dark
    background, proper focus states.
  - Personalization: hints on 6 of the 11 cards (Colors, Features,
    Business, Legal, Domain, Timeline) now dynamically read the client's
    actual business_name and first name (from contact_name) instead of
    generic copy — e.g. "Should Test Business LLC have any of these, Test?"
    Requires contact_name to be added to the /builder/status select
    (done — was previously not selected).
  - All saves still go through the same /builder/save whitelist and
    website_orders columns as before -- zero changes to the backend data
    model or field mapping, only presentation/navigation.
  - Full backups kept on server: /root/claude-work/builder.html.backup-*
    and /root/claude-work/server.js.backup-20260810.

## STAGE 4 — BUILDER FORM
Original design spec (kept for field-content reference; superseded in UX
by the stepper rebuild above, which uses the same fields/logic):
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
      Cancellation: client cannot self-serve cancel a payment plan (added
      Aug 10, 2026); cancelling makes the full remaining balance due
      immediately since the service was already built. This must be
      spelled out explicitly in the agreement, not just enforced in Stripe.
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
- [x] Enable Stripe Customer Portal (allow cancel, update payment, view invoices)
      DONE Aug 10, 2026, then REFINED same day per business rule: payment
      plans (installments for already-completed builds) must NOT be
      self-serve cancellable; Care Plan (ongoing service) can be cancelled
      anytime. Two separate portal configurations now exist:
        - Default (bpc_1U31N7JVEx5yNpj6mYsch7Gn) — for CARE PLAN customers.
          Cancel enabled, at period end, reason collection on.
        - "Payment Plan Customers (no self-serve cancel)"
          (bpc_1U31T8JVEx5yNpj6clAqxm6w) — for 3/6/12-MONTH PLAN customers.
          Invoice history + payment method update enabled, cancellation
          BUTTON REMOVED (subscription_cancel.enabled = false). Verified
          both via API after saving.
      REMAINING WORK (not done, needs VPS code):
        1. server.js must pass the correct `configuration` ID when creating
           a portal session — Default for Care Plan customers, the Payment
           Plan config for installment customers. No code exists for this
           yet; without it every customer gets whichever config is default.
        2. Disabling the cancel button does NOT create "remaining balance
           due in full on cancellation" — that has no Stripe dashboard
           setting. Needs a webhook handler (customer.subscription.deleted
           or an admin-triggered cancel endpoint) that immediately
           generates + sends an invoice for the unpaid remaining balance
           when a payment-plan subscription ends. Not built yet. Until
           built, payment-plan clients who want to cancel should go through
           Carl manually (no self-serve path exists for them at all right
           now, by design).
- [ ] Add portal link to post-launch client email
- [x] Enable Stripe dunning emails (Settings → Billing → Subscriptions)
      DONE Aug 10, 2026 — "card payments fail" and "bank debit payments fail"
      customer email toggles turned on, verified persisted after reload.
- [x] Enable Smart Retries
      ALREADY ENABLED (found pre-configured, not newly set) — Smart Retries
      selected over Custom retries, up to 8 attempts within 2 weeks.

---

## STAGE 9 — FINAL CLEANUP
- [ ] Update Google Drive to-do list
- [ ] Test full pipeline end-to-end
- [ ] Confirm DocuSign production auth (switch from sandbox after production
      OAuth is resolved — see session notes)
