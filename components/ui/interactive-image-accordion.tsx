"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const accordionItems = [
  {
    id: 1,
    title: "Portrait 1",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2F9e5464ed21f1499c91aab477b8b54d6e%2F8f583b87e0a540378df1b2421a0dae56?format=webp&width=800",
    overlayUrl:
      "https://cdn.builder.io/api/v1/image/assets%2F9e5464ed21f1499c91aab477b8b54d6e%2Fc00e056d473f4e2bbb61c0727973a21f",
  },
  {
    id: 2,
    title: "Portrait 2",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2F9e5464ed21f1499c91aab477b8b54d6e%2F8bb15f2fc07940bf87c478e34f4231cd?format=webp&width=800",
    overlayUrl:
      "https://cdn.builder.io/api/v1/image/assets%2F9e5464ed21f1499c91aab477b8b54d6e%2F845660775c8a49198932901b5b229b7e",
  },
  {
    id: 3,
    title: "Portrait 3",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2F9e5464ed21f1499c91aab477b8b54d6e%2F04269a5f1dab4f1a8fefbc5c0f1a888d?format=webp&width=800",
    overlayUrl:
      "https://cdn.builder.io/api/v1/image/assets%2F9e5464ed21f1499c91aab477b8b54d6e%2Fb4bfe2759a644f9bae2ad62489c18fed",
  },
  {
    id: 4,
    title: "Portrait 4",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2F9e5464ed21f1499c91aab477b8b54d6e%2F61d0aa4d891a4163af149106019c2b15?format=webp&width=800",
    overlayUrl:
      "https://cdn.builder.io/api/v1/image/assets%2F9e5464ed21f1499c91aab477b8b54d6e%2F4eed7cf1bfc44a29b8f62232c535d2fd",
  },
  {
    id: 5,
    title: "Portrait 5",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2F9e5464ed21f1499c91aab477b8b54d6e%2F9e946894d7dd4843817ffdd28f7a6454?format=webp&width=800",
    overlayUrl:
      "https://cdn.builder.io/api/v1/image/assets%2F9e5464ed21f1499c91aab477b8b54d6e%2Fc665d96d549946a4b51a04b99593178e",
  },
  {
    id: 6,
    title: "Portrait 6",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2F9e5464ed21f1499c91aab477b8b54d6e%2F5f21d1f6672e4a2ca4f34f8c1efb4f55?format=webp&width=800",
    overlayUrl:
      "https://cdn.builder.io/api/v1/image/assets%2F9e5464ed21f1499c91aab477b8b54d6e%2F399137584f054d0095e680578d191155",
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
      onClick={onClick}
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

      <div className="absolute inset-0 bg-black bg-opacity-20" />

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
  const [activeIndex, setActiveIndex] = useState<number>(0)

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
