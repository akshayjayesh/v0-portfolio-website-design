"use client"

import React, { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"

type MorphingPopoverProps = {
  children: React.ReactNode
  content: React.ReactNode
  layoutId?: string
  className?: string
  triggerClassName?: string
  openOnHover?: boolean
}

export function MorphingPopover({
  children,
  content,
  layoutId,
  className,
  triggerClassName,
  openOnHover = false,
}: MorphingPopoverProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const handleToggle = () => setOpen((v) => !v)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div className={className}>
      <div
        ref={triggerRef}
        className={triggerClassName}
        onClick={handleToggle}
        onMouseEnter={openOnHover ? handleOpen : undefined}
        onMouseLeave={openOnHover ? handleClose : undefined}
        role="button"
        tabIndex={0}
        aria-expanded={open}
      >
        {children}
      </div>

      {typeof window !== "undefined" && createPortal(
        <AnimatePresence>
          {open && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" aria-hidden={!open}>
              <motion.div
                layoutId={layoutId}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full max-w-md bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
                role="dialog"
                aria-modal="true"
              >
                <div className="p-4">
                  <div className="flex justify-end">
                    <button
                      onClick={handleClose}
                      aria-label="Close"
                      className="text-slate-300 hover:text-white p-1 rounded"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mt-2">
                    {content}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                onClick={handleClose}
              />
            </div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  )
}

export function MorphingPopoverContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.div>
  )
}
