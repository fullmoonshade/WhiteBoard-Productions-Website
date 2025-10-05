"use client"

import { ReactNode } from "react"
import { useTransition } from "./transition-provider"

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const { isTransitioning } = useTransition()

  return (
    <div
      className={`transition-opacity duration-300 ease-in-out ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      {children}
    </div>
  )
}
