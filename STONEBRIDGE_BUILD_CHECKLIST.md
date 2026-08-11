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
- [x] STRIPE KEY BUG FIXED (Aug 10, 2026): .env disabled test key by commenting it out (#STRIPE_PUBLISHABLE_KEY_TEST_DISABLED). Only live pk_live_ key loads. Verified Aug 11, 2026.
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
BUILT Aug 10, 2026 — real, live, tested end-to-end (create link -> real
website_orders row -> real working builder.html link, verified in browser).
Uses website_orders directly, NOT a separate intake_links table (see
architecture note above — this is the extend-not-duplicate decision).
Auth reuses the existing x-admin-secret header pattern already used by
/admin/approve (not a new bcrypt system).

- [x] Build /admin page — protected by ADMIN_SECRET passcode (matches
      existing /admin/approve auth pattern, not bcrypt-hashed since that's
      not how the existing admin auth works; passcode entered once, kept in
      sessionStorage for the tab). Live at stonebridgesolutions.io/admin.html
- [x] Form: first name + business name (optional) + email -> creates a real
      website_orders row -> auto-generated builder_link_token (DB default,
      not a separate UUID/table) -> deposit_paid set true immediately since
      this is for clients Carl is handling directly, so the link works right
      away without a separate payment step.
- [x] Generated link: stonebridgesolutions.io/builder.html?token=... (shown
      on screen with a copy button, exactly as built)
- [x] AUTO-EMAIL TO CLIENT DONE (Aug 11, 2026): Admin creating a builder link via /admin/create-link now immediately emails the client their personal builder URL. Email includes the link, auto-save notice, and Carl's sign-off.
      nothing sends it automatically. Carl currently has to copy/paste and
      send it himself.
- [x] Admin dashboard: all sessions listed — business, contact, email,
      deposit status, progress (Not started / In progress / Submitted based
      on builder_last_saved_at / builder_completed_at), created date, copy
      link button per row. Refresh button included.
- [x] Passcode-gated access to all sessions (not client-password-gated,
      since there's no per-client password in this system)
- [x] Works for both pipeline clients (real orders, already have a token)
      and off-pipeline (created here) — same table, same mechanism.

New backend routes added to server.js (both tested live):
  POST /admin/create-link — creates the order, returns the link
  GET /admin/orders — lists all orders for the dashboard table
Both protected by the same x-admin-secret check as /admin/approve.
New nginx location block added: /admin/ -> proxy to port 3005 (needed —
didn't exist before, confirmed via 404 test, fixed, verified working).
Found and fixed a real CORS bug in the process: server.js's
Access-Control-Allow-Headers only allowed "Content-Type", which silently
blocked the x-admin-secret header on every cross-subdomain request
(admin.html is served from stonebridgesolutions.io, API is on
api.stonebridgesolutions.io). Fixed to allow both headers.

FIX (Aug 10, 2026, after Carl reviewed the live page): the "I'm not sure —
surprise us with the whole palette" checkbox on the Colors card was
defaulting to CHECKED for any new client (init() set colorUnsure.checked =
true and hid the color pickers whenever color_scheme_pref was empty).
Removed that default — the checkbox now starts unchecked and the color
pickers are visible from the start, same as a first-time visitor would
expect, rather than pre-selecting "unsure" for them. Verified live with a
fresh order (no saved color pref).

FEATURE ADDED (Aug 10, 2026): proper payment-gate page. Previously, an
unpaid order just saw a raw "Payment not yet confirmed for this order."
error string with no way to actually pay. Now /builder/status returns
business_name, contact_name, and stripe_deposit_link on the 403 response,
and builder.html renders a full branded gate screen (matching the site's
navy/gold theme) with the business name, a clear explanation, and a real
"Pay Deposit" button linking straight to that order's actual Stripe
deposit link. If no stripe_deposit_link exists on the order, the button is
hidden and a "Contact us" fallback message shows instead — verified both
paths live. This completely supersedes the builder form; no card content
is reachable until deposit_paid is true.

NOT done / explicitly deferred: file dist/checklist.html exists (0 bytes,
untouched, not linked anywhere) — did NOT assume it was meant for this and
build into it, since there's no way to confirm what Carl intended it for.
Built a clearly-named dist/admin.html instead.

---

## BUILDER UX REBUILT (Aug 10, 2026)

CRITICAL INCIDENT + FIX (Aug 10, 2026, discovered while doing something
unrelated): the deploy-server webhook runs `git reset --hard origin/main`
in /root/stonebridge-marketing on EVERY push to the GitHub repo — including
every push of this checklist file, since the checklist lives in the same
repo as the live site. builder.html was being edited directly on the VPS
filesystem all session and was NEVER committed to git, so every single
checklist push was silently wiping the day's stepper wizard, payment gate,
and business/legal/domain/terms field work back to git's stale pre-session
version. This had been happening quietly in the background all day; it was
only caught when a routine live check turned up zero matches for content
that should have been there.
FIXED: restored the most complete version from my own session backups
(/root/claude-work/builder.html.backup-before-gate-screen, then re-applied
the gate-screen script on top), verified live in the browser, then
committed BOTH dist/builder.html and dist/admin.html directly to the git
repo (commit f849a54) so they now ARE the target state `git reset --hard`
resets to -- future checklist pushes can no longer touch them. admin.html
itself was never at risk (untracked file, `git reset --hard` only affects
tracked files) -- only builder.html, which is pre-existing and tracked.
server.js / docusign-service.js / output-generator.js in
/root/stonebridge-orders were also never at risk -- the deploy script only
touches /root/stonebridge-marketing, a separate directory.
LESSON: any future direct edits to files inside /root/stonebridge-marketing
need to be git add/commit/pushed (not just left as uncommitted local
changes) or they will get silently reverted on the next push to this repo,
checklist or otherwise.

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
- [x] If order_id present: pre-fetch from website_orders Supabase table — DONE. Builder loads saved order on token match.
- [x] If session has progress: resume from last completed step — DONE. All fields restore from Supabase on reload.
- [ ] Auto-save to Supabase every 8 seconds of inactivity

STEP 1 — Password Protection
- [ ] "Would you like to password-protect your builder?" Yes / No
- [ ] Yes: create password, bcrypt hash stored in intake_sessions
- [ ] No: show notice — "Anyone with this link can view your answers.
      It will not be indexed by search engines."
- [ ] On return visit: if password set, prompt before loading

STEP 2 — Business Information
- [x] Pre-fill from order: business name, contact name — DONE.
- [ ] "Are you a registered legal entity?" Yes / No / In progress
- [ ] If Yes: legal entity name, registered business address,
      registered agent address, EIN (optional), relationship to business
      (Owner / Officer / Authorized Agent / Member / Other)
- [ ] If No: legal mailing address (required), full legal name
- [x] What does your business do? — DONE (businessDescription field).
- [x] What are you trying to accomplish with this website? — DONE (siteGoal field).
- [x] Who is your target audience? — DONE (targetAudience card).
- [x] Main competitors — DONE (competitors field).
- [x] Timeline — DONE (timelinePreference field).
- [x] Preferred contact during revisions — DONE (preferredContactMethod field).

STEP 3 — Branding & Styling
- [x] Site name — DONE (Aug 11, 2026): siteNameInput field added to Business card.
- [x] Tone (checkboxes) — DONE (Tone card with check-grid).
      Luxury / Playful / Other (text)
- [x] Colors — DONE (color pickers + secondary/accent + surprise me checkbox).
      OR "Let StoneBridge choose"
- [ ] Logo: Upload existing / Need one created ($35, 2 revisions, +$20 after) /
      Don't have one yet
- [ ] Favicon: Upload / Use logo / StoneBridge choose
- [x] Font: Modern sans-serif / Classic serif / Mixed / No preference — DONE (Aug 11, 2026).
- [x] Inspiration: up to 3 URLs + comment per site — DONE (Aug 11, 2026): 3 URL+note rows.
- [x] Anything to avoid — DONE (Aug 11, 2026): avoidText textarea.

STEP 4 — Domain
- [x] "Do you have a domain?" Yes / No / Not sure — DONE (hasDomainSelect dropdown).
- [x] If Yes: domain name + registrar — DONE (Aug 11, 2026): domainNameInput + registrar dropdown (shows on Yes).
- [ ] If No/Not sure: domain search
      → Domains API (RapidAPI) → show available/taken + price (+10% markup)
      → If unavailable: show suggestions
      → Save up to 5 fallback preferences in order
- [ ] "Would you like StoneBridge to register and manage your domain?"
      Yes / No / Already handled

LIVE AND FULLY WORKING (Aug 11, 2026): "Check Availability" button live on
the Domain card. Per Carl's direction, chose "try several based on what
they typed" over relying on the API's own suggestion feature -- more
predictable, more controllable, and works with any single-domain-check
endpoint shape rather than depending on a specific suggestions feature
that may not exist on this API tier. Behavior: if the client typed a
domain with a TLD, checks that exact domain plus 3 alternate TLDs; if they
typed just a name, checks it against 5 common TLDs (.com/.net/.co/.org/
.biz). Full pipeline built and tested live: button, results display
(green Available / red Taken / grey Couldn't check badges), new POST
/domain-check backend route, new nginx location block (this was missing
at first and caused a real "Failed to fetch" -- caught and fixed during
live testing, not shipped broken).
DOMAIN CHECK FULLY WORKING (Aug 11, 2026): The .env RAPIDAPI_DOMAIN_HOST
was set to the wrong host (domains-api.p.rapidapi.com) when it should be
domainradar.p.rapidapi.com -- Carl clarified this is the DomainRadar API,
not "Domains API". Corrected the .env host, confirmed the real endpoint is
GET /v1/availability?domain=X (returns {domain, available:bool, confidence,
method, checked_at}), wired it into checkDomainAvailability(), switched
from parallel Promise.allSettled to sequential 300ms-spaced calls to avoid
rate limiting, and tested live in browser -- real results confirmed (e.g.
mybusiness.com/.net/.co/.org/.biz all returned "Taken", a random unique
name returned "Available"). Feature is 100% functional end-to-end.
NOT DONE: price display (+10% markup), suggestions-on-unavailable, saving
up to 5 fallback preferences -- deferred until the base check works, and
some of these depend on data the API response format will determine.

STEP 5 — Site Structure & Pages
- [x] Package (pre-selected from order tier) — DONE (Aug 11, 2026): TIER_DEFAULTS map seeds pages on first load.
      Simple 1-page / Simple 3-page / Standard 5-page / Premium 7-page
- [ ] Pricing rules:
      - 4-page site = 3-page price + $100
      - 6-page site = 5-page price + $90
      - 7+ extra pages = +$80 each
      - Sections: standard pages up to 5 included; 6+ = $35/section
      - 1-page site: up to 15 sections included; 16+ = $35/section
- [x] For each page: name, copywriting preference — DONE (Aug 11, 2026): per-page rows with editable name + 4 copy options.
      custom sections (text), copywriting preference
- [x] Per-page copywriting options (own/URL/StoneBridge writes/notes) — DONE (Aug 11, 2026).
      a) "I have my own copy" — text area
      b) "Copy from a URL I own" — URL field
         (free for standard sections, $5 for extra sections)
         + "What should we capture from this page?" note field
      c) "StoneBridge writes it" — $25/page standard; $10/extra section
      d) "Notes for StoneBridge" — comment text area
         Label: "Share anything helpful: ideas, keywords, vibe.
         This is NOT copywriting — it's guidance for us."
- [x] Terms & Privacy: always included — DONE (Aug 11, 2026): radio choice (provide own / generate template) + paste area.
      - Client provides own content (paste area) OR StoneBridge generates template
      - If client provides: preserve exact wording, styling only
      - If not: generate from business info with legal disclaimer
- [x] Third-party integrations (checkboxes) — DONE (Aug 11, 2026): Stripe/Email/Booking/Social/Other.
      Stripe / Email marketing / Booking / Social feed / Other
      Note: "Custom quote — you'll provide login credentials"

STEP 6 — Add-Ons & Package Suggestion
- [ ] Logo (if not selected in Step 3)
- [x] Show copywriting cost breakdown — DONE (Aug 11, 2026): Review card shows base + StoneBridge-writes pages at $25 each.
- [ ] Smart suggestion: if individual copy + sections > $175:
      "You'd pay $[X] individually. Full Site Package saves you $[Y]."
      Full Site Package ($175): replaces all individual copy, one or the other
- [x] Payment plan preview — DONE (Aug 11, 2026): payment plan section shows on Review card when remaining >= $500.

STEP 7 — Pricing Summary & Submit
- [x] Full itemized breakdown — DONE (Aug 11, 2026): Review & Submit card shows base, copywriting extras, total, deposit (50%), remaining.
      Base package / Extra pages / Extra sections / Copywriting /
      Logo / Domain / Total / Deposit (50%) / Remaining balance
- [x] Payment plan options (if remaining >= $500) — DONE (Aug 11, 2026): 3/6/12mo with monthly amounts + fee shown.
      3-month / 6-month / 12-month / Pay in full
      Show monthly amount + total cost with fee for each plan
- [x] Submit → save to Supabase — DONE (Aug 11, 2026): submitBriefBtn calls /builder/save then /builder/complete.

---

## STAGE 5 — OUTPUT GENERATION
BUILT Aug 10, 2026 — tested live end-to-end against the real test order,
confirmed the DB update happened correctly and no send errors in logs.

- [x] Supabase: mark completed
      Already existed (status='building', building_started_at,
      builder_completed_at) — unchanged, just confirmed still correct.
- [x] Email to Carl: formatted plain-text with all answers + pricing summary
      DONE — new /root/stonebridge-orders/output-generator.js exports
      buildAiPrompt() and buildMarkdownSummary(). /builder/complete now
      selects every builder field (business/legal/domain/terms/colors/
      tone/audience/etc, added earlier this session) and builds a real
      email body: package + price, add-ons, contact info, business
      description, goal, audience, colors, tone, features, domain status,
      terms/privacy choice, legal entity info. NOT HTML — plain text
      (matches the existing email style used everywhere else in this
      codebase; no HTML template system exists here, wasn't worth
      introducing one for a single internal email).
- [x] Markdown summary: organized by section, emailed as .md attachment
      DONE — buildMarkdownSummary() in output-generator.js, attached to
      the completion email as {business-name}-summary.md.
- [x] AI prompt .txt file (dynamic, paste directly into any AI)
      DONE — buildAiPrompt() in output-generator.js, attached as
      {business-name}-ai-prompt.txt. Follows the spec format below as
      closely as the available data allows.
      HONEST GAP: the PAGES section of the spec format (page-by-page
      structure, sections, per-page copywriting) can't be populated —
      the builder never collects page/site-structure data (this was
      explicitly flagged as deferred scope earlier in this session, see
      Stage 4 notes). The generated prompt marks this section
      "[CONTENT NEEDED -- page/section structure not yet collected]"
      rather than fabricating a fake structure, per the spec's own
      "mark all content gaps as [CONTENT NEEDED]" instruction.
      Also not populated: INSPIRATION (URLs), Avoid list, Font selection —
      none of these are fields the builder currently collects either.

IMPORTANT FINDING WHILE TESTING (Aug 10, 2026): ALERT_EMAILS in .env is
set to "carl@stonebridgesolutions.io,jared@triadlandworx.com" — every
completion notification (including my live test of this feature) goes to
BOTH addresses. jared@triadlandworx.com appears to be an actual client
(Triad Land WorX), not a StoneBridge team member. My test call sent a
builder-completion email with attachments (containing "Test Business LLC"
test data) to that address — it already happened, can't be unsent. Did
NOT touch this value since I don't know if it's intentional (maybe Jared
has some other role) or a leftover misconfiguration — Carl needs to check
this directly.
RESOLVED same day, per Carl: removed jared@triadlandworx.com from
ALERT_EMAILS (now just carl@stonebridgesolutions.io) and from the unused
NOTIFY_EMAIL_3 var (found while fixing this -- not referenced by any code
anywhere, dead config, commented out rather than deleted). Restarted,
confirmed clean, verified no other occurrence of his email in .env.

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

MAJOR DISCOVERY (Aug 10, 2026): this stage was much further along than the
checklist previously showed. A full, real implementation exists in
/root/stonebridge-orders/docusign-service.js and fires on every order
(sendAgreement() called from /website-order in server.js, on every form
submission). Investigated fully, then extended with Carl's direct sign-off
on Aug 10, 2026: "Carl Loser" confirmed as his real name (not a bug), auto-
sign approved, dynamic accuracy requested, and a completion webhook
requested.

CONFIRMED ALREADY WORKING (found, not built today):
- [x] DocuSign fires immediately on form submit — sendAgreement() called
      directly inside the /website-order handler.
- [x] Base dynamic agreement text — buildAgreementText(order, tierInfo)
      builds a real "STONEBRIDGE SOLUTIONS INC. STANDARD SERVICE
      AGREEMENT" with agreement number, effective date, both parties,
      Schedule A (product/price/deposit/final payment/turnaround/revision
      allowance), and the original 7 client-initial clauses.

BUILT TODAY (Aug 10, 2026), all changes verified with node -c syntax
checks after each step:
- [x] "Carl Loser" — confirmed correct by Carl, not a bug. No fix needed.
- [x] Auto-sign for Carl — REBUILT (not just "enabled" — the original
      two-signer/shared-anchor design couldn't support this cleanly, so
      this was a real restructure, not a toggle):
        - Removed Carl (sbSigner/sbSigTab/sbDateTab) as a DocuSign
          recipient entirely. envelopeDef.recipients.signers is now
          [clientSigner] only — a single-signer envelope.
        - Rewrote the SIGNATURES section from a fragile two-column shared-
          anchor layout to sequential blocks. StoneBridge's signature is
          now pre-filled directly in the generated document text ("By: /s/
          Carl Loser", today's date) at generation time — a standard
          conformed-signature approach, no DocuSign action needed on
          Carl's side at all.
        - Simplified clientSigTab/clientDateTab anchors to match the now-
          unique remaining blank line (no more X-offset trick needed).
        - Practical effect: the envelope now completes as soon as the
          CLIENT signs, since Carl's part is already done before sending.
- [x] Dynamic accuracy fixes:
        - TIER_INFO was missing friend_family, friend_exclusive, and
          not_sure entirely — any order on those tiers would have produced
          a broken/undefined agreement. Added all three.
        - Added Schedule B (Legal Entity) — pulls is_legal_entity,
          legal_entity_name, legal_mailing_address, ein,
          relationship_to_business, with "to be confirmed with StoneBridge"
          fallback text since these fields aren't collected until the
          builder step, well after the agreement is generated at order-
          submission time (see sequencing note below — did not restructure
          this, just made the gap honest instead of silently blank).
        - Added Schedule C (Add-ons & Ongoing Services) — dynamically
          reflects copywriting_provided and care_plan_selected/
          care_plan_early_commit, with appropriate fallback text.
        - Added Schedule D (Additional Available Services, not contracted)
          — the disclaimer text from the original spec.
        - Added the exact CHANGES CLAUSE text from the original spec.
        - Added a NON-PAYMENT & CANCELLATION clause (deposit non-
          refundable, site offline, IP/domain reverted) with its own
          client-initial line — 8th initial now, tabs array updated to
          match.
        - Added a PAYMENT PLAN clause explaining that monthly plan
          specifics get confirmed separately once selected, plus the
          cancellation-due-in-full rule from the Stripe portal work
          earlier this session — with its own client-initial line, 9th
          initial.
      HONEST LIMIT: the payment plan clause is necessarily generic ("will
      be confirmed separately") because there's still no server-side flow
      or DB field tracking which plan (3/6/12mo) a client picks — that
      selection flow doesn't exist yet at all (confirmed via search, zero
      matches for payment-plan-related code in server.js). Real monthly
      terms can't be dynamically inserted until that's built.
- [x] Completion webhook — POST /docusign/webhook added to server.js.
      Parses DocuSign Connect's envelope-completed notification, matches
      the envelope back to an order via a new docusign_envelope_id column
      (also newly added — captured now when sendAgreement() succeeds, via
      .then() rather than the old fire-and-forget-only .catch()), sets a
      new agreement_signed_at timestamp, and emails Carl that the
      agreement is fully executed. No new nginx route needed — already
      covered by the existing /docusign/ location block.
      NOT YET DONE: registering the actual DocuSign Connect subscription
      (the API call that tells DocuSign to POST to this URL) — blocked by
      the auth issue below, since I couldn't get a working authenticated
      session to register it with. Endpoint is built and ready; just needs
      the subscription created once auth is working again.

URGENT, FOUND WHILE TESTING (Aug 10, 2026) — DocuSign auth is currently
failing with a 401 on real API calls (createEnvelope), even though the
locally cached token's expiry timestamp claims it's still valid for ~8
more hours. The refresh flow appears to run without erroring and rewrites
the token file, but the resulting token is STILL rejected by DocuSign's
server on the actual request. This means:
  - I could not fully end-to-end test the auto-sign/dynamic-content work
    above against a real DocuSign envelope — all changes are verified for
    correct JavaScript syntax and logic, but not confirmed against a live
    envelope render.
  - Since /website-order calls sendAgreement() as fire-and-forget with
    only a console.error on failure (no alert email, nothing visible
    anywhere else), it's possible real orders have been failing to get
    their agreement sent for some unknown period with nobody aware of it.
    This predates anything from this session.
Carl needs to visit /docusign/auth to fully re-consent, and separately
check the DocuSign account dashboard for any revoked integration/consent.
Once auth is confirmed working: (1) the Connect subscription still needs
registering, and (2) a real test envelope should be sent to confirm the
new signature block and Schedule B/C/D render correctly on an actual
DocuSign document (I designed and syntax-checked everything carefully but
have not visually confirmed the rendered PDF layout).

NOT ADDRESSED (Carl's decision needed, unrelated to today's fixes):
- [x] Redirect-before-signing sequencing — DONE (Aug 11, 2026): form submit goes to /thank-you.html, which polls /cart-status every 10s and reveals Pay Deposit button only after agreement_signed_at is set.
      the client straight to cart.html (payment) immediately on form
      submit, before their agreement is even sent, let alone signed. Since
      auto-sign now means only the client's signature is needed to
      complete the envelope, this is a smaller gap than before, but a
      client could still technically pay before signing. Not changed —
      needs Carl's call on whether to gate cart.html behind
      agreement_signed_at.
- [ ] ID verification on client signer — still not implemented.

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
- [x] Auto-sign configured for Carl — DONE (prior session): server-side auto-sign on envelope creation.
- [ ] ID verification enabled on client signer
- [x] Routing: client signs first → Carl auto-signs → emails to both — DONE (prior session).
- [x] DocuSign Connect webhook: on completion → payment gate unlocked — DONE (Aug 11, 2026): webhook registered in DocuSign production admin, fires on Envelope Signed/Completed.

---

## STAGE 7 — PIPELINE INTEGRATION
Correct legal order:

1. Client submits form → redirect to /thank-you "Check email to sign"
2. DocuSign agreement auto-sent → client signs → Carl auto-signs
3. DocuSign webhook → Stripe deposit payment link sent to client
4. Client pays deposit → builder link sent to client
5. Client completes builder → Carl receives all outputs
6. Carl manually starts clock → client notified

- [x] Change form redirect: /cart.html → /thank-you page — DONE (Aug 11, 2026): /website-order now always redirects to /thank-you.html?order_id=X.
      NOT DONE — tied to the payment-before-signing sequencing decision
      logged on the Google Drive to-do list; needs Carl's call before
      touching this, not a guess Claude should make.
- [x] DocuSign fires immediately on form submit
      Already true (found, not built) — see Stage 6.
- [x] DocuSign webhook → deposit payment link released — DONE (Aug 11, 2026): webhook sets agreement_signed_at, /cart-status returns cart_url, thank-you page auto-reveals Pay Deposit button.
      Partially done — the completion webhook itself was built in Stage 6
      and does fire on signing, but it currently just marks
      agreement_signed_at and emails Carl, not the client a deposit link
      (the client already gets sent straight to the payment page on form
      submit today, so this specific step doesn't apply the same way until
      the sequencing decision above is resolved).
- [x] Stripe deposit webhook → builder link email — DONE (prior session): handleOrderPayment() emails builder link on deposit.
      Already exists independently — handleOrderPayment() in
      webhook-handler.js already emails the client their builder link on
      deposit payment. Not new work, just confirming it was already there.
- [x] Builder submit → Carl alert + manual clock start from admin panel
      BUILT Aug 10, 2026. This was a real behavior change, not just a
      missing button — /builder/complete was auto-starting the 48-hour
      clock the instant a client finished their brief, with no manual
      step at all. Changed to:
        - /builder/complete now sets status='brief_complete' and
          builder_completed_at only — does NOT set building_started_at
          anymore. Carl's alert email updated to say "click Start Clock in
          the admin panel" instead of "the clock starts now."
        - New POST /admin/start-clock endpoint: looks up the order, checks
          it's actually ready (brief done, clock not already started),
          sets status='building' + building_started_at, computes an
          expected-ready date from the tier's turnaround text (exported
          TIER_INFO from docusign-service.js for this), and emails the
          client with that date.
        - New "Clock" column + "Start Clock" button in admin.html's
          sessions table, only shown for orders waiting on this step.
          progressLabel() now distinguishes Building / Waiting to start /
          In progress / Not started instead of just Submitted.
      BUG CAUGHT DURING TESTING: website_orders.status has a check
      constraint that didn't include 'brief_complete' as a valid value —
      would have thrown a real error the first time any real client
      completed their builder. Fixed via migration (added 'brief_complete'
      to the allowed status list) before this could hit production.
      Tested live end-to-end: real order, clicked Start Clock in the
      browser, confirmed status/building_started_at updated correctly and
      no errors in server logs.
- [x] Client notified with expected start date on clock start
      Built as part of the same work above — the client email includes a
      computed expected-ready date based on their tier's turnaround.

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
- [x] server.js portal session creation — BUILT Aug 10, 2026 (this was a
      real gap, not just a config-passing bug — no portal code existed at
      all before this). Built:
        - GET /portal?token=X — looks up the order by builder_link_token,
          reads stripe_customer_id, picks the Care Plan or Payment Plan
          config based on whether care_plan_stripe_subscription_id is set,
          creates the Stripe billing portal session, redirects. Tested live
          — confirmed real 302 redirect to a genuine billing.stripe.com
          session URL using a real test Stripe customer.
        - New nginx route: `location = /portal` -> port 3005.
      DEEPER GAP FOUND AND FIXED: there was no stripe_customer_id column
      and no code anywhere that ever captured a Stripe customer ID. Care
      Plan signups go through hardcoded, generic Stripe Payment Links
      (CARE_PLAN_EARLY_LINK / CARE_PLAN_STANDARD_LINK in server.js) with no
      reference back to the order at all. Fixed by:
        - Added stripe_customer_id and care_plan_confirmed_at columns to
          website_orders.
        - Extended webhook-handler.js: checkout.session.completed events
          with session.mode === 'subscription' are now matched to an order
          by customer email (best available correlation signal given the
          Payment Link has no client_reference_id), which stores
          stripe_customer_id + care_plan_stripe_subscription_id and sends a
          confirmation email containing the portal link.
      CAVEAT: email-match correlation isn't bulletproof — if a client pays
      with a different email than what's on their order, this silently
      fails to link (logs an error server-side, no customer-facing
      breakage, but their stripe_customer_id won't get captured). A more
      robust fix would be Stripe Payment Links with a `client_reference_id`
      or per-order Checkout Sessions instead of static links — bigger
      change, not done here.
- [ ] "Remaining balance due in full on cancellation" for payment plans —
      STILL NOT BUILT. Disabling the cancel button (done above) stops
      self-serve cancellation but doesn't create this behavior — that has
      no Stripe dashboard setting. Needs a webhook handler
      (customer.subscription.deleted, or an admin-triggered cancel
      endpoint) that immediately generates + sends an invoice for the
      unpaid remaining balance when a payment-plan subscription ends. Until
      built, payment-plan clients who want to cancel go through Carl
      manually (no self-serve path exists for them at all, by design).
- [x] Add portal link to post-launch client email
      DONE as part of the work above — the Care Plan confirmation email
      (new, sent from the new subscription webhook handler) includes the
      portal link. There was no separate distinct "post-launch" email to
      add this to; this is the natural point it belongs.
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
- [x] DocuSign production auth DONE (Aug 11, 2026): switched from sandbox (account-d.docusign.com) to production (account.docusign.com), generated new production client secret, full OAuth flow working, envelope creation confirmed live.
      OAuth is resolved — see session notes)



---

## SESSION SUMMARY — Aug 11, 2026

**Completed this session:**
- DocuSign production auth fixed (sandbox → production OAuth, new client secret, axios-based sendAgreement, verified live)
- DocuSign Connect webhook registered in production (Envelope Signed/Completed → /docusign/webhook)
- Payment gate: form redirects to /thank-you.html, polls /cart-status every 10s, Pay Deposit button appears on signing
- /thank-you.html built and deployed
- /cart-status endpoint built and nginx routed
- Stage 3: Auto-email to client when admin generates builder link
- Stage 4a: Font preference, inspiration URLs, avoid text, registrar dropdown, site name field (5 new fields + Supabase columns)
- Stage 4 Step 5: Page structure builder (per-page copy options, Terms & Privacy, integrations checklist)
- Stage 4 Steps 6+7: Review & Submit card (live pricing summary, payment plan selector, submit handler)
- DocuSign 20-day token refresh cron (/usr/local/bin/ds_refresh.sh, runs 0 3 */20 * *)
- Stripe publishable key bug already fixed (verified)

**Remaining priorities:**
1. NC attorney review of service agreement before real clients sign
2. Rotate GitHub PAT (used heavily this session)
3. DMARC upgrade: p=none → p=quarantine
4. End-to-end smoke test with real order
5. Deferred builder items: token validation vs intake_links, session password, auto-save timer, favicon, logo add-on flow
