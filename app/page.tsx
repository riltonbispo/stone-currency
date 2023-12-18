'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { ArrowRightLeft, ArrowLeft, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
  FormDescription,
} from '@/components/ui/form'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { convertDolarSchema } from '@/validators/auth'
import { formType } from '@/types/formType'
import { AnimatePresence, motion } from 'framer-motion'
import { getCurrency } from '@/services/api'
import Header from '@/components/header'
import { useQuery } from '@tanstack/react-query'

const Home = () => {
  const [showResult, setShowResult] = useState(false)
  const [resultDolar, setResultDolar] = useState('')
  const { data, isLoading } = useQuery({
    queryKey: ['resultDolar'],
    queryFn: getCurrency,
  })

  const form = useForm<formType>({
    resolver: zodResolver(convertDolarSchema),
    defaultValues: {
      dolar: '',
      rate: '',
      type: 'cash',
    },
  })

  const handleConvert = async (values: formType) => {
    const dolarInput = parseFloat(values.dolar)
    const stateTax = parseFloat(values.rate || '0')
    const iofCash = 0.011
    const iofCard = 0.064

    if (data) {
      const dolarValue = parseFloat(data?.bid)
      if (values.type === 'cash') {
        setResultDolar(
          (
            (dolarInput + dolarInput * stateTax) *
            (dolarValue + dolarValue * iofCash)
          ).toFixed(2),
        )
      } else {
        setResultDolar(
          (
            (dolarInput + dolarInput * stateTax + dolarInput * iofCard) *
            dolarValue
          ).toFixed(2),
        )
      }

      const result = await form.trigger(['dolar', 'rate', 'type'])
      result && setShowResult(true)
    }
  }

  return (
    <div className="w-5/6 mx-auto max-w-4xl my-32 overflow-hidden px-4">
      <Header />

      <AnimatePresence>
        {!showResult ? (
          <motion.div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleConvert)}
                className="space-y-8"
              >
                <div className="flex gap-6">
                  <FormField
                    control={form.control}
                    name="dolar"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dolar</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="$00,00"
                            {...field}
                            type="number"
                          />
                        </FormControl>
                        <FormDescription>
                          Digite a quantidade de dolar que deseja.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Taxa do Estado</FormLabel>
                        <FormControl>
                          <Input placeholder="0%" {...field} type="number" />
                        </FormControl>
                        <FormDescription>
                          Digite se o estado cobrar taxas.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Tipo de compra</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="cash" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Dinheiro
                            </FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="card" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Cartão
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {isLoading ? (
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button type="submit">
                    <ArrowRightLeft className="mr-2 h-4 w-4" />
                    Submit
                  </Button>
                )}
              </form>
            </Form>
          </motion.div>
        ) : (
          <motion.div>
            <Button
              type="button"
              className="mb-6"
              variant={'outline'}
              onClick={() => {
                setShowResult(false)
              }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
            <div className="flex flex-col gap-1">
              <p className="font-medium">Você precisará de:</p>
              <span className="font-semibold text-6xl text-emerald-500 mb-4">
                R$ {resultDolar}
              </span>
              <span className="text-sm text-muted-foreground">
                <span className="font-medium">
                  Compra no{' '}
                  {form.control._fields.type?._f.value === 'cash'
                    ? 'dinheiro'
                    : 'cartão'}{' '}
                  e taxa de
                </span>{' '}
                {form.control._fields.rate?._f.value | 0}%
              </span>
              <span className="text-sm text-muted-foreground">
                <span className="font-medium">Cotação do dolar:</span> $1,00 =
                R$ {parseFloat(data.bid).toFixed(2)}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Home
