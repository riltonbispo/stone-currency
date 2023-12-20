import { getCurrency } from '@/services/api'
import { useFormStore } from '@/store/formStore'
import { formType } from '@/types/formType'
import { useQuery } from '@tanstack/react-query'

export const useConvert = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['dolarInfo'],
    queryFn: getCurrency,
  })

  const formStore = useFormStore()

  const handleConvert = async (values: formType) => {
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

  return { handleConvert, data, isLoading }
}
