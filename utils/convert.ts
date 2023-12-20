import { useFormStore } from '@/store/formStore'
import { formType } from '@/types/formType'
import { useCurrencyData } from './queries'

export const Convert = (values: formType) => {
  const { data } = useCurrencyData()

  const formStore = useFormStore()

  const dolarInput = parseFloat(values.dolar)
  const stateTax = parseFloat(values.rate || '0')
  const iofCash = 0.011
  const iofCard = 0.064

  if (data) {
    const dolarValue = parseFloat(data.USDBRL.bid)
    let resultDolarValue = ''
    if (values.type === 'cash') {
      resultDolarValue = (
        (dolarInput + dolarInput * stateTax) *
        (dolarValue + dolarValue * iofCash)
      ).toFixed(2)
    } else {
      resultDolarValue = (
        (dolarInput + dolarInput * stateTax + dolarInput * iofCard) *
        dolarValue
      ).toFixed(2)
    }

    formStore.setResultDolar(resultDolarValue)
  }
}
