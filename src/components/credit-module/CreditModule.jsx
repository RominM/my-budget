import { useState } from "react"
import BentoWrapper from "../bento-wrapper/BentoWrapper"

export default function CreditModule({ balance, setBalance, setCredits }) {
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])

  const handleAddCredit = () => {
    const value = parseFloat(amount)
    if (!isNaN(value)) {
      setBalance(balance + value)
      setCredits(prev => [...prev, { amount: value, description, date }])
      setAmount("")
      setDescription("")
      setDate(new Date().toISOString().split("T")[0])
    }
  }

  return (
    <BentoWrapper>
      <h2>Crédit</h2>
      <input
        style={{ width: "100%", margin: "1rem 0" }}
        type="number"
        value={amount}
        placeholder="Saisir un montant à créditer"
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        style={{ width: "100%", margin: "1rem 0" }}
        type="text"
        value={description}
        placeholder="Description du crédit"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        style={{ width: "100%", margin: "1rem 0" }}
        type="date"
        value={date}
        placeholder="Date du crédit"
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleAddCredit}>Ajouter Crédit</button>
    </BentoWrapper>
  )
}
