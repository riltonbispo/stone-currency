import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Loader2, ArrowRightLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  Form as FormUI,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from '@/hooks/useForm'
import { formType } from '@/types/formType'
import { useConvert } from '@/hooks/useConvert'

type Props = {
  setShowResult: (e: boolean) => void
  setResultDolar: (e: string) => void
  setRate: (e: string) => void
  setType: (e: 'cash' | 'card') => void
}

const Form = ({ ...props }: Props) => {
  const { form } = useForm()
  const { isLoading, handleConvert } = useConvert()

  const handleSubmit = async (values: formType) => {
    const dolar = await handleConvert(values)
    if (dolar) {
      props.setShowResult(true)
      props.setResultDolar(dolar)
      props.setType(values.type)
      values.rate && props.setRate(values.rate)
    }
  }

  return (
    <FormUI {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="flex gap-6">
          <FormField
            control={form.control}
            name="dolar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dolar</FormLabel>
                <FormControl>
                  <Input placeholder="$00,00" {...field} type="number" />
                </FormControl>
                <FormDescription>
                  Digite a quantidade de dolar que deseja.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Taxa do Estado</FormLabel>
                <FormControl>
                  <Input placeholder="0%" {...field} type="number" />
                </FormControl>
                <FormDescription>
                  Digite se o estado cobrar taxas.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Tipo de compra</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="cash" />
                    </FormControl>
                    <FormLabel className="font-normal">Dinheiro</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="card" />
                    </FormControl>
                    <FormLabel className="font-normal">Cartão</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isLoading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Aguarde
          </Button>
        ) : (
          <Button type="submit">
            <ArrowRightLeft className="mr-2 h-4 w-4" />
            Converter
          </Button>
        )}
      </form>
    </FormUI>
  )
}

export default Form
