import { protectedApi } from "@/lib/axios"

export const TransactionService = {
  /**
   * cria uma transação para o usuário autenticado.
   * @param {object} input - Usuário a ser criado.
   * @param {object} input.name - Nome da transação a ser criada.
   * @param {object} input.date - Data da transação (yyyy-mm-dd).
   * @param {object} input.amount - Valor da transação.
   * @param {object} input.type - Tipo da transação (EARNING/EXPENSE/INVESTMENT).
   */
  create: async (input) => {
    const response = await protectedApi.post("/transactions/me", input)
    return response.data
  },
}
