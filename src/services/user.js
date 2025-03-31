import { protectedApi, publicApi } from "@/lib/axios"

export const UserService = {
  signup: async (input) => {
    const response = await publicApi.post("/users", {
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      password: input.password,
    })
    return response.data
  },
  login: async (input) => {
    const response = await publicApi.post("/users/auth", {
      email: input.emailLogin,
      password: input.passwordLogin,
    })
    return response.data
  },
  me: async () => {
    const response = await protectedApi.get("/users/me")
    return response.data
  },
}
