'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Header from '@/components/header'
import Form from '@/components/form'
import Result from '@/components/result'
import { useFormStore } from '@/store/formStore'

const Home = () => {
  const form = useFormStore()

  return (
    <div className="w-5/6 mx-auto max-w-4xl my-32 overflow-hidden px-4">
      <Header />

      <AnimatePresence>
        {form.resultDolar.length < 1 ? (
          <motion.div>
            <Form />
          </motion.div>
        ) : (
          <motion.div>
            <Result />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Home
