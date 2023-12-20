'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Header from '@/components/header'
import Form from '@/components/form'
import Result from '@/components/result'

const Home = () => {
  const [showResult, setShowResult] = useState(false)

  return (
    <div className="w-5/6 mx-auto max-w-4xl my-32 overflow-hidden px-4">
      <Header />

      <AnimatePresence>
        {!showResult ? (
          <motion.div>
            <Form setShowResult={setShowResult} />
          </motion.div>
        ) : (
          <motion.div>
            <Result setShowResult={setShowResult} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Home
