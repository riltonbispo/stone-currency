import { formType } from '@/types/formType'
import { convertDolarSchema } from '@/validators/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm as useReactHookForm } from 'react-hook-form'

export const useForm = () => {
  const form = useReactHookForm<formType>({
    resolver: zodResolver(convertDolarSchema),
    defaultValues: {
      dolar: '',
      rate: '',
      type: 'cash',
    },
  })

  return { form }
}
