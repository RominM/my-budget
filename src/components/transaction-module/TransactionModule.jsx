import { useState } from "react"
import BentoWrapper from "../bento-wrapper/BentoWrapper"
import { supabase } from "../../../supabase"
import Loader from "../loader/Loader"

export default function TransactionModule({ 
  balance, 
  setBalance, 
  setTransactions,
  title,
  type = "credit"
}) {
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [createAt, setCreateAt] = useState(new Date().toISOString().split("T")[0])
  const [loader, setLoader] = useState(false)

  const handleAddTransaction = async () => {
    let value = parseFloat(amount)
    if (!isNaN(value)) {
      const mathValue = Math.abs(value)
      value = type === "debit" ? -mathValue : mathValue
      
      setLoader(true)
      const { data, error } = await supabase
        .from('transaction')
        .insert([{ amount: value, description, created_at: createAt }])
        .select()
      setLoader(false)

      if (!data || error) {
        console.error("Erreur Supabase :", error)
        return
      }

      setBalance(balance + value)
      setTransactions(prev => [...prev, { amount: value, description, createAt }])
      setAmount("")
      setDescription("")
      setCreateAt(new Date().toISOString().split("T")[0])
    }
  }

  return (
    <BentoWrapper>
      <h2>{title}</h2>
      <div style={{ display: "flex", gap: "10px", width: "100%", height: "auto" }}>
        <input
          style={{ width: "100%", margin: "1rem 0", boxShadow: "0 0 5px rgba(0, 0, 0, 0.19)", padding: "0 4px", borderRadius: "4px" }}
          type="number"
          value={amount}
          placeholder="Saisir un montant"
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          style={{ width: "100%", margin: "1rem 0", boxShadow: "0 0 5px rgba(0, 0, 0, 0.19)", padding: "0 4px", borderRadius: "4px" }}
          type="date"
          value={createAt}
          onChange={(e) => setCreateAt(e.target.value)}
        />
      </div>

      <input
        style={{ width: "100%", margin: "1rem 0", boxShadow: "0 0 5px rgba(0, 0, 0, 0.19)", padding: "0 4px", borderRadius: "4px" }}
        type="text"
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={handleAddTransaction}>
        {loader ? <Loader /> : `Ajouter ${title}`}
      </button>
    </BentoWrapper>
  )
}
