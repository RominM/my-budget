import { useState } from "react"
import { supabase } from "../../../supabase"
import { formatEuro } from "../../utils/euroFormat"
import BentoWrapper from "../bento-wrapper/BentoWrapper"
import Modale from "../modale/Modale"
import Loader from "../loader/Loader"
import TransactionList from "../transaction-list/TransactionList"
import MonthNavigator from "../month-navigator/MonthNavigator"

export default function FinalBalance({ balance, selectedDate, onChangeDate, fixedCosts }) {
  const [modale, setModale] = useState(false)
  const [createAt, setCreateAt] = useState("")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [loader, setLoader] = useState(false)

  const totalFixedCosts = fixedCosts.reduce((acc, item) => acc + item.amount, 0)

  const today = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })

  const handleAddFixed = async () => {
    const value = parseFloat(amount)
    if (!isNaN(value)) {
      setLoader(true)
      const { error } = await supabase
        .from('transaction')
        .insert([{ amount: -value, description, created_at: createAt, is_fixed: true }])
      setLoader(false)

      if (error) {
        console.error("Erreur Supabase :", error)
        return
      }

      setModale(false)
      setCreateAt(new Date().toISOString().split("T")[0])
      setAmount("")
      setDescription("")
    }
  }

  return (
    <BentoWrapper>
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", height: "auto", width: "100%" }}>
          <div>Aujourd'hui : {today}</div>
          <MonthNavigator selectedDate={selectedDate} onChange={onChangeDate} />
        </div>
        <div>
          <h2>Solde Courant</h2>
          <h1 style={{ color: balance <= 0 ? "red" : "green", whiteSpace: "nowrap" }}>{formatEuro(balance)}</h1>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-start", height: "auto", width: "100%" }}>
          <button onClick={() => setModale(true)}>Frais fixes</button>
        </div>
      </div>

      {modale && (
        <Modale closeModale={setModale}>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="number"
              value={amount}
              placeholder="Montant"
              onChange={(e) => setAmount(e.target.value)}
            />
            <input
              type="date"
              value={createAt}
              onChange={(e) => setCreateAt(e.target.value)}
            />
          </div>
          <input
            type="text"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleAddFixed}>{loader ? <Loader /> : "Ajouter frais fixe"}</button>
          <TransactionList transactions={fixedCosts} theme="light" />
          <p>Total des frais fixes : {formatEuro(totalFixedCosts)}</p>
        </Modale>
      )}
    </BentoWrapper>
  )
}
