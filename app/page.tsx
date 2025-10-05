import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { LogoMarquee } from "@/components/logo-marquee"
import { Pricing } from "@/components/pricing"
import { AppverseFooter } from "@/components/appverse-footer"
import Script from "next/script"

// ✅ Force static generation for low TTFB
export const dynamic = "force-static"

export default function Page() {
  // Structured data for pricing
  const pricingStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPageElement",
    "@id": "https://whiteboardproductions.com/#pricing",
    name: "Pricing Plans",
    description: "Podcasting and video editing pricing plans - Startup, Pro, and Premium packages for all content creators",
    url: "https://whiteboardproductions.com/#pricing",
    mainEntity: {
      "@type": "PriceSpecification",
      name: "Podcasting & Video Editing Services",
      description: "Professional podcasting and video editing services with three pricing tiers",
      offers: [
        {
          "@type": "Offer",
          name: "Startup Plan",
          price: "299",
          priceCurrency: "USD",
          description: "Up to 15s video clips with 2 revisions",
        },
        {
          "@type": "Offer",
          name: "Pro Plan",
          price: "699",
          priceCurrency: "USD",
          description: "Up to 25s video content with 4 revisions",
        },
        {
          "@type": "Offer",
          name: "Premium Plan",
          price: "2049",
          priceCurrency: "USD",
          description: "40-60s premium video content with unlimited revisions",
        },
      ],
    },
  }

  // Structured data for main page
  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://whiteboardproductions.com/",
    name: "WhiteBoard Productions | Professional Podcasting & Video Editing Services",
    description:
      "Professional podcasting and video editing services. From crystal-clear audio production to viral-ready video clips and engagement-focused content for social media platforms.",
    url: "https://whiteboardproductions.com/",
    mainEntity: {
      "@type": "Organization",
      name: "WhiteBoard Productions",
      url: "https://whiteboardproductions.com",
      sameAs: [
        "https://twitter.com/whiteboardprod",
        "https://www.youtube.com/@whiteboardproductions",
        "https://instagram.com/whiteboardproductions",
        "https://threads.com/whiteboardproductions",
      ],
    },
    hasPart: [
      {
        "@type": "WebPageElement",
        "@id": "https://whiteboardproductions.com/#pricing",
        name: "Pricing Section",
        url: "https://whiteboardproductions.com/#pricing",
      },
    ],
  }

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        <Hero />
        <Features />
        <LogoMarquee />
        <Pricing />
        <AppverseFooter />
      </main>

      {/* JSON-LD structured data */}
      <Script
        id="pricing-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pricingStructuredData),
        }}
      />

      <Script
        id="page-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageStructuredData),
        }}
      />
    </>
  )
}
