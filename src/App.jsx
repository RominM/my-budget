import './App.css'
import FinalBalance from './components/final-balance/FinalBalance'
import CreditModule from './components/credit-module/CreditModule'
import DebitModule from './components/debit-module/DebitModule'
import CreditList from './components/credit-list/CreditList'
import DebitList from './components/debit-list/DebitList'
import { useEffect, useState } from 'react'
import Loader from './components/loader/Loader'
import { supabase } from '../supabase'

function App() {
  const [balance, setBalance] = useState(0)
  const [credits, setCredits] = useState([])
  const [debits, setDebits] = useState([])
  const [fixedCosts, setFixedCosts] = useState([])
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoader(true)
      const { data, error } = await supabase
      .from('transaction')
      .select('*')
      .order('created_at', { ascending: false })
      setLoader(false)
      
      if (!data || error) {
        console.error("Erreur fetch initial :", error)
        return
      }

      const creditList = data.filter(tx => tx.amount > 0)
      const debitList = data.filter(tx => tx.amount < 0 && !tx.is_fixed)
      const fixedCosts = data.filter(tx => tx.is_fixed)
      const totalBalance = data.reduce((acc, tx) => acc + tx.amount, 0)

      setCredits(creditList)
      setDebits(debitList)
      setFixedCosts(fixedCosts)
      setBalance(totalBalance)
    }

    fetchTransactions()
  }, [])

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", width: "100%" }}>
      <FinalBalance balance={balance} fixedCosts={fixedCosts} />
      {loader ? <Loader /> : 
      <div className="modules" style={{ display: "flex", gap: "1rem", width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "50%" }}>
          <CreditModule
            balance={balance}
            setBalance={setBalance}
            setCredits={setCredits}
          />
          <CreditList credits={credits} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "50%" }}>
          <DebitModule
            balance={balance}
            setBalance={setBalance}
            setDebits={setDebits}
          />
          <DebitList debits={debits} />
        </div>
      </div>}
    </div>
  )
}

export default App
