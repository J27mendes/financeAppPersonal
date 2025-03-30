import { Navigate } from "react-router"

import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/context/auth"

const HomePage = () => {
  const { user, initializing, signOut } = useAuthContext()

  if (initializing) return null

  if (!user) {
    return <Navigate to={"/login"} />
  }
  return (
    <div>
      <h1>Home Page</h1>
      <h1 className="text-4xl text-primary-green">{`Olá, ${user.first_name}`}</h1>
      <Button variant={"destructive"} onClick={signOut}>
        Sair
      </Button>
    </div>
  )
}

export default HomePage
