import './transaction-list.css'
import BentoWrapper from "../bento-wrapper/BentoWrapper"
import AmountLine from "../amount-line/AmountLine"

export default function TransactionList({ transactions, theme }) {
  return (
    <BentoWrapper>
      <ul className="transaction-list" style={{ color: theme === "dark" ? "#fff" : "#000" }}>
        {transactions.map((entry, index) => (
          <AmountLine key={index} entry={entry} />
        ))}
      </ul>
    </BentoWrapper>
  )
}
