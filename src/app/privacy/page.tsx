import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Privacy Policy — Brick AI',
  description: 'How Brick AI collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="pt-[66px]">
        <div className="max-w-[720px] mx-auto px-6 md:px-10 py-20">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#AFAFAF] mb-4">Legal</p>
          <h1 className="text-4xl font-black tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-sm text-[#AFAFAF] mb-12">Last updated: 24 May 2026</p>

          <div className="prose prose-sm max-w-none space-y-10 text-[#3A3A3A]">

            <section>
              <h2 className="text-lg font-bold mb-3">1. Overview</h2>
              <p className="leading-relaxed text-[#6B6B6B]">Brick AI Pty Ltd (&quot;Brick AI&quot;, &quot;we&quot;, &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website at <strong>thebrickai.com</strong> and our associated services (the &quot;Service&quot;). By using the Service, you consent to the practices described in this policy.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">2. Information we collect</h2>
              <p className="leading-relaxed text-[#6B6B6B] mb-3">We collect information you provide directly to us, including:</p>
              <ul className="list-disc pl-5 space-y-2 text-[#6B6B6B]">
                <li>Name and email address (when joining the waitlist)</li>
                <li>Property preferences such as buyer type, target city, and budget</li>
                <li>Conversation data when interacting with Brick AI</li>
                <li>How you heard about us</li>
              </ul>
              <p className="leading-relaxed text-[#6B6B6B] mt-3">We also collect certain information automatically when you use the Service, including IP address, browser type, pages visited, and device identifiers via analytics tools (Vercel Analytics).</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">3. How we use your information</h2>
              <p className="leading-relaxed text-[#6B6B6B] mb-3">We use the information we collect to:</p>
              <ul className="list-disc pl-5 space-y-2 text-[#6B6B6B]">
                <li>Operate and improve the Service</li>
                <li>Communicate with you about product updates and your waitlist status</li>
                <li>Understand how users interact with Brick AI to improve AI responses</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p className="leading-relaxed text-[#6B6B6B] mt-3">We do not sell your personal information to third parties.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">4. Data storage and security</h2>
              <p className="leading-relaxed text-[#6B6B6B]">Your data is stored securely using Supabase (hosted on AWS infrastructure). We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">5. Third-party services</h2>
              <p className="leading-relaxed text-[#6B6B6B] mb-3">We use the following third-party services that may process your data:</p>
              <ul className="list-disc pl-5 space-y-2 text-[#6B6B6B]">
                <li><strong>Supabase</strong> — database and authentication</li>
                <li><strong>Vercel</strong> — hosting and analytics</li>
                <li><strong>Google Gemini API</strong> — AI responses in the product (no data retained for model training)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">6. Your rights</h2>
              <p className="leading-relaxed text-[#6B6B6B]">Under Australian Privacy law (the Privacy Act 1988), you have the right to access, correct, or request deletion of your personal information. To exercise these rights, contact us at <strong>privacy@thebrickai.com</strong>.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">7. Cookies</h2>
              <p className="leading-relaxed text-[#6B6B6B]">We use essential cookies to operate the Service and analytics cookies to understand usage patterns. You can disable cookies in your browser settings, though this may affect functionality.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">8. Changes to this policy</h2>
              <p className="leading-relaxed text-[#6B6B6B]">We may update this Privacy Policy from time to time. We will notify you of significant changes by email or by posting a prominent notice on the website.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">9. Contact us</h2>
              <p className="leading-relaxed text-[#6B6B6B]">For privacy-related enquiries, contact:<br /><strong>Brick AI Pty Ltd</strong><br />Email: privacy@thebrickai.com</p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
