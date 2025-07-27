import { useState } from "react"
import BentoWrapper from "../bento-wrapper/BentoWrapper"
import { supabase } from "../../../supabase"
import Loader from "../loader/Loader"

export default function DebitModule({ balance, setBalance, setDebits }) {
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [createAt, setCreateAt] = useState(new Date().toISOString().split("T")[0])
  const [loader, setLoader] = useState(false)

  const handleAddDebit = async () => {
    const value = parseFloat(amount)
    if (!isNaN(value)) {
      setLoader(true)
      const { data, error } = await supabase
        .from('transaction')
        .insert([{ amount: -value, description, created_at: createAt }])
        .select()
      setLoader(false)
      
      if (!data || error) { 
        console.error("Erreur Supabase :", error)
        return
      }
      
      setBalance(balance - value)
      setDebits(prev => [...prev, { amount: -value, description, createAt }])
      setCreateAt(new Date().toISOString().split("T")[0])
      setAmount("")
      setDescription("")
    }
  }

  return (
    <BentoWrapper>
      <h2>Débit</h2>
      <div style={{display: "flex", gap:"10px", width: "100%", height: "auto"}}>

      <input
        style={{ width: "100%", margin: "1rem 0", boxShadow: "0 0 5px rgba(0, 0, 0, 0.19)", padding: "0 4px", borderRadius: "4px" }}
        type="number"
        value={amount}
        placeholder="Saisir un montant à débiter"
        onChange={(e) => setAmount(e.target.value)}
        />
        <input
          style={{ width: "100%", margin: "1rem 0", boxShadow: "0 0 5px rgba(0, 0, 0, 0.19)", padding: "0 4px", borderRadius: "4px" }}
          type="date"
          value={createAt}
          placeholder="Date du débit"
          onChange={(e) => setCreateAt(e.target.value)}
        />
        </div>
        <input
          style={{ width: "100%", margin: "1rem 0", boxShadow: "0 0 5px rgba(0, 0, 0, 0.19)", padding: "0 4px", borderRadius: "4px" }}
          type="text"
          value={description}
          placeholder="Description du débit"
          onChange={(e) => setDescription(e.target.value)}
          />
      <button onClick={handleAddDebit}>{loader ? <Loader /> : "Ajouter Débit"}</button>
    </BentoWrapper>
  )
}
