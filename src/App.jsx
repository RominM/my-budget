import './App.css'
import FinalBalance from './components/final-balance/FinalBalance'
import CreditModule from './components/credit-module/CreditModule'
import DebitModule from './components/debit-module/DebitModule'
import CreditList from './components/credit-list/CreditList'
import DebitList from './components/debit-list/DebitList'
import { useState } from 'react'

function App() {
  const [balance, setBalance] = useState(0)
  const [credits, setCredits] = useState([])
  const [debits, setDebits] = useState([])

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", width: "100%" }}>
      <FinalBalance balance={balance} />
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
      </div>
    </div>
  )
}

export default App
