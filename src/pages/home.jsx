import { Navigate } from "react-router"

import Header from "@/components/header"
import { useAuthContext } from "@/context/auth"

const HomePage = () => {
  const { user, initializing } = useAuthContext()

  if (initializing) return null

  if (!user) {
    return <Navigate to={"/login"} />
  }
  return (
    <>
      <Header />
    </>
  )
}

export default HomePage
