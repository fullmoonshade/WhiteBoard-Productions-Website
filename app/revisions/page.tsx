import { SiteHeader } from "@/components/site-header";
import { AppverseFooter } from "@/components/appverse-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Revision Policy — WhiteBoard Productions",
  description: "Our revision policy ensures transparency and fairness for all clients while maintaining the quality and efficiency of our podcasting and video editing work.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RevisionPolicyPage() {
  return (
    <>
      <SiteHeader />
      <section className="bg-[#0a0a0a] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-[#0f0f0f] p-6 sm:p-10 shadow-xl">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(163,230,53,0.10),transparent_55%)]" />
              <div className="relative space-y-12">
                <header className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight text-lime-300">Revision Policy</h1>
                  <p className="text-neutral-400 text-lg">
                    Our revision policy ensures transparency and fairness for all clients while maintaining the quality and efficiency of our podcasting and video editing work.
                  </p>
                </header>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">1. Included Revisions</h2>
                  <p className="text-neutral-300">
                    Each plan includes a set number of revisions as listed in its respective tier:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-neutral-400">
                    <li>Startup Plan: 2 revisions included</li>
                    <li>Pro Plan: 4 revisions included</li>
                    <li>Premium Plan: Unlimited revisions within the agreed project scope</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">2. Additional Revisions</h2>
                  <p className="text-neutral-300">
                    Any revisions beyond the included amount will be charged at the following hourly rates:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-neutral-400">
                    <li>Startup Plan: $35/hour</li>
                    <li>Pro Plan: $55/hour</li>
                    <li>Premium Plan: $60/hour</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">3. Scope of Revisions</h2>
                  <p className="text-neutral-300">
                    Revisions are meant to refine and adjust the agreed deliverables, not to expand the original scope of work. Significant changes or additions will require a new project agreement.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">4. Turnaround Time</h2>
                  <p className="text-neutral-300">
                    The turnaround time for revisions will depend on the complexity of the requested changes and current project workload. We typically deliver revisions within 2-5 business days.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">5. Quality Assurance</h2>
                  <p className="text-neutral-300">
                    All revisions undergo our quality assurance process to ensure they meet WhiteBoard Productions' high standards for podcasting and video editing excellence.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">6. Contact Us</h2>
                  <p className="text-neutral-300">
                    For questions regarding our revision policy, please contact us at:
                  </p>
                  <p className="text-neutral-300">
                    Email: <a href="mailto:hello@whiteboardproductions.com" className="text-lime-300 underline">hello@whiteboardproductions.com</a>
                  </p>
                  <p className="text-neutral-300">
                    WhatsApp: <a href="https://wa.me/message/DUFCKWYTKH7KC1" className="text-lime-300 underline" target="_blank" rel="noopener noreferrer">Contact us on WhatsApp</a>
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AppverseFooter />
    </>
  );
}
