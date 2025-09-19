"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0]?.name || "")
  const [isMobile, setIsMobile] = useState(false)
  const [socialOpen, setSocialOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // Scrollspy: observe sections and update active tab
    const sectionItems = items.filter((i) => i.url?.startsWith("#"))
    const idToName: Record<string, string> = {}
    sectionItems.forEach((it) => {
      const id = it.url.replace("#", "")
      idToName[id] = it.name
    })

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -55% 0px',
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      // pick the entry with highest intersectionRatio that's intersecting
      const visible = entries.filter((e) => e.isIntersecting)
      if (visible.length > 0) {
        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const id = visible[0].target.id
        const name = idToName[id]
        if (name) setActiveTab(name)
      } else {
        // if none intersecting, try to find the one closest to top
        entries.sort((a, b) => b.boundingClientRect.top - a.boundingClientRect.top)
        const id = entries[0]?.target?.id
        const name = idToName[id]
        if (name) setActiveTab(name)
      }
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    Object.keys(idToName).forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      window.removeEventListener("resize", handleResize)
      observer.disconnect()
    }
  }, [items])

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6 pointer-events-none",
        className,
      )}
    >
      <div className="pointer-events-auto w-max mx-auto flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {/* AJ logo */}
        <div className="flex items-center gap-2 px-2">
          <div className="rounded-full w-8 h-8 bg-gradient-to-tr from-blue-400 to-emerald-400 flex items-center justify-center font-bold text-white">AJ</div>
        </div>

        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          const handleClick = (e: React.MouseEvent) => {
            if (item.url?.startsWith("#")) {
              e.preventDefault()
              const id = item.url.replace("#", "")
              const el = document.getElementById(id)
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            setActiveTab(item.name)
          }

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={handleClick}
              aria-label={item.name}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-foreground/80 hover:text-primary",
                isActive && "bg-muted text-primary",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>

              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10 pointer-events-none"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}

        {/* Socials dropdown */}
        <div className="relative">
          <button
            onClick={() => setSocialOpen((s) => !s)}
            aria-label="Socials"
            className="text-foreground/80 hover:text-primary px-3 py-2 rounded-md bg-slate-800/30"
          >
            Socials
          </button>

          {socialOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-background/80 border border-border rounded-md shadow-lg py-2 z-50">
              <a href="https://github.com/akshayjayesh" target="_blank" rel="noreferrer" className="block px-4 py-2 text-sm hover:bg-slate-700">GitHub</a>
              <a href="https://www.linkedin.com/in/akshay-jayesh/" target="_blank" rel="noreferrer" className="block px-4 py-2 text-sm hover:bg-slate-700">LinkedIn</a>
              <a href="https://instagram.com/dummy" target="_blank" rel="noreferrer" className="block px-4 py-2 text-sm hover:bg-slate-700">Instagram</a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
