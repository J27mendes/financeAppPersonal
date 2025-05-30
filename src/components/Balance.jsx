import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react"
import { useSearchParams } from "react-router"

import { useGetUserBalance } from "@/api/hooks/user"
import { safeAmount } from "@/lib/utils"

import BalanceItem from "./BalanceItem"

const Balance = () => {
  const [searchParams] = useSearchParams()
  const from = searchParams.get("from")
  const to = searchParams.get("to")
  const { data } = useGetUserBalance({ from, to })

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-6">
      <BalanceItem
        label={"Saldo"}
        icon={<WalletIcon size={16} />}
        amount={safeAmount(data?.balance)}
      />
      <BalanceItem
        label={"Ganhos"}
        icon={<TrendingUpIcon className="text-primary-green" size={16} />}
        amount={safeAmount(data?.earnings)}
      />
      <BalanceItem
        label={"Gastos"}
        icon={<TrendingDownIcon className="text-primary-red" size={16} />}
        amount={safeAmount(data?.expenses)}
      />
      <BalanceItem
        label={"Investimentos"}
        icon={<PiggyBankIcon className="text-primary-blue" size={16} />}
        amount={safeAmount(data?.investments)}
      />
    </div>
  )
}

export default Balance
