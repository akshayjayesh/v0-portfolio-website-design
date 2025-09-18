import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Akshay Jayesh - Java Full Stack Developer",
  description:
    "Java Full Stack Developer | AI & ML Enthusiast - Building scalable solutions with passion and precision",
  generator: "v0.app",
  keywords: "Java Developer, Full Stack Developer, Spring Boot, React, AI ML, Web Development",
  authors: [{ name: "Akshay Jayesh" }],
  openGraph: {
    title: "Akshay Jayesh - Java Full Stack Developer",
    description:
      "Java Full Stack Developer | AI & ML Enthusiast - Building scalable solutions with passion and precision",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`font-sans ${inter.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
