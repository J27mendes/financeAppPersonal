import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, Navigate } from "react-router"
import { z } from "zod"

import PasswordInput from "@/components/PasswordInput"
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
import { useAuthContext } from "@/context/auth"

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
  const { user, login, initializing } = useAuthContext()

  const loginMethods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailLogin: "",
      passwordLogin: "",
    },
  })

  const handleFormLoginSubmit = (data) => login(data)

  if (initializing) return null

  if (user) {
    return <Navigate to={"/"} />
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
