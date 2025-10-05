import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"

export default function FAQPage() {
  return (
    <>
      <SiteHeader />
      <section className="bg-[#0a0a0a] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl liquid-glass p-6 sm:p-10 shadow-xl">
              <div className="relative space-y-12">
                <header className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight text-lime-300">Frequently Asked Questions</h1>
                  <p className="text-neutral-400 text-lg">
                    Answers to common questions we get from content creators about podcasting and video editing services.
                  </p>
                </header>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">
                    1. What types of content do you edit?
                  </h2>
                  <p className="text-neutral-300">
                    We specialize in podcast editing, video content creation, social media clips, and multi-platform optimization. From long-form podcasts to viral TikTok clips, we handle all types of audio and video content.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">2. How long does a typical edit take?</h2>
                  <p className="text-neutral-300">
                    Turnaround times vary by project complexity. A standard 15-minute podcast edit takes 2-3 days, while social media clips are typically delivered within 24-48 hours.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">
                    3. What audio/video formats do you work with?
                  </h2>
                  <p className="text-neutral-300">
                    We accept all major formats including MP3, WAV, MP4, MOV, and more. We can also work with raw recordings and provide optimized outputs for different platforms.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">4. How do you price your services?</h2>
                  <p className="text-neutral-300">
                    Pricing is based on content length, complexity, and turnaround time. You can view our detailed pricing on our{" "}
                    <a href="/pricing" className="text-lime-300 underline">
                      pricing page
                    </a>
                    .
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">5. Can we request changes after delivery?</h2>
                  <p className="text-neutral-300">
                    Yes. All revisions are covered under our{" "}
                    <a href="/revisions" className="text-lime-300 underline">
                      revision policy
                    </a>
                    , which ensures smooth updates without unexpected scope creep.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">
                    6. Will the content match our brand's style?
                  </h2>
                  <p className="text-neutral-300">
                    Absolutely. We customize editing style, pacing, transitions, and audio treatment to fit your brand's identity and platform requirements.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">7. What formats do you deliver in?</h2>
                  <p className="text-neutral-300">
                    We deliver optimized formats for each platform - MP3/WAV for podcasts, MP4 for videos, and platform-specific formats for social media. High-resolution masters are also available.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">
                    8. Can you handle large-scale projects or bulk editing?
                  </h2>
                  <p className="text-neutral-300">
                    Yes, we regularly work on bulk orders for multiple episodes, series, or campaigns. We optimize workflows to maintain quality and meet tight deadlines.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">
                    9. Do you offer creative direction or only technical editing?
                  </h2>
                  <p className="text-neutral-300">
                    We do both. Our team can develop creative concepts, content strategies, and editing styles, or simply execute your pre-approved vision with technical excellence.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">10. How do we get started?</h2>
                  <p className="text-neutral-300">
                    Simply{" "}
                    <a href="/contact" className="text-lime-300 underline">
                      contact us
                    </a>{" "}
                    with your project details, content samples, and timeline. We'll provide a proposal and next steps.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AppverseFooter />
    </>
  )
}
