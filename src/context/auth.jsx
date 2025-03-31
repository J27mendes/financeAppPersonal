import { useMutation } from "@tanstack/react-query"
import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "sonner"

import {
  STORAGE_TOKEN_ACCESS,
  STORAGE_TOKEN_REFRESH,
} from "@/constants/local-storage"
import { UserService } from "@/services/user"

export const AuthContext = createContext({
  user: null,
  initializing: true,
  login: () => {},
  signup: () => {},
  signOut: () => {},
})

export const useAuthContext = () => useContext(AuthContext)

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
  const [initializing, setInitializing] = useState(true)
  const signupMutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (variables) => {
      const response = UserService.signup(variables)
      return response
    },
  })

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (variables) => {
      const response = UserService.login(variables)
      return response
    },
  })

  useEffect(() => {
    const init = async () => {
      try {
        setInitializing(true)
        const accessToken = localStorage.getItem(STORAGE_TOKEN_ACCESS)
        const refreshToken = localStorage.getItem(STORAGE_TOKEN_REFRESH)

        if (!accessToken && !refreshToken) return
        const response = await UserService.me()
        setUser(response.data)
      } catch (error) {
        setUser(null)
        console.error(error)
      } finally {
        setInitializing(false)
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

  const signOut = () => {
    setUser(null)
    removeTokens()
  }
  return (
    <AuthContext.Provider
      value={{ user, initializing, login, signup, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
