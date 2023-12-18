import { convertDolarSchema } from '@/validators/auth'
import { z } from 'zod'

export type formType = z.infer<typeof convertDolarSchema>
