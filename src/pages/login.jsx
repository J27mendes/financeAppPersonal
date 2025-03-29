import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
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

const loginSchema = z.object({
  emailLogin: z
    .string()
    .email({
      message: "O email é inválido",
    })
    .trim()
    .nonempty({ message: "O email é obrigatório" }),
  passwordLogin: z.string().trim().min(6, {
    message: "A senha deve ter no mínimo 6 caracteres",
  }),
})

const LoginPage = () => {
  const [loginUser, setLoginUser] = useState(null)
  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (variables) => {
      const response = await api.post("/users/auth", {
        email: variables.emailLogin,
        password: variables.passwordLogin,
      })
      return response.data
    },
  })
  const loginMethods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailLogin: "",
      passwordLogin: "",
    },
  })

  useEffect(() => {
    const loginInit = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken")
        const refreshToken = localStorage.getItem("refreshToken")

        if (!accessToken && !refreshToken) return
        const response = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        setLoginUser(response.data)
      } catch (error) {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        console.error(error)
      }
    }
    loginInit()
  }, [])
  const handleFormLoginSubmit = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (logedUser) => {
        const accessToken = logedUser.tokens.accessToken
        const refreshToken = logedUser.tokens.refreshToken
        setLoginUser(logedUser)
        localStorage.setItem("accessToken", accessToken)
        localStorage.setItem("refreshToken", refreshToken)
        toast.success("Conta logada com sucesso!")
      },
      onError: () => {
        toast.error(
          "Erro ao logar na conta, por favor tente novamente mais tarte!"
        )
      },
    })
  }
  if (loginUser) {
    return (
      <h1 className="text-4xl text-primary-green">{`Olá, ${loginUser.first_name}`}</h1>
    )
  }
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Form {...loginMethods}>
        <form onSubmit={loginMethods.handleSubmit(handleFormLoginSubmit)}>
          <Card className="w-[500px]">
            <CardHeader>
              <CardTitle>Entre na sua conta</CardTitle>
              <CardDescription>Insira seus dados abaixo</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={loginMethods.control}
                name="emailLogin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite seu e-mail"
                        {...field}
                        autoComplete="email@emal.com"
                        name="emailLogin"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginMethods.control}
                name="passwordLogin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} name="passwordLogin" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Fazer Login</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Ainda não possui uma conta?</p>
        <Button variant="link" asChild>
          <Link to="/signup">Criar conta</Link>
        </Button>
      </div>
    </div>
  )
}

export default LoginPage
