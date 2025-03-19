import "./index.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router"

import HomePage from "./pages/home"
import LoginPage from "./pages/login"
import NotFoundPage from "./pages/notFound"
import SignUpPage from "./pages/signUp"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/#" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
