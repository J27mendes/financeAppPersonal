import { z } from "zod"

export const loginSchema = z.object({
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

export const signupSchema = z
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
    path: ["passwordConfirmation"],
  })
