import * as z from 'zod'

export const convertDolarSchema = z.object({
  dolar: z.string().min(1, { message: 'Digite pelo menos 1 dolar' }),
  rate: z.string().optional(),
  type: z.enum(['cash', 'card'], {
    required_error: 'Voce precisa selecionar uma tipo de pagamento',
  }),
})
