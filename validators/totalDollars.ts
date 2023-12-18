type props = {
  dolarInput: number
  stateTax: number
  dolarValue: number
  type: 'cash' | 'card'
}

export const getTotalDollars = (data: props) => {
  const iofCash = 0.011
  const iofCard = 0.064

  let response: number

  switch (data.type) {
    case 'cash':
      response =
        data.dolarInput +
        data.dolarInput * data.stateTax * data.dolarValue +
        data.dolarValue * iofCash
      return response
      break
    case 'card':
      response =
        data.dolarInput +
        data.dolarInput * data.stateTax +
        data.dolarInput * iofCard * data.dolarValue
      return response
      break
    default:
      response = 0
  }
  return parseFloat(response.toFixed(2))
}
