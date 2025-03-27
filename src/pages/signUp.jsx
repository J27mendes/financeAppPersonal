import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router"
import { toast } from "sonner"
import { z } from "zod"

import PasswordInput from "@/components/passwordInput"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { api } from "@/lib/axios"

const signupSchema = z
  .object({
    firstName: z.string().trim().min(1, {
      message: "O nome é obrigatório",
    }),
    lastName: z.string().trim().min(1, {
      message: "O sobrenome é obrigatório",
    }),
    email: z
      .string()
      .email({
        message: "O email é inválido",
      })
      .trim()
      .nonempty({ message: "O email é obrigatório" }),
    password: z.string().trim().min(6, {
      message: "A senha deve ter no mínimo 6 caracteres",
    }),
    passwordConfirmation: z.string().trim().min(6, {
      message: "A confirmação de senha é obrigatória",
    }),
    terms: z.boolean().refine((value) => value === true, {
      message: "Você precisa aceitar os termos",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não coincidem",
    path: ["passwordConfirmation"], // Isso fará o erro ser atribuído ao campo de passwordConfirmation
  })

const SignUpPage = () => {
  const [user, setUser] = useState(null)
  const signupMutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (variables) => {
      const response = await api.post("/users/", {
        first_name: variables.firstName,
        last_name: variables.lastName,
        email: variables.email,
        password: variables.password,
      })
      return response.data
    },
  })
  const methods = useForm({
    resolver: zodResolver(signupSchema),
    defaultvalues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      terms: false,
    },
  })
  const handleFormSubmit = (data) => {
    signupMutation.mutate(data, {
      onSuccess: (createdUser) => {
        const accessToken = createdUser.tokens.accessToken
        const refreshToken = createdUser.tokens.refreshToken
        setUser(createdUser)
        localStorage.setItem("accessToken", accessToken)
        localStorage.setItem("refreshToken", refreshToken)
        toast.success("Conta criada com sucesso!")
      },
      onError: () => {
        toast.error(
          "Erro ao criar a conta, por favor tente novamente mais tarte!"
        )
      },
    })
  }
  if (user) {
    return (
      <h1 className="text-2xl text-primary-green">{`Olá, ${user.first_name}`}</h1>
    )
  }
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
          <Card className="w-[500px]">
            <CardHeader>
              <CardTitle>Crie a sua conta</CardTitle>
              <CardDescription>Insira os seus dados abaixo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={methods.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite seu nome"
                        {...field}
                        autoComplete="Primeiro nome"
                        name="firstName"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sobrenome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite seu sobrenome"
                        {...field}
                        autoComplete="Primeiro nome"
                        name="latName"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite seu e-mail"
                        {...field}
                        autoComplete="Meu email"
                        name="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} name="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmação de senha</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Confirme sua senha."
                        {...field}
                        name="passwordConfirmation"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="items-top flex space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        id="terms"
                        name="terms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      ></Checkbox>
                    </FormControl>
                    <label
                      htmlFor="terms"
                      className={`text-sm text-muted-foreground opacity-75 ${
                        methods.formState.errors.terms ? "text-red-500" : ""
                      }`}
                    >
                      {" "}
                      Ao clicar em &quot;Criar conta&quot;, você aceita
                      <a
                        href="#"
                        className={`underline transition-colors ${
                          methods.formState.errors.terms
                            ? "text-red-500"
                            : "text-white"
                        }`}
                      >
                        {" "}
                        nosso termo de uso e política de privacidade
                      </a>
                    </label>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Criar conta</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Já possui uma conta?</p>
        <Button variant="link" asChild>
          <Link to="/login">Faça login</Link>
        </Button>
      </div>
    </div>
  )
}

export default SignUpPage
