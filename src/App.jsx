import './App.css'
import FinalBalance from './components/final-balance/FinalBalance'
import TransactionModule from './components/transaction-module/TransactionModule'
import TransactionList from './components/transaction-list/TransactionList'
import { useState } from 'react'
import Loader from './components/loader/Loader'
import { useMonthlyTransactions } from './hooks/useMonthlyTransactions'

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const { transactions, loading } = useMonthlyTransactions(selectedDate)

  const balance = transactions.reduce((acc, tx) => acc + tx.amount, 0)
  const credits = transactions.filter(tx => tx.amount > 0)
  const debits = transactions.filter(tx => tx.amount < 0 && !tx.is_fixed)
  const fixedCosts = transactions.filter(tx => tx.is_fixed)

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", width: "100%", height: "90dvh" }}>
      <FinalBalance 
        balance={balance}
        fixedCosts={fixedCosts}
        selectedDate={selectedDate}
        onChangeDate={setSelectedDate}
      />

        <div className="modules" style={{ display: "flex", gap: "1rem", width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "50%" }}>
            <TransactionModule 
              balance={balance}
              title="Crédit"
              type="credit"
              selectedDate={selectedDate}
            />
            {loading ? <Loader /> : (
              <TransactionList transactions={credits} theme="dark" />
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "50%" }}>
            <TransactionModule 
              balance={balance}
              title="Débit"
              type="debit"
              selectedDate={selectedDate}
            />
            {loading ? <Loader /> : (
              <TransactionList transactions={debits} theme="dark" />
            )}
          </div>
        </div>
    </div>
  )
}

export default App
