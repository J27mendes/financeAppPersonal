import { useMutation, useQuery } from "@tanstack/react-query"

import { useAuthContext } from "@/context/auth"

import { UserService } from "../services/user"

export const getUserBalanceQueryKey = ({ userId, from, to }) => {
  if (!from || !to) {
    return ["balance", userId]
  }
  return ["balance", userId, from, to]
}

export const useGetUserBalance = ({ from, to }) => {
  const { user } = useAuthContext()
  return useQuery({
    queryKey: getUserBalanceQueryKey({ userId: user.id, from, to }),
    queryFn: () => {
      return UserService.getbalance({ from, to })
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
    enabled: Boolean(from) && Boolean(to) && Boolean(user.id),
  })
}

export const mutationSignupKey = ["signup"]

export const useSignup = () => {
  return useMutation({
    mutationKey: mutationSignupKey,
    mutationFn: async (variables) => {
      const response = UserService.signup(variables)
      return response
    },
  })
}

export const mutationLoginKey = ["login"]

export const useLogin = () => {
  return useMutation({
    mutationKey: mutationLoginKey,
    mutationFn: async (variables) => {
      const response = UserService.login(variables)
      return response
    },
  })
}
