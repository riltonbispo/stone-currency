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
import { Convert } from '@/utils/convert'
import { useFormStore } from '@/store/formStore'
import { useCurrencyData } from '@/utils/queries'

const Form = () => {
  const { form } = useForm()
  const { isLoading } = useCurrencyData()

  const formStore = useFormStore()

  const handleSubmit = (values: formType) => {
    formStore.setDolar(values.dolar)
    formStore.setType(values.type)
    values.rate && formStore.setRate(values.rate)

    Convert(values)
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
