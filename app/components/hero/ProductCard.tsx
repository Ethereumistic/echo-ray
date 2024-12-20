import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { useTextMorph } from './useTextMorph' // Import the hook

interface ProductInfo {
  name: string
  type: string
  features: string[]
  icon: LucideIcon
}

export function ProductCard({ product }: { product: ProductInfo }) {
    const [isVisible, setIsVisible] = useState(false);

    const morphedName = useTextMorph(product.name, 500, 0)
    const morphedType = useTextMorph(product.type, 500, 500)
    
    // Move the hooks to the component level
    const morphedFeatures = product.features.map((feature, index) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useTextMorph(feature, 200, 1000 + index * 300);
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true); // Set visibility to true after 1 second
        }, 1000);

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);  
    
  return (
    <motion.div
      className="relative bg-gray-900/40 text-white rounded-xl w-96 h-64 border border-[#98E024]/20 p-6 flex flex-col justify-between"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.3 }}
      style={{
        boxShadow: '0 0 20px rgba(152, 224, 36, 0.2), inset 0 0 20px rgba(152, 224, 36, 0.1)',
        backdropFilter: 'blur(10px)',
        opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease-in-out' 
      }}
    >
      {/* Animated border effect */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1 }}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(152, 224, 36, 0.2), transparent)',
        }}
      />

      <div className="flex justify-between items-start">
        
        <div>
        <h3 className="text-xl font-mono font-bold mb-1 text-[#98E024]">{morphedName}</h3> {/* Updated */}
        <p className="text-lg text-gray-400 font-mono">{morphedType}</p> {/* Updated */}
        </div>
        <motion.div
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0, duration: 0.5 }}
          >
        <product.icon className="w-14 h-14 text-[#98E024]" />
      </motion.div>
      </div>

      <div className="mt-4 space-y-1 h-24">
      {morphedFeatures.map((feature, index) => ( // Updated
                    <p key={index} className="text-base font-mono text-start mx-auto">
                        {feature ? `> ${feature}` : ' '} {/* Only display '>' when feature starts animating */}
                    </p>
                ))}
      </div>
    </motion.div>
  )
}

const pulseKeyframes = `
  @keyframes pulse {
    0%, 100% {
      box-shadow: 0 0 20px rgba(152, 224, 36, 0.2), inset 0 0 20px rgba(152, 224, 36, 0.1);
    }
    50% {
      box-shadow: 0 0 30px rgba(152, 224, 36, 0.4), inset 0 0 30px rgba(152, 224, 36, 0.2);
    }
  }
`;