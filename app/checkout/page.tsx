"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, ArrowRight, ChevronLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Checkout — WhiteBoard Productions | Order Your Podcast & Video Package",
  description: "Complete your order for WhiteBoard Productions' podcast editing and video production services. Choose your package and get started with professional content creation.",
  robots: {
    index: false,
    follow: true,
  },
}

interface OrderState {
  package: {
    name: string
    price: string
    priceValue: number
    includesPodcastProduction: boolean
  } | null
  hasPodcastContent: boolean | null
  podcastAddOn: {
    name: string
    price: number
    complexity: string
  } | null
  needsVideoVariations: boolean | null
  videoPackage: {
    name: string
    price: number
    quantity: number
  } | null
}

const PRICE_VALUES = {
  startup: { inr: 25000, usd: 299 },
  pro: { inr: 55000, usd: 699 },
  premium: { inr: 170500, usd: 2049 },
}

const PRICES = {
  startup: { inr: "₹25,000/-", usd: "$299" },
  pro: { inr: "₹55,000/-", usd: "$699" },
  premium: { inr: "₹1,70,500/-", usd: "$2,049" },
}

type Currency = "INR" | "USD"

function guessLocalCurrency(): Currency {
  const lang = typeof navigator !== "undefined" ? navigator.language : ""
  const tz = typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : ""
  if (/-(IN|PK|BD)\b/i.test(lang) || /(Kolkata|Karachi|Dhaka)/i.test(tz || "")) return "INR"
  return "USD"
}

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(1)
  const [isInitialized, setIsInitialized] = useState(false)
  const [totalSteps, setTotalSteps] = useState(4)
  const [currency, setCurrency] = useState<Currency>("USD")
  const [order, setOrder] = useState<OrderState>({
    package: null,
    hasPodcastContent: null,
    podcastAddOn: null,
    needsVideoVariations: null,
    videoPackage: null,
  })

  // Add state for order configuration
  const [orderConfig, setOrderConfig] = useState({
    whatsappNumber: "+918384092211",
    podcastOptions: {
      basic: { price_usd: 35, price_inr: 3000, description: "Basic audio cleanup & enhancement" },
      standard: { price_usd: 60, price_inr: 5000, description: "Professional mastering & editing" },
      premium: { price_usd: 120, price_inr: 10000, description: "Full production & distribution" },
    },
    videoOptions: {
      basic: { price_usd: 25, price_inr: 2000, quantity: 3 },
      standard: { price_usd: 35, price_inr: 3000, quantity: 5 },
      premium: { price_usd: 60, price_inr: 5000, quantity: 10 },
    },
  })

  // Load configuration
  useEffect(() => {
    const savedContent = localStorage.getItem("whiteboard-content")
    if (savedContent) {
      const content = JSON.parse(savedContent)
      if (content.orderForm) {
        setOrderConfig(content.orderForm)
      }
    }
  }, [])

  // Load currency from geo API
  useEffect(() => {
    let cancelled = false
    async function loadCurrency() {
      try {
        const res = await fetch("/api/geo", { cache: "no-store" })
        if (!res.ok) throw new Error("geo failed")
        const data = await res.json()
        if (!cancelled) setCurrency(data?.currency === "INR" ? "INR" : "USD")
      } catch {
        if (!cancelled) setCurrency(guessLocalCurrency())
      }
    }
    loadCurrency()
    return () => {
      cancelled = true
    }
  }, [])

  // Initialize order from URL params only once
  useEffect(() => {
    if (isInitialized || currency === null) return

    const plan = searchParams.get("plan")
    if (plan && ["startup", "pro", "premium"].includes(plan.toLowerCase())) {
      const planKey = plan.toLowerCase() as keyof typeof PRICES
      const planName = plan.charAt(0).toUpperCase() + plan.slice(1).toLowerCase()

      const packageData = {
        name: planName,
        price: currency === "INR" ? PRICES[planKey].inr : PRICES[planKey].usd,
        priceValue: currency === "INR" ? PRICE_VALUES[planKey].inr : PRICE_VALUES[planKey].usd,
        includesPodcastProduction: planKey === "premium" || planKey === "startup", // Both Premium and Startup include podcast production
      }

      setOrder({
        package: packageData,
        hasPodcastContent: null,
        podcastAddOn: null,
        needsVideoVariations: null,
        videoPackage: null,
      })

      // Calculate total steps based on package
      if (packageData.includesPodcastProduction) {
        setTotalSteps(3) // Skip podcast production question and selection for Startup and Premium
      } else {
        setTotalSteps(4) // Pro plan goes through all steps
      }

      setIsInitialized(true)
    } else {
      router.push("/")
    }
  }, [searchParams, router, isInitialized, currency])

  const calculateTotal = () => {
    let total = order.package?.priceValue || 0
    if (order.podcastAddOn) total += order.podcastAddOn.price
    if (order.videoPackage) total += order.videoPackage.price
    return total
  }

  const formatPrice = (price: number) => {
    if (currency === "INR") {
      return `₹${price.toLocaleString()}`
    } else {
      return `$${price.toLocaleString()}`
    }
  }

  const handleNext = () => {
    if (currentStep === 1) {
      // For Startup/Premium (includes podcast production), go straight to video variations
      if (order.package?.includesPodcastProduction) {
        setCurrentStep(2) // Go to video variations question
      } else {
        // For Pro plan, check if user has podcast content
        if (order.hasPodcastContent === false) {
          setCurrentStep(2) // Go to podcast production selection
        } else if (order.hasPodcastContent === true) {
          setCurrentStep(3) // Skip podcast production, go to video variations question
        }
      }
    } else if (currentStep === 2) {
      if (order.package?.includesPodcastProduction) {
        setCurrentStep(3) // Summary for Startup/Premium
      } else {
        setCurrentStep(3) // Go to video variations question for Pro
      }
    } else if (currentStep === 3) {
      setCurrentStep(4) // Summary
    }
  }

  const handleBack = () => {
    if (currentStep === 1) {
      router.push("/")
      return
    }

    if (currentStep === 2) {
      setCurrentStep(1) // Always go back to step 1
    } else if (currentStep === 3) {
      // If we're on video variations/summary step for plans with included podcast production, go back to step 1
      if (order.package?.includesPodcastProduction) {
        setCurrentStep(1)
      } else {
        // For Pro plan, check if we came from podcast production selection
        if (order.hasPodcastContent === false) {
          setCurrentStep(2) // Go back to podcast production selection
        } else {
          setCurrentStep(1) // Go back to podcast content question
        }
      }
    } else {
      setCurrentStep(currentStep - 1)
    }
  }

  const generateWhatsAppMessage = () => {
    let message = `Hi, I would like to order:\n\n`
    message += `📦 Package: ${order.package?.name} - ${order.package?.price}\n`

    if (order.podcastAddOn) {
      const podcastPrice = formatPrice(order.podcastAddOn.price)
      message += `🎙️ Podcast Production: ${order.podcastAddOn.name} - ${podcastPrice}\n`
    }

    if (order.videoPackage) {
      const videoPrice = formatPrice(order.videoPackage.price)
      message += `🎬 Video Variations: ${order.videoPackage.name} (${order.videoPackage.quantity} variations) - ${videoPrice}\n`
    }

    message += `\n💰 Total: ${formatPrice(calculateTotal())}\n\n`
    message += `Currency: ${currency}\n` // Debug line to verify currency
    message += `Please confirm the details and let me know the next steps.`

    return encodeURIComponent(message)
  }

  const previewWhatsAppMessage = () => {
    const message = generateWhatsAppMessage()
    const decodedMessage = decodeURIComponent(message)
    alert(`WhatsApp Message Preview:\n\n${decodedMessage}`)
  }

  // Update WhatsApp URL generation
  const handleConfirmOrder = () => {
    const whatsappMessage = generateWhatsAppMessage()
    const whatsappUrl = `https://wa.me/message/DUFCKWYTKH7KC1?text=${whatsappMessage}`
    window.open(whatsappUrl, "_blank")
    router.push("/")
  }

  const updateOrder = (updates: Partial<OrderState>) => {
    setOrder((prev) => ({ ...prev, ...updates }))
  }

  const getProgressPercentage = () => {
    return (currentStep / totalSteps) * 100
  }

  // Define types for different option structures
  type BaseOption = {
    id: string
    title: string
    emoji: string
    action: () => void
  }

  type OptionWithPrice = BaseOption & {
    price: string
    subtitle?: string
  }

  type OptionWithoutPrice = BaseOption & {
    price?: never
    subtitle?: never
  }

  type StepOption = OptionWithPrice | OptionWithoutPrice

  type StepContent = {
    title: string
    subtitle: string
    options?: StepOption[]
    isSummary?: boolean
  }

  const getStepContent = (): StepContent => {
    // Step 1: Podcast Content Question (only for Pro plan)
    if (currentStep === 1 && !order.package?.includesPodcastProduction) {
      return {
        title: "Do you have podcast content?",
        subtitle: "We need to know if you already have podcast audio or if we should help produce it for you.",
        options: [
          {
            id: "yes",
            title: "Yes, I have audio content",
            emoji: "✅",
            action: () => {
              updateOrder({ hasPodcastContent: true })
              setTimeout(handleNext, 300)
            },
          },
          {
            id: "no",
            title: "No, help me produce it",
            emoji: "🎙️",
            action: () => {
              updateOrder({ hasPodcastContent: false })
              setTimeout(handleNext, 300)
            },
          },
        ],
      }
    }

    // Step 2: Podcast Production Selection (only for Pro plan if user doesn't have content)
    if (currentStep === 2 && !order.package?.includesPodcastProduction && !order.hasPodcastContent) {
      return {
        title: "Choose podcast production level",
        subtitle: "Select the level that matches your podcast production needs.",
        options: [
          {
            name: "Basic",
            price_inr: orderConfig.podcastOptions.basic.price_inr,
            price_usd: orderConfig.podcastOptions.basic.price_usd,
            complexity: orderConfig.podcastOptions.basic.description,
            emoji: "🎙️",
          },
          {
            name: "Standard",
            price_inr: orderConfig.podcastOptions.standard.price_inr,
            price_usd: orderConfig.podcastOptions.standard.price_usd,
            complexity: orderConfig.podcastOptions.standard.description,
            emoji: "🎧",
          },
          {
            name: "Premium",
            price_inr: orderConfig.podcastOptions.premium.price_inr,
            price_usd: orderConfig.podcastOptions.premium.price_usd,
            complexity: orderConfig.podcastOptions.premium.description,
            emoji: "🎤",
          },
        ].map((option) => {
          const price = currency === "INR" ? option.price_inr : option.price_usd
          const priceDisplay = currency === "INR" ? `+₹${price.toLocaleString()}` : `+$${price}`

          return {
            id: option.name,
            title: option.name,
            price: priceDisplay,
            emoji: option.emoji,
            action: () => {
              updateOrder({
                podcastAddOn: {
                  name: option.name,
                  price: price,
                  complexity: option.complexity,
                },
              })
              setTimeout(handleNext, 300)
            },
          }
        }),
      }
    }

    // Step 1 for Startup/Premium OR Step 2/3 for Pro: Video Variations Question
    const isVideoStep =
      (currentStep === 1 && order.package?.includesPodcastProduction) || // Startup/Premium first step
      (currentStep === 2 && order.package?.includesPodcastProduction) || // This shouldn't happen but safety
      (currentStep === 3 && !order.package?.includesPodcastProduction) // Pro plan after podcast

    if (isVideoStep) {
      return {
        title: "Need video variations?",
        subtitle: "Multiple video formats optimized for different social media platforms.",
        options: [
          {
            id: "yes",
            title: "Yes, add video variations",
            emoji: "🎬",
            action: () => {
              updateOrder({ needsVideoVariations: true })
              setTimeout(handleNext, 300)
            },
          },
          {
            id: "no",
            title: "No, single video only",
            emoji: "📱",
            action: () => {
              updateOrder({ needsVideoVariations: false, videoPackage: null })
              setTimeout(handleNext, 300)
            },
          },
        ],
      }
    }

    // Video Package Selection
    if (order.needsVideoVariations && !order.videoPackage) {
      return {
        title: "Choose video package",
        subtitle: "Select the number of video variations you need for different platforms.",
        options: [
          {
            name: "Basic Pack",
            quantity: orderConfig.videoOptions.basic.quantity,
            price_inr: orderConfig.videoOptions.basic.price_inr,
            price_usd: orderConfig.videoOptions.basic.price_usd,
            emoji: "📱",
          },
          {
            name: "Standard Pack",
            quantity: orderConfig.videoOptions.standard.quantity,
            price_inr: orderConfig.videoOptions.standard.price_inr,
            price_usd: orderConfig.videoOptions.standard.price_usd,
            emoji: "📺",
          },
          {
            name: "Premium Pack",
            quantity: orderConfig.videoOptions.premium.quantity,
            price_inr: orderConfig.videoOptions.premium.price_inr,
            price_usd: orderConfig.videoOptions.premium.price_usd,
            emoji: "🎥",
          },
        ].map((option) => {
          const price = currency === "INR" ? option.price_inr : option.price_usd
          const priceDisplay = currency === "INR" ? `+₹${price.toLocaleString()}` : `+$${price}`

          return {
            id: option.name,
            title: option.name,
            subtitle: `${option.quantity} variations`,
            price: priceDisplay,
            emoji: option.emoji,
            action: () => {
              updateOrder({
                videoPackage: {
                  name: option.name,
                  price: price,
                  quantity: option.quantity,
                },
              })
              setTimeout(handleNext, 300)
            },
          }
        }),
      }
    }

    // Summary
    return {
      title: "Order summary",
      subtitle: "Review your selections before confirming.",
      isSummary: true,
    }
  }

  // Show loading state until initialized
  if (!isInitialized || !order.package) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#C6FF3A] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const stepContent = getStepContent()

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Cleaner Inline Header */}
      <div className="sticky top-0 z-50 liquid-glass-header border-b border-neutral-900">
        <div className="px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="p-2 hover:bg-neutral-800 rounded-full -ml-2 sm:p-2.5"
            >
              {currentStep === 1 ? (
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>
            {/* Inline Plan Name and Price */}
            <div className="flex items-center justify-between flex-1 mx-3 sm:mx-4">
              <div className="text-base font-semibold text-white sm:text-lg">{order.package.name} Plan</div>
              <div className="text-base font-bold text-[#C6FF3A] sm:text-lg">{formatPrice(calculateTotal())}</div>
            </div>
            <div className="w-8 sm:w-10" /> {/* Spacer for balance */}
          </div>

          {/* Refined Progress Bar */}
          <div className="h-0.5 bg-neutral-800 rounded-full overflow-hidden sm:h-1">
            <div
              className="h-full bg-[#C6FF3A] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content with Responsive Spacing */}
      <div className="px-4 py-8 pb-32 sm:px-6 sm:py-12 sm:pb-40">
        <div className="max-w-sm mx-auto sm:max-w-md">
          {stepContent.isSummary ? (
            // Summary View
            <div className="space-y-8 sm:space-y-10">
              <div className="text-center space-y-3 sm:space-y-4">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">{stepContent.title}</h2>
                <p className="text-neutral-400 text-base leading-relaxed sm:text-lg">{stepContent.subtitle}</p>
              </div>

              <Card className="border-neutral-800 liquid-glass rounded-xl sm:rounded-2xl">
                <CardContent className="p-5 space-y-4 sm:p-8 sm:space-y-6">
                  <div className="flex justify-between items-center py-3 border-b border-neutral-800 sm:py-4">
                    <div>
                      <h4 className="font-semibold text-white text-base sm:text-lg">{order.package.name} Plan</h4>
                      <p className="text-neutral-400 text-sm mt-0.5 sm:mt-1">Podcasting & Video Editing Package</p>
                    </div>
                    <span className="font-bold text-white text-base sm:text-lg">{order.package.price}</span>
                  </div>

                  {order.podcastAddOn && (
                    <div className="flex justify-between items-center py-3 border-b border-neutral-800 sm:py-4">
                      <div>
                        <h4 className="font-semibold text-white text-sm sm:text-base">
                          Podcast Production - {order.podcastAddOn.name}
                        </h4>
                        <p className="text-neutral-400 text-xs mt-0.5 sm:text-sm sm:mt-1">
                          {order.podcastAddOn.complexity}
                        </p>
                      </div>
                      <span className="font-bold text-white text-sm sm:text-base">
                        +{formatPrice(order.podcastAddOn.price)}
                      </span>
                    </div>
                  )}

                  {order.videoPackage && (
                    <div className="flex justify-between items-center py-3 border-b border-neutral-800 sm:py-4">
                      <div>
                        <h4 className="font-semibold text-white text-sm sm:text-base">{order.videoPackage.name}</h4>
                        <p className="text-neutral-400 text-xs mt-0.5 sm:text-sm sm:mt-1">
                          {order.videoPackage.quantity} video variations
                        </p>
                      </div>
                      <span className="font-bold text-white text-sm sm:text-base">
                        +{formatPrice(order.videoPackage.price)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center py-4 bg-[#C6FF3A]/10 rounded-xl px-4 mt-4 sm:py-6 sm:rounded-2xl sm:px-6 sm:mt-6">
                    <h4 className="text-lg font-bold text-white sm:text-xl">Total</h4>
                    <span className="text-2xl font-bold text-[#C6FF3A] sm:text-3xl">
                      {formatPrice(calculateTotal())}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            // Question View with Better Mobile UX
            <div className="space-y-8 sm:space-y-12">
              <div className="text-center space-y-4 sm:space-y-6">
                <h2 className="text-2xl font-bold text-white leading-tight sm:text-3xl">{stepContent.title}</h2>
                <p className="text-neutral-400 text-base leading-relaxed max-w-xs mx-auto sm:text-xl sm:max-w-sm">
                  {stepContent.subtitle}
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {stepContent.options?.map((option) => (
                  <Button
                    key={option.id}
                    onClick={option.action}
                    variant="outline"
                    className="w-full h-auto p-4 text-left liquid-glass hover:liquid-glass-enhanced transition-all duration-200 group rounded-2xl sm:p-6 bg-transparent"
                  >
                    <div className="flex items-center gap-4 w-full sm:gap-5">
                      <div className="text-2xl flex-shrink-0 sm:text-3xl">{option.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="font-semibold text-white text-base group-hover:text-[#C6FF3A] transition-colors sm:text-lg">
                            {option.title}
                          </div>
                          {'price' in option && option.price && (
                            <div className="text-[#C6FF3A] font-bold text-sm sm:text-base">{option.price}</div>
                          )}
                        </div>
                        {'subtitle' in option && option.subtitle && (
                          <div className="text-neutral-400 text-sm mt-1 sm:text-base">{option.subtitle}</div>
                        )}
                      </div>
                      <ArrowRight className="h-5 w-5 text-neutral-600 group-hover:text-[#C6FF3A] transition-colors flex-shrink-0 sm:h-6 sm:w-6 sm:ml-3" />
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Optimized Bottom CTA */}
      {stepContent.isSummary && (
        <div className="fixed bottom-0 left-0 right-0 liquid-glass-header border-t border-neutral-800 p-4 sm:p-8">
          <div className="max-w-sm mx-auto sm:max-w-md space-y-3">
            {/* Preview button for testing */}
            <Button
              onClick={previewWhatsAppMessage}
              variant="outline"
              className="w-full h-10 text-sm border-neutral-700 text-neutral-300 hover:bg-neutral-800 bg-transparent"
            >
              Preview Message
            </Button>

            <Button
              onClick={handleConfirmOrder}
              className="w-full h-12 text-base font-semibold bg-[#C6FF3A] text-black hover:bg-[#C6FF3A]/90 rounded-xl shadow-lg shadow-[#C6FF3A]/20 sm:h-16 sm:text-xl sm:rounded-2xl"
            >
              Send Order via WhatsApp
              <ArrowRight className="h-4 w-4 ml-2 sm:h-6 sm:w-6 sm:ml-3" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
