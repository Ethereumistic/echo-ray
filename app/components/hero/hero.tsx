'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useTextMorph } from './useTextMorph'
import { ProductCard } from './ProductCard'
import { Globe, FileText, Building2, ShoppingCart, BarChart2, PieChart, FileStack } from 'lucide-react'

const products = [
  {
    name: "Landing Pages",
    type: "Web Development",
    features: ["Conversion Optimized", "Responsive Design", "A/B Testing"],
    icon: Globe
  },
  {
    name: "Blog Websites",
    type: "Content Management",
    features: ["SEO Friendly", "Custom Themes", "Multi-author Support"],
    icon: FileText
  },
  {
    name: "Company Websites",
    type: "Corporate Web Solutions",
    features: ["Brand Consistency", "Integrated CMS", "Performance Optimized"],
    icon: Building2
  },
  {
    name: "E-commerce Platforms",
    type: "Online Retail Solutions",
    features: ["Secure Payments", "Inventory Management", "Mobile Commerce"],
    icon: ShoppingCart
  },
  {
    name: "Business Intelligence",
    type: "Data Analytics",
    features: ["Real-time Dashboards", "Data Visualization", "Predictive Analytics"],
    icon: BarChart2
  },
  {
    name: "Analytics Systems",
    type: "Performance Tracking",
    features: ["User Behavior Tracking", "Conversion Funnels", "Custom Reports"],
    icon: PieChart
  },
  {
    name: "Document Management",
    type: "Enterprise Solutions",
    features: ["Version Control", "Collaborative Editing", "Secure Storage"],
    icon: FileStack
  }
]

export default function Hero() {
  const morphedTitle = useTextMorph("Elevating Digital Experiences", 1000)

  const [currentProductIndex, setCurrentProductIndex] = useState(-1)
  const [isInitialDelay, setIsInitialDelay] = useState(true)

  useEffect(() => {
    // Initial 1-second delay
    const initialTimer = setTimeout(() => {
      setCurrentProductIndex(0)
      setIsInitialDelay(false)
    }, 1500)

    // Set up the interval for changing products
    const interval = setInterval(() => {
      setCurrentProductIndex((prevIndex) => (prevIndex + 1) % products.length)
    }, 8300) // 8 seconds visibility + 0.3 seconds transition

    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
    }
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(circle at 20% 20%, #4a4a4a 0%, transparent 50%)',
              'radial-gradient(circle at 80% 80%, #4a4a4a 0%, transparent 50%)',
              'radial-gradient(circle at 20% 80%, #4a4a4a 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, #4a4a4a 0%, transparent 50%)',
              'radial-gradient(circle at 20% 20%, #4a4a4a 0%, transparent 50%)',
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: 'linear',
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col z-10 text-center px-4 sm:px-6 lg:px-8 items-center justify-center ">
      <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white font-mono"
          aria-label="Elevating Digital Experiences"
          initial={{ y: 126 }} // Start 32 rem lower
          animate={{ y: 0 }} // Move to original position
          transition={{ delay: 1.3, duration: 0.3 }} // Delay of 1 second, duration of 0.5 seconds
        >
          {morphedTitle}
        </motion.h1>

        
        <div className="  mx-auto h-64 m-12">
        <AnimatePresence mode="wait">
            {!isInitialDelay && (
              <ProductCard key={currentProductIndex} product={products[currentProductIndex]} />
            )}
          </AnimatePresence>
        </div>

        <motion.div
                      initial={{ y: -126 }} // Start 32 rem higher
                      animate={{ y: 0 }} // Move to original position
                      transition={{ delay: 1.3, duration: 0.3 }}
                      >

        <motion.p 
          className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          EchoRay transforms your digital vision into reality. From stunning websites to powerful dashboards, we craft tailored solutions that resonate with your audience and drive success.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="space-x-4"
        >
          <Link 
            href="/contact" 
            className="inline-block bg-[#98E024] text-black font-bold py-3 px-8 rounded-md text-lg transition duration-300 ease-in-out hover:bg-[#87C920] hover:scale-105 transform"
          >
            Get Started
          </Link>
          <Link 
            href="/services" 
            className="inline-block border border-gray-600 text-white font-bold py-3 px-8 rounded-md text-lg transition duration-300 ease-in-out hover:bg-white/5 hover:scale-105 transform"
          >
            Our Services
          </Link>
        </motion.div>


        </motion.div>
      </div>
    </section>
  )
}