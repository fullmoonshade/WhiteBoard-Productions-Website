// app/about/page.tsx
import React from "react";
import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — WhiteBoard Productions | Professional Podcast & Video Editing",
  description: "Learn about WhiteBoard Productions, a professional podcasting and video editing agency serving content creators, businesses, and influencers worldwide with fast, engaging content.",
  keywords: ["about WhiteBoard Productions", "podcast editing company", "video production agency", "content creation services", "professional audio editing"],
  openGraph: {
    title: "About WhiteBoard Productions",
    description: "Professional podcasting and video editing agency serving content creators worldwide",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WhiteBoard Productions",
    url: "https://whiteboardproductions.com",
    logo: "https://whiteboardproductions.com/logo.png",
    description:
      "WhiteBoard Productions is a professional podcasting and video editing agency serving content creators, businesses, and influencers worldwide.",
    sameAs: [
      "https://x.com/WhiteBoard_bz",
      "https://www.youtube.com/channel/UC2iCPKVrpk3IdAGIrjFfdJw",
      "https://www.instagram.com/whiteboard.bz/",
      "https://www.linkedin.com/company/whiteboard-bz/",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Miami",
      addressRegion: "FL",
      addressCountry: "US",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+1-555-555-5555",
        contactType: "customer service",
      },
    ],
    areaServed: [
      { "@type": "Place", name: "Miami" },
      { "@type": "Place", name: "Los Angeles" },
      { "@type": "Place", name: "New York" },
      { "@type": "Place", name: "Canada" },
      { "@type": "Place", name: "United Kingdom" },
    ],
  };

  return (
    <>
      {/* SEO Schema for Google + LLMs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />

      <SiteHeader />

      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 px-6 md:px-12 lg:px-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          About WhiteBoard Productions
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-80">
          Pioneering the future of podcasting and video editing for content creators worldwide.
        </p>
      </section>

      {/* Feature Grid */}
      <section className="py-16 bg-neutral-900 text-white px-6 md:px-12 lg:px-20">
        <div className="grid gap-12 md:grid-cols-3">
          {[
            {
              title: "Podcast Production",
              desc: "Professional audio editing and mastering that brings your voice to life.",
            },
            {
              title: "Video Editing",
              desc: "Engaging video content that captivates audiences across all platforms.",
            },
            {
              title: "Social Media Clips",
              desc: "Viral-ready content optimized for Instagram, TikTok, and YouTube.",
            },
            {
              title: "Content Strategy",
              desc: "Helping creators develop compelling narratives that resonate with audiences.",
            },
            {
              title: "Fast Turnaround",
              desc: "Quick delivery without compromising on quality or attention to detail.",
            },
            {
              title: "Multi-Platform Optimization",
              desc: "Content tailored for each platform's unique requirements and audience.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-neutral-800 p-6 rounded-2xl shadow-lg hover:scale-105 transform transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="opacity-80">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-center text-white px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Elevate Your Content?
        </h2>
        <p className="text-lg opacity-80 mb-8">
          Let WhiteBoard Productions bring your ideas to life.
        </p>
        <a
          href="/contact"
          className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-neutral-200 transition-all"
        >
          Get in Touch
        </a>
      </section>
    </>
  );
}
