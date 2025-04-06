import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  Loader2Icon,
  PiggyBankIcon,
  PlusIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { NumericFormat } from "react-number-format"
import { toast } from "sonner"
import { z } from "zod"

import { useAuthContext } from "@/context/auth"
import { TransactionService } from "@/services/transaction"

import { Button } from "./ui/button"
import { DatePicker } from "./ui/datePicker"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  amount: z.number({
    required_error: "O valor é obrigatório.",
  }),
  date: z.date({ required_error: "A data é obrigatória." }),
  type: z.enum(["EARNING", "EXPENSE", "INVESTMENT"]),
})

const AddTransactionButton = () => {
  const queryClient = useQueryClient()
  const { user } = useAuthContext()
  const { mutateAsync: createTransaction } = useMutation({
    mutationKey: ["createTransaction"],
    mutationFn: (input) => TransactionService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["balance", user.id],
      })
    },
  })
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: 0,
      date: new Date(),
      type: "EARNING",
    },
    shouldUnregister: true,
  })
  const onSubmit = async (data) => {
    try {
      await createTransaction(data)
      setDialogIsOpen(false)
      toast.success("Transação criada com sucesso!")
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
        <DialogTrigger asChild>
          <Button>
            <PlusIcon />
            Nova Transação
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Transação</DialogTitle>
            <DialogDescription>Insira as informações abaixo</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Nome</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        autoComplete="Transação a ser definida"
                        {...field}
                        placeholder="Digite o nome da transação."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor</FormLabel>
                    <FormControl>
                      <NumericFormat
                        placeholder="Digite o valor da transação."
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="R$ "
                        allowNegative={false}
                        customInput={Input}
                        value={field.value}
                        onChange={() => {}}
                        onValueChange={(values) =>
                          field.onChange(values.floatValue)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="date">Data</FormLabel>
                    <FormControl>
                      <DatePicker
                        id="date"
                        {...field}
                        placeholder="Selecione a data da transação."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <fieldset>
                      <legend className="text-sm font-medium">Tipo</legend>
                      <FormControl>
                        <div className="grid grid-cols-3 gap-4">
                          <Button
                            type="button"
                            aria-pressed={field.value === "EARNING"}
                            variant={
                              field.value === "EARNING"
                                ? "secondary"
                                : "outline"
                            }
                            onClick={() => field.onChange("EARNING")}
                          >
                            <TrendingUpIcon className="text-primary-green" />
                            Receita
                          </Button>
                          <Button
                            type="button"
                            aria-pressed={field.value === "EXPENSE"}
                            variant={
                              field.value === "EXPENSE"
                                ? "secondary"
                                : "outline"
                            }
                            onClick={() => field.onChange("EXPENSE")}
                          >
                            <TrendingDownIcon className="text-primary-red" />
                            Despesa
                          </Button>
                          <Button
                            type="button"
                            aria-pressed={field.value === "INVESTMENT"}
                            variant={
                              field.value === "INVESTMENT"
                                ? "secondary"
                                : "outline"
                            }
                            onClick={() => field.onChange("INVESTMENT")}
                          >
                            <PiggyBankIcon className="text-primary-blue" />
                            Investimento
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </fieldset>
                  </FormItem>
                )}
              />
              <DialogFooter className="sm:space-x-4">
                <DialogClose asChild>
                  <Button
                    type="reset"
                    variant="secondary"
                    className="w-full"
                    disable={form.formState.isSubmitting}
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="w-full"
                  disable={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting && (
                    <Loader2Icon className="animate-spin" />
                  )}
                  Adicionar
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddTransactionButton
