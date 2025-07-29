import { useState } from "react"
// import { formatEuro } from "../../utils/euroFormat"
import "./AmountLine.css"

export default function AmountLine({ entry, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [amount, setAmount] = useState(entry.amount)
  const [description, setDescription] = useState(entry.description)
  const [createdAt, setCreatedAt] = useState(entry.created_at)

  // const formattedDate = new Date(createdAt).toLocaleDateString("fr-FR", {
  //   weekday: "short",
  //   day: "numeric"
  // })

  const handleSave = () => {
    setIsEditing(false)
    onEdit?.({
      ...entry,
      amount: parseFloat(amount),
      description,
      created_at: createdAt,
    })
  }

  const handleCancel = () => {
    setIsEditing(false)
    setAmount(entry.amount)
    setDescription(entry.description)
    setCreatedAt(entry.created_at)
  }

  return (
    <li className="amount-line" onClick={() => !isEditing && setIsEditing(true)} title="éditer">
      {isEditing ? (
        <>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="date"
            value={createdAt.slice(0, 10)}
            onChange={(e) => setCreatedAt(e.target.value)}
          />
          <button onClick={handleSave}>💾</button>
          <button onClick={handleCancel}>❌</button>
        </>
      ) : (
        <AmountLine entry={entry} />
      )}
    </li>
  )
}
{/* <span>{formatEuro(entry.amount)}</span>
<div>{entry.description}</div>
<span>{formattedDate}</span>
</AmountLine> */}
