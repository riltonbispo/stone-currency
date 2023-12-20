import { formType } from '@/types/formType'

export const Convert = (values: formType, bid: string) => {
  const dolarInput = parseFloat(values.dolar)
  const stateTax = parseFloat(values.rate || '0')
  const iofCash = 0.011
  const iofCard = 0.064

  const dolarValue = parseFloat(bid)
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

  return resultDolarValue
}
