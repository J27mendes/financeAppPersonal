import { Navigate } from "react-router"

import AddTransactionButton from "@/components/AddTransactionButton"
import Balance from "@/components/Balance"
import DateSelection from "@/components/DateSelection"
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
      <div className="space-y-6 p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="flex items-center gap-2">
            <DateSelection />
            <AddTransactionButton />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[2fr,1fr]">
        <Balance />
      </div>
    </>
  )
}

export default HomePage
