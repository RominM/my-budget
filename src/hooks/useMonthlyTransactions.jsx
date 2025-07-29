import { useEffect, useState } from "react"
import { supabase } from "../../supabase"

function getMonthRange(date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const start = new Date(year, month, 1).toISOString()
  const end = new Date(year, month + 1, 1).toISOString()
  return { start, end }
}

export function useMonthlyTransactions(selectedDate) {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true)
      const { start, end } = getMonthRange(selectedDate)

      const { data, error } = await supabase
        .from("transaction")
        .select("*")
        .gte("created_at", start)
        .lt("created_at", end)
        .order("created_at", { ascending: false })

      if (!error) setTransactions(data || [])
      setLoading(false)
    }

    fetchTransactions()
  }, [selectedDate])

  return { transactions, loading }
}
