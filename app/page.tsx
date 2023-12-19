'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Header from '@/components/header'
import Form from '@/components/form'
import Result from '@/components/result'
import { formType } from '@/types/formType'

const Home = () => {
  const [showResult, setShowResult] = useState(false)
  const [resultDolar, setResultDolar] = useState('')
  const [rate, setRate] = useState('')
  const [type, setType] = useState<formType['type']>('cash')

  return (
    <div className="w-5/6 mx-auto max-w-4xl my-32 overflow-hidden px-4">
      <Header />

      <AnimatePresence>
        {!showResult ? (
          <motion.div>
            <Form
              setShowResult={setShowResult}
              setResultDolar={setResultDolar}
              setRate={setRate}
              setType={setType}
            />
          </motion.div>
        ) : (
          <motion.div>
            <Result
              resultDolar={resultDolar}
              setShowResult={setShowResult}
              rate={rate}
              type={type}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Home
