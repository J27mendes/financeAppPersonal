import { protectedApi, publicApi } from "@/lib/axios"

export const UserService = {
  /**
   * cria um novo usuário.
   * @param {Object} input
   * @param {string} input.firstName
   * @param {string} input.lastName
   * @param {string} input.email
   * @param {string} input.password
   * @returns {Object} Usuário criado
   * @returns {string} response.tokens - tokens de autenticação
   */
  signup: async (input) => {
    const response = await publicApi.post("/users", {
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      password: input.password,
    })
    return response.data
  },
  /**
   * usuário autenticado.
   * @param {string} input
   * @param {string} input.email
   * @param {string} input.password
   * @returns {Object} Usuário autenticado
   * @returns {string} response.tokens - tokens de autenticação
   */
  login: async (input) => {
    const response = await publicApi.post("/users/auth", {
      email: input.emailLogin,
      password: input.passwordLogin,
    })
    return response.data
  },
  /**
   * Usuário autenticado.
   * @returns {Object} Usuário autenticado.
   */
  me: async () => {
    const response = await protectedApi.get("/users/me")
    return response.data
  },
  /**
   * retorna o balanço do usuário autenticado
   * @param {Object} input
   * @param {string} input.from - data inicial (yyyy-MM-dd)
   * @param {string} input.to - data final (yyy-MM-dd)
   */
  getbalance: async (input) => {
    const queryParams = new URLSearchParams()
    queryParams.set("from", input.from)
    queryParams.set("to", input.to)
    const response = await protectedApi.get(
      `/users/me/balance?${queryParams.toString()}`
    )
    return response.data
  },
}
