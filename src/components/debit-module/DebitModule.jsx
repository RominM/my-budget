import { useState } from "react"
import BentoWrapper from "../bento-wrapper/BentoWrapper"

export default function DebitModule({ balance, setBalance, setDebits }) {
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])

  const handleAddDebit = () => {
    const value = parseFloat(amount)
    if (!isNaN(value)) {
      setBalance(balance - value)
      setDebits(prev => [...prev, { amount: value, description, date }])
      setDate(new Date().toISOString().split("T")[0])
      setAmount("")
      setDescription("")
    }
  }

  return (
    <BentoWrapper>
      <h2>Débit</h2>
      <input
        style={{ width: "100%", margin: "1rem 0" }}
        type="number"
        value={amount}
        placeholder="Saisir un montant à débiter"
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        style={{ width: "100%", margin: "1rem 0" }}
        type="text"
        value={description}
        placeholder="Description du débit"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        style={{ width: "100%", margin: "1rem 0" }}
        type="date"
        value={date}
        placeholder="Date du débit"
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleAddDebit}>Ajouter Débit</button>
    </BentoWrapper>
  )
}
