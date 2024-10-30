import { useState, useEffect } from 'react'

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]|;:,.<>?'

export function useTextMorph(finalText: string, duration: number = 200, delay: number = 0) {
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      let startTime: number
      let animationFrameId: number

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = timestamp - startTime

        if (progress < duration) {
          const currentIndex = Math.floor((progress / duration) * finalText.length)
          let result = finalText.slice(0, currentIndex)
          if (currentIndex < finalText.length) {
            result += characters[Math.floor(Math.random() * characters.length)]
          }
          setDisplayText(result)
          animationFrameId = requestAnimationFrame(animate)
        } else {
          setDisplayText(finalText)
        }
      }

      animationFrameId = requestAnimationFrame(animate)

      return () => cancelAnimationFrame(animationFrameId)
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [finalText, duration, delay])

  return displayText
}