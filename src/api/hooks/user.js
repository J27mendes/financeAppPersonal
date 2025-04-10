import { useQuery } from "@tanstack/react-query"

import { useAuthContext } from "@/context/auth"

import { UserService } from "../services/user"

export const getUserBalanceQueryKey = ({ userId, from, to }) => {
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
