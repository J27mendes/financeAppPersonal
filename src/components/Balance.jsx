import { useQuery } from "@tanstack/react-query"
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react"
import { useSearchParams } from "react-router"

import { useAuthContext } from "@/context/auth"
import { UserService } from "@/services/user"

import BalanceItem from "./BalanceItem"

const Balance = () => {
  const [searchParams] = useSearchParams()
  const from = searchParams.get("from")
  const to = searchParams.get("to")
  const { user } = useAuthContext()
  const { data } = useQuery({
    queryKey: ["balance", user.id, from, to],
    queryFn: () => {
      return UserService.getbalance({ from, to })
    },
  })
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-6">
      <BalanceItem
        label={"Saldo"}
        icon={<WalletIcon size={16} />}
        amount={data?.balance}
      />
      <BalanceItem
        label={"Ganhos"}
        icon={<TrendingUpIcon className="text-primary-green" size={16} />}
        amount={data?.earnings}
      />
      <BalanceItem
        label={"Gastos"}
        icon={<TrendingDownIcon className="text-primary-red" size={16} />}
        amount={data?.expenses}
      />
      <BalanceItem
        label={"Investimentos"}
        icon={<PiggyBankIcon className="text-primary-blue" size={16} />}
        amount={data?.investments}
      />
    </div>
  )
}

export default Balance
