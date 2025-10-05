"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import { Menu, Briefcase, Tag, HelpCircle, Info } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTransition } from "@/components/transition-provider"

export function SiteHeader() {
  const router = useRouter()
  const { triggerTransition } = useTransition()
  
  const links = [
    { href: "/", label: "Home", icon: Briefcase },
    { href: "#pricing", label: "Pricing", icon: Tag },
    { href: "faq", label: "FAQ", icon: HelpCircle },
    { href: "About", label: "About", icon: Info },
  ]

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

  return (
    <header className="sticky top-0 z-50 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex h-14 items-center justify-between px-6 liquid-glass-header rounded-full">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-1.5" onClick={(e) => handleSmoothScroll("/", e)}>
            <Image
              src="/icons/WhiteBoard-productions-logo-bnw.svg"
              alt="WhiteBoard Productions logo"
              width={20}
              height={20}
              className="h-5 w-5"
            />
            <span className="font-semibold tracking-wide text-white">WhiteBoard</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-6 text-sm text-gray-300 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-purple-300 transition-colors"
                onClick={(e) => handleSmoothScroll(l.href, e)}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <Button
              asChild
              className="bg-lime-400 text-black font-medium rounded-lg px-6 py-2.5
                         hover:bg-lime-300 hover:shadow-md hover:scale-[1.02]
                         transition-all"
            >
              <Link href="#footer" onClick={(e) => handleSmoothScroll("#footer", e)}>Chat With Us</Link>
            </Button>
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-gray-700 bg-gray-900/80 text-gray-200 hover:bg-gray-800"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="liquid-glass border-gray-800 p-0 w-64 flex flex-col"
              >
                {/* Brand Header */}
                <Link href="/" className="flex items-center gap-1.5 px-4 py-4 border-b border-gray-800" onClick={(e) => handleSmoothScroll("/", e)}>
                  <Image
                    src="/icons/WhiteBoard-productions-logo-bnw.svg"
                    alt="WhiteBoard Productions logo"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                  <span className="font-semibold tracking-wide text-white text-lg">WhiteBoard</span>
                </Link>

                {/* Nav Links */}
                <nav className="flex flex-col gap-1 mt-2 text-gray-200">
                  {links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-900 hover:text-purple-300 transition-colors"
                      onClick={(e) => handleSmoothScroll(l.href, e)}
                    >
                      <span className="inline-flex items-center justify-center w-5 h-5 text-gray-400">
                        <l.icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm">{l.label}</span>
                    </Link>
                  ))}
                </nav>

                {/* CTA Button at Bottom */}
                <div className="mt-auto border-t border-gray-800 p-4">
                  <Button
                    asChild
                    className="w-full bg-lime-400 text-black font-medium rounded-lg px-6 py-2.5
                               hover:bg-lime-300 hover:shadow-md hover:scale-[1.02]
                               transition-all"
                  >
                    <Link href="https://wa.link/65mf3i">Get a Quote</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
