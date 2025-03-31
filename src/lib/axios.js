import axios from "axios"

import {
  STORAGE_TOKEN_ACCESS,
  STORAGE_TOKEN_REFRESH,
} from "@/constants/local-storage"

export const publicApi = axios.create({ baseURL: "http://localhost:80/api" })

export const protectedApi = axios.create({ baseURL: "http://localhost:80/api" })

protectedApi.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem(STORAGE_TOKEN_ACCESS)
  if (!accessToken) {
    return request
  }
  request.headers.Authorization = `Bearer ${accessToken}`
  return request
})

protectedApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config
    const refreshToken = localStorage.getItem(STORAGE_TOKEN_REFRESH)
    if (!refreshToken) {
      return Promise.reject(error)
    }
    if (
      error.response.status === 401 &&
      !request._retry &&
      !request.url.includes("/users/authtoken")
    ) {
      request._retry = true
      try {
        const response = await protectedApi.post("/users//authtoken", {
          refreshToken,
        })
        const newAccessToken = response.data.accessToken
        const newRefreshTken = response.data.refreshToken
        localStorage.setItem(STORAGE_TOKEN_ACCESS, newAccessToken)
        localStorage.setItem(STORAGE_TOKEN_REFRESH, newRefreshTken)
        return protectedApi(request)
      } catch (refreshError) {
        localStorage.removeItem(STORAGE_TOKEN_ACCESS)
        localStorage.removeItem(STORAGE_TOKEN_REFRESH)
        console.error(refreshError)
      }
    }
    return Promise.reject(error)
  }
)
