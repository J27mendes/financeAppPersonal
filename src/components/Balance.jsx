import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router"

import { UserService } from "@/services/user"

const Balance = () => {
  const [searchParams] = useSearchParams()
  const { data } = useQuery({
    queryKey: ["balance"],
    queryFn: () => {
      const from = searchParams.get("from")
      const to = searchParams.get("to")
      return UserService.getbalance({ from, to })
    },
  })
  console.log({ data })
  return <div></div>
}

export default Balance
