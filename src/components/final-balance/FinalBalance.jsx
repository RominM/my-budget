import { useState } from "react"
import { formatEuro } from "../../utils/euroFormat"
import BentoWrapper from "../bento-wrapper/BentoWrapper"
import Modale from "../modale/Modale"
import { supabase } from "../../../supabase"
import Loader from "../loader/Loader"

export default function FinalBalance({ balance, fixedCosts }) {
  const [modale, setModale] = useState(false)
  const [createAt, setCreateAt] = useState("")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [loader, setLoader] = useState(false)
  
  const handleAddDebit = async () => {
    const value = parseFloat(amount)
    if (!isNaN(value)) {
      setLoader(true)
      const { data, error } = await supabase
        .from('transaction')
        .insert([{ amount: -value, description, created_at: createAt, is_fixed: true }])
        .select()
      setLoader(false)
      
      if (!data || error) { 
        console.error("Erreur Supabase :", error)
        return
      }
      
      setModale(false)
      // setBalance(balance - value)
      // setDebits(prev => [...prev, { amount: -value, description, createAt }])
      setCreateAt(new Date().toISOString().split("T")[0])
      setAmount("")
      setDescription("")
    }
  }

  return (
    <BentoWrapper>
      <div  style={{display: "flex", justifyContent: "space-between", width:"100%"}}>
        <div>Date</div>
        <div>
          <h2>Solde</h2>
          <h1 style={balance <= 0 ? { color: "red" } : { color: "green" }}>{formatEuro(balance)}</h1>
        </div>
        <div>
          <button onClick={() => setModale(true)}>Frais fixes</button>
        </div>
      </div>

      {modale && <Modale closeModale={setModale}>
      <div style={{display: "flex", gap:"10px", width: "100%", height: "auto"}}>
        <input
          style={{ width: "100%", margin: "1rem 0", boxShadow: "0 0 5px rgba(0, 0, 0, 0.19)", padding: "0 4px", borderRadius: "4px", color:"black"}}
          type="number"
          value={amount}
          placeholder="Saisir un montant de frais fixe"
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          style={{ width: "100%", margin: "1rem 0", boxShadow: "0 0 5px rgba(0, 0, 0, 0.19)", padding: "0 4px", borderRadius: "4px", color:"black" }}
          type="date"
          value={createAt}
          placeholder="Date du prélèvement"
          onChange={(e) => setCreateAt(e.target.value)}
        />
        </div>
        <input
          style={{ width: "100%", margin: "1rem 0", boxShadow: "0 0 5px rgba(0, 0, 0, 0.19)", padding: "0 4px", borderRadius: "4px", color:"black" }}
          type="text"
          value={description}
          placeholder="Description du frais fixe"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleAddDebit}>{loader ? <Loader /> : "Ajouter frais fixe"}</button>

        {fixedCosts.map((fixedCost) => (
          <div key={fixedCost.id}>
            <h3 style={{ color: "black" }}>{fixedCost.description}</h3>
            <p style={{ color: "black" }}>{fixedCost.amount}</p>
            <p style={{ color: "black" }}>{fixedCost.created_at}</p>
          </div>
        ))}
      </Modale>}
    </BentoWrapper>
  )
}