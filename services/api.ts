import axios from 'axios'

export const getCurrency = async () => {
  try {
    const response = await axios.get(
      'https://economia.awesomeapi.com.br/last/USD',
    )
    return response.data.USDBRL
  } catch (error) {
    return error
  }
}
