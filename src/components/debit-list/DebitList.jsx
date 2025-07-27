import AmountLine from "../amount-line/AmountLine"
import BentoWrapper from "../bento-wrapper/BentoWrapper"

export default function DebitList({ debits }) {
  return (
    <BentoWrapper>
      <h3>Liste des débits</h3>
      <ul style={{ width: "100%" }}>
        {debits.map((entry, index) => (
          <AmountLine key={index} entry={entry} />
        ))}
      </ul>
    </BentoWrapper>
  )
}
