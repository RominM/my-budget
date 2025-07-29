export default function MonthNavigator({ selectedDate, onChange }) {
  const handlePrev = () => {
    const prev = new Date(selectedDate)
    prev.setMonth(prev.getMonth() - 1)
    onChange(prev)
  }

  const handleNext = () => {
    const next = new Date(selectedDate)
    next.setMonth(next.getMonth() + 1)
    onChange(next)
  }

  const handleChange = (e) => {
    const [year, month] = e.target.value.split("-")
    onChange(new Date(parseInt(year), parseInt(month) - 1))
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <button onClick={handlePrev}>←</button>
      <strong>
        <input
          type="month"
          value={`${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}`}
          onChange={handleChange}
        />
      </strong>
      <button onClick={handleNext}>→</button>
    </div>
  )
}
