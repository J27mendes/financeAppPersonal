import { useMutation } from "@tanstack/react-query"
import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "sonner"

import { api } from "@/lib/axios"

export const AuthContext = createContext({
  user: null,
  login: () => {},
  signup: () => {},
})

export const useAuthContext = () => useContext(AuthContext)

const STORAGE_TOKEN_ACCESS = "accessToken"
const STORAGE_TOKEN_REFRESH = "refreshToken"

const setTokens = (tokens) => {
  localStorage.setItem(STORAGE_TOKEN_ACCESS, tokens.accessToken)
  localStorage.setItem(STORAGE_TOKEN_REFRESH, tokens.refreshToken)
}

const removeTokens = () => {
  localStorage.removeItem(STORAGE_TOKEN_ACCESS)
  localStorage.removeItem(STORAGE_TOKEN_REFRESH)
}

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const signupMutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (variables) => {
      const response = await api.post("/users", {
        first_name: variables.firstName,
        last_name: variables.lastName,
        email: variables.email,
        password: variables.password,
      })
      return response.data
    },
  })

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

  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = localStorage.getItem(STORAGE_TOKEN_ACCESS)
        const refreshToken = localStorage.getItem(STORAGE_TOKEN_REFRESH)

        if (!accessToken && !refreshToken) return
        const response = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        setUser(response.data)
      } catch (error) {
        removeTokens()
        console.error(error)
      }
    }
    init()
  }, [])

  const signup = (data) => {
    signupMutation.mutate(data, {
      onSuccess: (createdUser) => {
        setUser(createdUser)
        setTokens(createdUser.tokens)
        toast.success("Conta criada com sucesso!")
      },
      onError: () => {
        toast.error(
          "Erro ao criar a conta, por favor tente novamente mais tarte!"
        )
      },
    })
  }

  const login = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (logedUser) => {
        setUser(logedUser)
        setTokens(logedUser.tokens)
        toast.success("Conta logada com sucesso!")
      },
      onError: () => {
        toast.error(
          "Erro ao logar na conta, por favor tente novamente mais tarte!"
        )
      },
    })
  }
  return (
    <AuthContext.Provider value={{ user: user, login: login, signup: signup }}>
      {children}
    </AuthContext.Provider>
  )
}
