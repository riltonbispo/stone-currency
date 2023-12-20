import { getCurrency } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

export const useCurrencyData = () => {
  const query = useQuery({
    queryKey: ['dolarInfo'],
    queryFn: getCurrency,
  })

  return query
}
