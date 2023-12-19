import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { useConvert } from '@/hooks/useConvert'

type Props = {
  resultDolar: string
  type: 'cash' | 'card'
  rate: string
  setShowResult: (e: boolean) => void
}

const Result = ({ ...props }: Props) => {
  const { data } = useConvert()

  return (
    <>
      <Button
        type="button"
        className="mb-6"
        variant={'outline'}
        onClick={() => {
          props.setShowResult(false)
        }}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>
      <div className="flex flex-col gap-1">
        <p className="font-medium">Você precisará de:</p>
        <span className="font-semibold text-6xl text-emerald-500 mb-4">
          R$ {props.resultDolar}
        </span>
        <span className="text-sm text-muted-foreground">
          <span className="font-medium">
            Compra no {props.type === 'cash' ? 'dinheiro' : 'cartão'} e taxa de
          </span>{' '}
          {props.rate ? props.rate : '0'}%
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
