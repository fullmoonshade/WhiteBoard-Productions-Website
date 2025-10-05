"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { usePathname } from "next/navigation"

interface TransitionContextType {
  isTransitioning: boolean
  triggerTransition: () => void
}

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  triggerTransition: () => {},
})

export function useTransition() {
  return useContext(TransitionContext)
}

interface TransitionProviderProps {
  children: ReactNode
}

export function TransitionProvider({ children }: TransitionProviderProps) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const pathname = usePathname()

  const triggerTransition = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)
  }

  // Auto-trigger transition on pathname change
  useEffect(() => {
    triggerTransition()
  }, [pathname])

  return (
    <TransitionContext.Provider value={{ isTransitioning, triggerTransition }}>
      {children}
    </TransitionContext.Provider>
  )
}
