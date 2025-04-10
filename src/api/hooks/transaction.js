import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useAuthContext } from "@/context/auth"

import { TransactionService } from "../services/transaction"
import { getUserBalanceQueryKey } from "./user"

export const mutationTransactionKey = ["createTransaction"]

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()
  const { user } = useAuthContext()
  return useMutation({
    mutationKey: mutationTransactionKey,
    mutationFn: (input) => TransactionService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserBalanceQueryKey({ userId: user.id }),
      })
    },
  })
}
