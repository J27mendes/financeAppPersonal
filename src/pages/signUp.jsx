import { Link, Navigate } from "react-router"

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
import { useAuthContext } from "@/context/auth"
import { useSignupForm } from "@/forms/hooks/user"

const SignUpPage = () => {
  const { user, signup, initializing } = useAuthContext()

  const { signupMethods } = useSignupForm()

  const handleFormSubmit = (data) => signup(data)

  if (initializing) return null

  if (user) {
    return <Navigate to={"/"} />
  }
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Form {...signupMethods}>
        <form onSubmit={signupMethods.handleSubmit(handleFormSubmit)}>
          <Card className="w-[500px]">
            <CardHeader>
              <CardTitle>Crie a sua conta</CardTitle>
              <CardDescription>Insira os seus dados abaixo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={signupMethods.control}
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
                control={signupMethods.control}
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
                control={signupMethods.control}
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
                control={signupMethods.control}
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
                control={signupMethods.control}
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
                control={signupMethods.control}
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
                        signupMethods.formState.errors.terms
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      {" "}
                      Ao clicar em &quot;Criar conta&quot;, você aceita
                      <a
                        href="#"
                        className={`underline transition-colors ${
                          signupMethods.formState.errors.terms
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
