"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Instagram, Twitter, Youtube, MessageCircle, Linkedin } from "lucide-react"
import LazyVideo from "./lazy-video"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useTransition } from "./transition-provider"

interface FooterContent {
  tagline: string
  copyright: string
}

const defaultContent: FooterContent = {
  tagline: "Experience professional podcasting and video editing like never before. We craft engaging content for creators and brands.",
  copyright: "© 2025 — WhiteBoard Productions",
}

export function AppverseFooter() {
  const [content, setContent] = useState<FooterContent>(defaultContent)
  const router = useRouter()
  const { triggerTransition } = useTransition()

  const handleSmoothScroll = (href: string, e: React.MouseEvent) => {
    // Trigger fade transition for any navigation click
    triggerTransition()
    
    if (href.startsWith("#")) {
      e.preventDefault()
      // If we're not on the home page, navigate to home page first, then scroll to section
      if (window.location.pathname !== "/") {
        router.push(`/${href}`)
      } else {
        // If we're already on home page, just scroll to the section
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      }
    } else if (href === "/") {
      e.preventDefault()
      // If we're not on the home page, navigate there first
      if (window.location.pathname !== "/") {
        router.push("/")
      } else {
        // If we're already on home page, just scroll to top
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
    }
  }

  useEffect(() => {
    // Load content from localStorage
    const savedContent = localStorage.getItem("whiteboard-content")
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent)
        if (parsed.footer) {
          setContent(parsed.footer)
        }
      } catch (error) {
        console.error("Error parsing saved content:", error)
      }
    }
  }, [])

  return (
    <section id="footer" className="text-white">
      {/* Contact CTA */}
      <div className="container mx-auto px-4 pt-12 sm:pt-16">
        <div className="flex justify-center">
          <Button
            asChild
            className="rounded-full bg-white px-6 py-2 text-sm font-medium text-black shadow-[0_0_20px_rgba(255,255,255,0.35)] hover:bg-gray-100"
          >
            <a href="https://wa.me/message/DUFCKWYTKH7KC1" target="_blank" rel="noopener noreferrer">
              Contact us
            </a>
          </Button>
        </div>
      </div>

      {/* Download the app */}
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <Card className="relative overflow-hidden rounded-3xl liquid-glass p-6 sm:p-10">
          <div className="relative grid items-center gap-8 md:grid-cols-2">
            {/* Left copy */}
            <div>
              <p className="mb-2 text-[11px] tracking-widest text-red-400">STREAMLINE YOUR CONTENT</p>
              <h3 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
                Preview &amp; approve professional content from anywhere
              </h3>
              <p className="mt-2 max-w-prose text-sm text-neutral-400">
                Review edits, leave timestamped comments, and approve content from anywhere. Using our revision &amp;
                collaboration tools
              </p>
            </div>

            {/* Right mockup */}
            <div className="mx-auto w-full max-w-[320px]">
              <div className="relative rounded-[28px] liquid-glass p-2 shadow-2xl">
                <div className="relative aspect-[9/19] w-full overflow-hidden rounded-2xl bg-black">
                  {/* Lazy-loaded video fills the screen */}
                  <LazyVideo
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Timeline%202-YFaCK7cEiHWSMRv8XEHaLCoYj2SUAi.mp4"
                    className="absolute inset-0 h-full w-full object-cover"
                    autoplay={true}
                    loop={true}
                    muted={true}
                    playsInline={true}
                    aria-label="WhiteBoard Productions app preview - approvals made easy"
                  />
                  {/* On-screen content */}
                  <div className="relative p-3">
                    <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-white/20" />
                    <div className="space-y-1 px-1">
                      <div className="text-5xl font-extrabold text-red-400">Approvals Made Easy</div>
                      <p className="text-xs text-white/80">From feedback to approval in a single flow</p>
                      <div className="mt-3 inline-flex items-center rounded-full bg-black/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-red-400">
                        Zero Hassle
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 pb-20 md:pb-10">
        <div className="container mx-auto px-4 py-10">
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
            {/* Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5">
                <Image src="/icons/WhiteBoard-productions-logo-bnw.svg" alt="WhiteBoard Productions logo" width={24} height={24} className="h-6 w-6" />
                <span className="text-xl font-semibold text-red-400">WhiteBoard</span>
              </div>
              <p className="max-w-sm text-sm text-neutral-400">{content.tagline}</p>
            </div>

            {/* Navigation */}
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-2">
              <div>
                <h5 className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-400">Navigation</h5>
                <ul className="space-y-2 text-sm text-neutral-300">
                  <li>
                    <Link href="/" className="hover:text-red-400" onClick={(e) => handleSmoothScroll("/", e)}>Home</Link>
                  </li>
                  <li>
                    <Link href="#pricing" className="hover:text-red-400" onClick={(e) => handleSmoothScroll("#pricing", e)}>Pricing</Link>
                  </li>
                  <li>
                    <Link href="/faq" className="hover:text-red-400">FAQ</Link>
                  </li>
                  <li>
                    <Link href="/About" className="hover:text-red-400">About</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-400">Social media</h5>
                <ul className="space-y-2 text-sm text-neutral-300">
                  <li className="flex items-center gap-2">
                    <Twitter className="h-4 w-4 text-neutral-400" />
                    <a
                      href="https://x.com/WhiteBoard_bz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-red-400"
                      aria-label="Follow WhiteBoard Productions on X"
                    >
                      X/Twitter
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Youtube className="h-4 w-4 text-neutral-400" />
                    <a
                      href="https://www.youtube.com/channel/UC2iCPKVrpk3IdAGIrjFfdJw"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-red-400"
                      aria-label="Subscribe to WhiteBoard Productions on YouTube"
                    >
                      YouTube
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Instagram className="h-4 w-4 text-neutral-400" />
                    <a
                      href="https://www.instagram.com/whiteboard.bz/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-red-400"
                      aria-label="Follow WhiteBoard Productions on Instagram"
                    >
                      Instagram
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4 text-neutral-400" />
                    <a
                      href="https://www.linkedin.com/company/whiteboard-bz/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-red-400"
                      aria-label="Follow WhiteBoard Productions on LinkedIn"
                    >
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-neutral-500 sm:flex-row">
            <p>{content.copyright}</p>
            <div className="flex items-center gap-6">
              <Link href="/revisions" className="hover:text-red-400">
                Revision Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </section>
  )
}
