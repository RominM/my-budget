import { formatEuro } from "../../utils/euroFormat"
import BentoWrapper from "../bento-wrapper/BentoWrapper"

export default function FinalBalance({ balance }) {
  return (
    <BentoWrapper>
      <h2>Solde</h2>
      <h1 style={balance <= 0 ? { color: "red" } : { color: "green" }}>{formatEuro(balance)}</h1>
    </BentoWrapper>
  )
}