import { formatEuro } from "../../utils/euroFormat"
import "./AmountLine.css"

export default function AmountLine({ entry }) {
  return (
    <li className="amount-line">
      <span>{formatEuro(entry.amount)}</span>
      <div>{entry.description}</div>
      <span>{entry.date}</span>
    </li>
  )
}