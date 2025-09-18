"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const accordionItems = [
  {
    id: 1,
    title: "Voice Assistant",
    imageUrl:
      "https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "AI Image Generation",
    imageUrl:
      "https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "AI Chatbot + Local RAG",
    imageUrl:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "AI Agent",
    imageUrl:
      "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2090&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Visual Understanding",
    imageUrl:
      "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=2070&auto=format&fit=crop",
  },
]

type Item = (typeof accordionItems)[number]

type AccordionItemProps = {
  item: Item
  isActive: boolean
  onMouseEnter: () => void
  onClick?: () => void
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, isActive, onMouseEnter, onClick }) => {
  return (
    <motion.div
      layout
      initial={false}
      animate={{ width: isActive ? 400 : 60 }}
      transition={{ type: "spring", stiffness: 200, damping: 24 }}
      className={`relative h-[450px] rounded-2xl overflow-hidden cursor-pointer`}
      onMouseEnter={onMouseEnter}
      onFocus={onMouseEnter}
      role="button"
      tabIndex={0}
      aria-label={item.title}
    >
      <motion.img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1 }}
        animate={{ scale: isActive ? 1.03 : 1 }}
        transition={{ duration: 0.6 }}
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement
          target.onerror = null
          target.src = "https://placehold.co/400x450/2d3748/ffffff?text=Image+Error"
        }}
      />

      <div className="absolute inset-0 bg-black bg-opacity-40" />

      <motion.span
        className="absolute text-white text-lg font-semibold whitespace-nowrap"
        initial={false}
        animate={isActive ? { bottom: 24, rotate: 0, x: '-50%' } : { bottom: 96, rotate: 90, x: '-50%' }}
        transition={{ duration: 0.35 }}
        style={{ left: "50%", transform: "translateX(-50%)" }}
      >
        {item.title}
      </motion.span>
    </motion.div>
  )
}

export const LandingAccordionItem: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(4)

  const handleItemHover = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <div className="bg-transparent font-sans">
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tighter">Showcase</h2>
            <p className="mt-6 text-lg text-slate-300 max-w-xl mx-auto md:mx-0">
              A selection of personal photos and project snapshots. Hover or tap each item to preview.
            </p>
            <div className="mt-8">
              <a
                href="#contact"
                className="inline-block bg-blue-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Get in touch
              </a>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="flex flex-row items-center justify-center gap-4 overflow-x-auto p-4">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => handleItemHover(index)}
                  onClick={() => handleItemHover(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingAccordionItem
