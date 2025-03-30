import axios from "axios"

import { STORAGE_TOKEN_ACCESS } from "@/constants/local-storage"

export const api = axios.create({ baseURL: "http://localhost:80/api" })

api.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem(STORAGE_TOKEN_ACCESS)
  if (!accessToken) {
    return request
  }
  request.headers.Authorization = `Bearer ${accessToken}`
  return request
})
