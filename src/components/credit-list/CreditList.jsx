import BentoWrapper from "../bento-wrapper/BentoWrapper"
import AmountLine from "../amount-line/AmountLine"

export default function CreditList({ credits }) {
  return (
    <BentoWrapper className="credit-list">
      <h3>Liste des crédits</h3>
      <ul style={{ width: "100%" }}>
        {credits.map((entry, index) => (
          <AmountLine key={index} entry={entry} />
        ))}
      </ul>
    </BentoWrapper>
  )
}
