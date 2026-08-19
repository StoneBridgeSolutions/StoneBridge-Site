import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-navy pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12">
          <Link to="/" className="text-gold font-sans text-sm hover:underline mb-6 inline-block">&larr; Back to Home</Link>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Privacy Policy</h1>
          <p className="text-white/75 font-sans text-sm">Effective Date: January 1, 2026 &nbsp;&bull;&nbsp; Last Updated: March 2026</p>
          <p className="text-white/85 font-sans mt-4 leading-relaxed">
            StoneBridge Solutions Inc. (&ldquo;StoneBridge,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our
            website, client portal, and managed marketing services.
          </p>
        </div>

        <div className="space-y-10 font-sans text-white/90 leading-relaxed">

          {/* Section 1 */}
          <section>
            <h2 className="text-white text-2xl font-semibold mb-3 border-b border-white/10 pb-2">1. Information We Collect</h2>
            <p className="mb-3">We collect information you provide directly, information generated through your use of our services, and information from third-party platforms we integrate with.</p>
            <h3 className="text-light text-lg font-semibold mt-5 mb-2">a. Information You Provide</h3>
            <ul className="list-disc list-inside space-y-1 text-white/85">
              <li>Name, email address, phone number, and business name</li>
              <li>Employer Identification Number (EIN) and business address (collected during onboarding for service setup)</li>
              <li>Billing information processed securely through Stripe (we do not store card numbers)</li>
              <li>Social media account credentials and platform tokens you authorize</li>
              <li>Content you submit for marketing use (photos, copy, logos, brand assets)</li>
              <li>Communications with our team via email or the client portal</li>
            </ul>
            <h3 className="text-light text-lg font-semibold mt-5 mb-2">b. Information Collected Automatically</h3>
            <ul className="list-disc list-inside space-y-1 text-white/85">
              <li>Usage data: pages visited, features used, session duration, click events</li>
              <li>Device and browser information, IP address</li>
              <li>Authentication tokens and session identifiers</li>
              <li>Voice call metadata (duration, timestamps, call outcomes) from AI phone agents</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-white text-2xl font-semibold mb-3 border-b border-white/10 pb-2">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-1 text-white/85">
              <li>Deliver and manage your subscribed services (social media posting, email newsletters, voice AI, intake forms)</li>
              <li>Process payments and manage your subscription billing cycle</li>
              <li>Configure and operate AI voice agents on your behalf</li>
              <li>Send account notifications, onboarding instructions, and service updates</li>
              <li>Respond to support requests</li>
              <li>Improve our platform, diagnose issues, and develop new features</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          {/* Section 3  Third-Party Services */}
          <section>
            <h2 className="text-white text-2xl font-semibold mb-3 border-b border-white/10 pb-2">3. Third-Party Services We Use</h2>
            <p className="mb-4">To deliver our services, we integrate with the following third-party platforms. Each has its own privacy policy that governs how they handle data.</p>

            <div className="space-y-5">

              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <h3 className="text-gold font-semibold text-lg mb-1">Supabase</h3>
                <p className="text-white/85 text-sm">Our primary database and authentication provider. Your account data, business profile, subscription details, and usage records are stored in Supabase. Data is encrypted at rest and in transit. Supabase is SOC 2 Type II compliant.</p>
                <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-gold/80 text-xs hover:underline mt-1 inline-block">supabase.com/privacy &rarr;</a>
              </div>

              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <h3 className="text-gold font-semibold text-lg mb-1">Stripe</h3>
                <p className="text-white/85 text-sm">All payment processing is handled by Stripe. We do not store credit card numbers, CVV codes, or full bank details on our servers. Stripe is PCI DSS Level 1 certified. We store only a Stripe customer ID and subscription metadata.</p>
                <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-gold/80 text-xs hover:underline mt-1 inline-block">stripe.com/privacy &rarr;</a>
              </div>

              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <h3 className="text-gold font-semibold text-lg mb-1">Retell AI</h3>
                <p className="text-white/85 text-sm">We use Retell AI to power our Voice AI phone agent service. When a caller interacts with your AI agent, the conversation is processed by Retell AI&apos;s infrastructure. Call transcripts, summaries, and metadata may be stored to deliver intake results to your dashboard. Retell AI processes voice data to generate responses and extract caller information per your agent configuration.</p>
                <a href="https://www.retellai.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-gold/80 text-xs hover:underline mt-1 inline-block">retellai.com/privacy-policy &rarr;</a>
              </div>

              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <h3 className="text-gold font-semibold text-lg mb-1">Telnyx</h3>
                <p className="text-white/85 text-sm">Telnyx provides the telephony infrastructure (phone numbers, call routing, SIP) that connects callers to your Retell AI agent. Call metadata including caller phone number, call duration, and timestamps passes through Telnyx. Telnyx is a licensed telecommunications carrier and complies with applicable telecom regulations including TCPA.</p>
                <a href="https://telnyx.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-gold/80 text-xs hover:underline mt-1 inline-block">telnyx.com/privacy-policy &rarr;</a>
              </div>

              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <h3 className="text-gold font-semibold text-lg mb-1">OpenAI / AI Language Models</h3>
                <p className="text-white/85 text-sm">Certain features of our platform (including AI-assisted content generation and voice agent intelligence) may utilize large language model APIs. Prompts and content submitted to these services are subject to the provider&apos;s data usage policies. We do not submit personally identifiable information to AI model APIs beyond what is necessary to deliver the service.</p>
                <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-gold/80 text-xs hover:underline mt-1 inline-block">openai.com/policies/privacy-policy &rarr;</a>
              </div>

              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <h3 className="text-gold font-semibold text-lg mb-1">Social Media Platforms</h3>
                <p className="text-white/85 text-sm">When you connect your social accounts (Facebook, Instagram, LinkedIn, Google Business, etc.), we receive OAuth tokens that allow us to post content on your behalf. We do not store your social media passwords. Token access is limited to the scopes you authorize. You may revoke access at any time from within your social platform&apos;s settings.</p>
              </div>

              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <h3 className="text-gold font-semibold text-lg mb-1">Email Service Providers</h3>
                <p className="text-white/85 text-sm">We use third-party email delivery services to send newsletters and transactional emails on behalf of our clients. Subscriber lists you provide are used exclusively to deliver your campaigns and are not shared, sold, or used for any other purpose. Unsubscribe requests are honored promptly.</p>
              </div>

              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <h3 className="text-gold font-semibold text-lg mb-1">Hostinger VPS / Infrastructure</h3>
                <p className="text-white/85 text-sm">Our application servers are hosted on Hostinger VPS infrastructure. Server logs, which may include IP addresses and request metadata, are retained for security and debugging purposes and are not shared with third parties.</p>
                <a href="https://www.hostinger.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-gold/80 text-xs hover:underline mt-1 inline-block">hostinger.com/privacy-policy &rarr;</a>
              </div>

            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-white text-2xl font-semibold mb-3 border-b border-white/10 pb-2">4. Data Sharing</h2>
            <p className="mb-3">We do not sell your personal information. We share data only in the following circumstances:</p>
            <ul className="list-disc list-inside space-y-1 text-white/85">
              <li><strong className="text-light">Service delivery:</strong> With the third-party providers listed above, only as necessary to provide your subscribed services</li>
              <li><strong className="text-light">Legal compliance:</strong> When required by law, court order, or government authority</li>
              <li><strong className="text-light">Business transfer:</strong> In connection with a merger, acquisition, or sale of assets, with appropriate confidentiality protections</li>
              <li><strong className="text-light">With your consent:</strong> In any other circumstances where you have explicitly authorized disclosure</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-white text-2xl font-semibold mb-3 border-b border-white/10 pb-2">5. Data Retention</h2>
            <p>We retain your data for as long as your account is active and for a reasonable period after cancellation to comply with legal obligations and resolve disputes. Voice call recordings and transcripts are retained for 90 days unless you request earlier deletion. You may request deletion of your data at any time by contacting us at <a href="mailto:privacy@stonebridgesolutions.io" className="text-gold hover:underline">privacy@stonebridgesolutions.io</a>.</p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-white text-2xl font-semibold mb-3 border-b border-white/10 pb-2">6. Your Rights</h2>
            <p className="mb-3">Depending on your location, you may have the following rights regarding your personal data:</p>
            <ul className="list-disc list-inside space-y-1 text-white/85">
              <li><strong className="text-light">Access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong className="text-light">Correction:</strong> Request correction of inaccurate or incomplete data</li>
              <li><strong className="text-light">Deletion:</strong> Request deletion of your personal data (subject to legal retention requirements)</li>
              <li><strong className="text-light">Portability:</strong> Request your data in a machine-readable format</li>
              <li><strong className="text-light">Opt-out:</strong> Opt out of marketing communications at any time</li>
              <li><strong className="text-light">Revoke access:</strong> Disconnect social media accounts or revoke API tokens at any time</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, contact us at <a href="mailto:privacy@stonebridgesolutions.io" className="text-gold hover:underline">privacy@stonebridgesolutions.io</a>.</p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-white text-2xl font-semibold mb-3 border-b border-white/10 pb-2">7. Cookies & Tracking</h2>
            <p>Our website uses essential cookies for session management and authentication. We do not currently use third-party advertising trackers or behavioral analytics cookies. If this changes, we will update this policy and request your consent where required by law.</p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-white text-2xl font-semibold mb-3 border-b border-white/10 pb-2">8. Security</h2>
            <p>We implement industry-standard security measures including TLS encryption in transit, encrypted storage at rest, row-level security in our database, and restricted access controls. No system is 100% secure. In the event of a data breach, we will notify affected users in accordance with applicable law.</p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-white text-2xl font-semibold mb-3 border-b border-white/10 pb-2">9. Children&apos;s Privacy</h2>
            <p>Our services are intended for business owners and are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If we become aware that a minor has provided personal information, we will delete it promptly.</p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-white text-2xl font-semibold mb-3 border-b border-white/10 pb-2">10. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. When we do, we will update the &ldquo;Last Updated&rdquo; date at the top of this page and notify active subscribers via email. Continued use of our services after updates constitutes acceptance of the revised policy.</p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-white text-2xl font-semibold mb-3 border-b border-white/10 pb-2">11. Contact Us</h2>
            <p className="mb-2">If you have questions about this Privacy Policy or how we handle your data:</p>
            <div className="bg-white/5 rounded-xl p-5 border border-white/10 text-white/85 text-sm space-y-1">
              <p><strong className="text-light">StoneBridge Solutions Inc.</strong></p>
              <p>Email: <a href="mailto:privacy@stonebridgesolutions.io" className="text-gold hover:underline">privacy@stonebridgesolutions.io</a></p>
              <p>Support: <a href="mailto:support@stonebridgesolutions.io" className="text-gold hover:underline">support@stonebridgesolutions.io</a></p>
              <p>Website: <a href="https://stonebridgesolutions.io" className="text-gold hover:underline">stonebridgesolutions.io</a></p>
            </div>
          </section>

        </div>

        {/* Bottom nav */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-4 text-sm font-sans text-white/75">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <Link to="/pricing" className="hover:text-gold transition-colors">Pricing</Link>
          <span>&copy; 2026 StoneBridge Solutions Inc. All rights reserved.</span>
        </div>

      </div>
    </div>
  );
}
