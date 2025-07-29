import "./modale.css"

export default function Modale({closeModale, children}) {
  return (
    <div className="modale-mask">
      <div className="modale" style={{display: "flex", flexDirection: "column", gap: "10rem", width: "100%", height: "auto"}}>
        <button className="close" onClick={() => closeModale(false)}>Fermer</button>
        <div style={{display: "flex", flexDirection: "column", gap: "1rem", height: "auto"}}>{children}</div>
      </div>
    </div>
  )
}