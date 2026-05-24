import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Terms of Service — Brick AI',
  description: 'Terms and conditions for using Brick AI.',
}

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="pt-[66px]">
        <div className="max-w-[720px] mx-auto px-6 md:px-10 py-20">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#AFAFAF] mb-4">Legal</p>
          <h1 className="text-4xl font-black tracking-tight mb-2">Terms of Service</h1>
          <p className="text-sm text-[#AFAFAF] mb-12">Last updated: 24 May 2026</p>

          <div className="prose prose-sm max-w-none space-y-10 text-[#3A3A3A]">

            <section>
              <h2 className="text-lg font-bold mb-3">1. Acceptance of terms</h2>
              <p className="leading-relaxed text-[#6B6B6B]">By accessing or using Brick AI (&quot;the Service&quot;) operated by Brick AI Pty Ltd (&quot;we&quot;, &quot;us&quot;), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">2. Description of service</h2>
              <p className="leading-relaxed text-[#6B6B6B]">Brick AI is an AI-powered property research and decision-support tool designed to assist first-home buyers in Australia. The Service provides general property information, suburb analysis, and AI-generated insights based on available data. <strong>Brick AI does not provide financial, legal, or investment advice.</strong></p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">3. Not financial advice</h2>
              <p className="leading-relaxed text-[#6B6B6B]">The information provided by Brick AI is for general informational purposes only and does not constitute financial advice, investment advice, or a recommendation to buy or sell any property. You should always consult a licensed financial adviser, mortgage broker, conveyancer, or solicitor before making any financial or property decisions.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">4. Eligibility</h2>
              <p className="leading-relaxed text-[#6B6B6B]">You must be at least 18 years old to use the Service. By using Brick AI, you represent and warrant that you meet this requirement.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">5. User conduct</h2>
              <p className="leading-relaxed text-[#6B6B6B] mb-3">You agree not to:</p>
              <ul className="list-disc pl-5 space-y-2 text-[#6B6B6B]">
                <li>Use the Service for any unlawful purpose</li>
                <li>Attempt to reverse engineer, scrape, or exploit the AI systems</li>
                <li>Submit false or misleading information</li>
                <li>Interfere with the security or integrity of the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">6. Intellectual property</h2>
              <p className="leading-relaxed text-[#6B6B6B]">All content, trademarks, and technology within the Service are the property of Brick AI Pty Ltd. You may not copy, reproduce, or distribute any part of the Service without our express written consent.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">7. Disclaimer of warranties</h2>
              <p className="leading-relaxed text-[#6B6B6B]">The Service is provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, express or implied. We do not warrant that AI-generated insights are accurate, complete, or up to date. Property market data may not reflect the most current conditions.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">8. Limitation of liability</h2>
              <p className="leading-relaxed text-[#6B6B6B]">To the maximum extent permitted by law, Brick AI Pty Ltd shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service, including any property purchase decisions made in reliance on AI-generated content.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">9. Privacy</h2>
              <p className="leading-relaxed text-[#6B6B6B]">Your use of the Service is also governed by our <a href="/privacy" className="underline text-black">Privacy Policy</a>, which is incorporated into these Terms by reference.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">10. Governing law</h2>
              <p className="leading-relaxed text-[#6B6B6B]">These Terms are governed by the laws of New South Wales, Australia. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of New South Wales.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">11. Changes to terms</h2>
              <p className="leading-relaxed text-[#6B6B6B]">We reserve the right to modify these Terms at any time. Continued use of the Service after changes constitutes your acceptance of the revised Terms.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">12. Contact</h2>
              <p className="leading-relaxed text-[#6B6B6B]">For questions about these Terms, contact:<br /><strong>Brick AI Pty Ltd</strong><br />Email: legal@thebrickai.com</p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
