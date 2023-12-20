import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { useFormStore } from '@/store/formStore'
import { useCurrencyData } from '@/utils/queries'

const Result = () => {
  const { data } = useCurrencyData()

  const [setResultDolar, resultDolar, type, rate] = useFormStore((state) => [
    state.setResultDolar,
    state.resultDolar,
    state.type,
    state.rate,
  ])

  return (
    <>
      <Button
        type="button"
        className="mb-6"
        variant={'outline'}
        onClick={() => {
          setResultDolar('')
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
            Compra no {type === 'card' ? 'cartão' : 'dinheiro'} e taxa de
          </span>{' '}
          {rate || '0'}%
        </span>
        <span className="text-sm text-muted-foreground">
          <span className="font-medium">Cotação do dolar: </span>
          $1,00 = {data && parseFloat(data?.USDBRL.bid).toFixed(2)}
        </span>
      </div>
    </>
  )
}

export default Result
