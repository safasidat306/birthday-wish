
'use client';

// Import necessary dependencies
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { FaBirthdayCake, FaGift } from 'react-icons/fa'
import { GiBalloons } from 'react-icons/gi'
import { cn } from "../lib/utils";

type ConfettiProps = {
  width: number
  height: number
}

// Dynamically import Confetti component
const DynamicConfetti = dynamic(() => import('react-confetti'), { ssr: false })

const candleColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']
const balloonColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']
const confettiColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE']

const CustomCard: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => {
  return <div className={`your-default-styles ${className}`}>{children}</div>
}

export default function BirthdayWish() {
  
  const [candlesLit, setCandlesLit] = useState<number>(0) // Number of lit candles
  const [balloonsPoppedCount, setBalloonsPoppedCount] = useState<number>(0) // Number of popped balloons
  const [showConfetti, setShowConfetti] = useState<boolean>(false) // Whether to show confetti
  const [windowSize, setWindowSize] = useState<ConfettiProps>({ width: 0, height: 0 }) // Window size for confetti
  const [celebrating, setCelebrating] = useState<boolean>(false) // Whether celebration has started

  
  const totalCandles: number = 5 
  const totalBalloons: number = 5 

  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

 
  useEffect(() => {
    if (candlesLit === totalCandles && balloonsPoppedCount === totalBalloons) {
      setShowConfetti(true)
    }
  }, [candlesLit, balloonsPoppedCount])


  const lightCandle = (index: number) => {
    if (index === candlesLit) {
      setCandlesLit(prev => prev + 1)
    }
  }

 
  const popBalloon = (index: number) => {
    if (index === balloonsPoppedCount) {
      setBalloonsPoppedCount(prev => prev + 1)
    }
  }

  // Function to start celebration
  const celebrate = () => {
    setCelebrating(true)
    setShowConfetti(true)
    const interval = setInterval(() => {
      setCandlesLit(prev => {
        if (prev < totalCandles) return prev + 1
        clearInterval(interval)
        return prev
      })
    }, 500)
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* CustomCard wrapper for the birthday card */}
      <CustomCard className="w-full max-w-md mx-auto overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl border-2 border-black">
        {/* Card header with birthday message */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black">Advanced Happy Birthday!</h1>
          <p className="text-2xl font-semibold text-gray-600">Safa Sidat</p>
          <p className="text-lg text-gray-500">September 29th</p>
        </div>
        {/* Card content with candles and balloons */}
        <div className="space-y-6 text-center">
          {/* Candles section */}
          <div>
            <h3 className="text-lg font-semibold text-black mb-2">11 days left!</h3>
            <div className="flex justify-center space-x-2">
              {[...Array(totalCandles)].map((_, index) => (
                <AnimatePresence key={index}>
                  {(celebrating && index <= candlesLit) || (!celebrating && index < candlesLit) ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.5, delay: celebrating ? index * 0.5 : 0 }}
                    >
                      <FaBirthdayCake
                        className={`w-8 h-8 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110`}
                        style={{ color: candleColors[index % candleColors.length] }}
                        onClick={() => lightCandle(index)}
                      />
                    </motion.div>
                  ) : (
                    <FaBirthdayCake
                      className={`w-8 h-8 text-gray-300 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110`}
                      onClick={() => lightCandle(index)}
                    />
                  )}
                </AnimatePresence>
              ))}
            </div>
          </div>
          {/* Balloons section */}
          <div>
            <h3 className="text-lg font-semibold text-black mb-2">Pop the balloons:</h3>
            <div className="flex justify-center space-x-2">
              {[...Array(totalBalloons)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 1 }}
                  animate={{ scale: index < balloonsPoppedCount ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <GiBalloons
                    className={`w-8 h-8 cursor-pointer hover:scale-110`}
                    style={{ color: index < balloonsPoppedCount ? '#D1D5DB' : balloonColors[index % balloonColors.length] }}
                    onClick={() => popBalloon(index)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        {/* Card footer with celebrate button */}
        <div className="flex justify-center mt-4">
          <Button
            className="bg-black text-white hover:bg-gray-800 transition-all duration-300"
            onClick={celebrate}
            disabled={celebrating}
          >
           Pre-Birthday Celebrate! <FaGift className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CustomCard>
      {/* Confetti component */}
      {showConfetti && (
        <DynamicConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          colors={confettiColors}
        />
      )}
    </div>
  )
}
