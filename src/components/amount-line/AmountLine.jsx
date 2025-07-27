import { formatEuro } from "../../utils/euroFormat"
import "./AmountLine.css"

export default function AmountLine({ entry }) {
  const createdAtEntry = new Date(entry.created_at)

  const options = { weekday: "short", day: "numeric" }
  const formattedDate = createdAtEntry.toLocaleDateString("fr-FR", options)
  
  return (
    <li className="amount-line">
      <span>{formatEuro(entry.amount)}</span>
      <div>{entry.description}</div>
      <span>{formattedDate}</span>
    </li>
  )
}