import { currencyType } from '@/types/currencyType'
import axios from 'axios'

const req = axios.create({
  baseURL: 'https://economia.awesomeapi.com.br/last',
})

export const getCurrency = async (): Promise<currencyType> => {
  const response = await req.get('/USD')
  return response.data
}
