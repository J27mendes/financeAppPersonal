import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { loginSchema, signupSchema } from "../schemas/user"

export const useLoginForm = () => {
  const loginMethods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailLogin: "",
      passwordLogin: "",
    },
  })
  return { loginMethods }
}

export const useSignupForm = () => {
  const signupMethods = useForm({
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
  return { signupMethods }
}
