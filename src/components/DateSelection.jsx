import { useQueryClient } from "@tanstack/react-query"
import { addMonths, format, isValid } from "date-fns"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router"

import { useAuthContext } from "@/context/auth"

import { DatePickerWithRange } from "./ui/datepPickerWithRange"

const formatDateToQueryParam = (date) => format(date, "yyyy-MM-dd")

const getInitialDateState = (searchParams) => {
  const dafaultDate = {
    from: new Date(),
    to: addMonths(new Date(), 1),
  }
  const from = searchParams.get("from")
  const to = searchParams.get("to")
  const datesAreInvalid = !isValid(new Date(from)) || !isValid(new Date(to))
  if (!from || !to) {
    return dafaultDate
  }
  if (datesAreInvalid) {
    return dafaultDate
  }
  return {
    from: new Date(`${from}T00:00:00`),
    to: new Date(`${to}T00:00:00`),
  }
}

const DateSelection = () => {
  const queryClient = useQueryClient()
  const { user } = useAuthContext()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [date, setDate] = useState(getInitialDateState(searchParams))

  useEffect(() => {
    if (!date.from || !date.to) return
    const queryParams = new URLSearchParams()
    queryParams.set("from", formatDateToQueryParam(date.from))
    queryParams.set("to", formatDateToQueryParam(date.to))
    navigate(`/?${queryParams.toString()}`)
    queryClient.invalidateQueries({
      queryKey: [
        "balance",
        user.id,
        formatDateToQueryParam(date.from),
        formatDateToQueryParam(date.to),
      ],
      exact: true,
    })
  }, [navigate, date, queryClient, user.id])
  return <DatePickerWithRange value={date} onChange={setDate} />
}

export default DateSelection
