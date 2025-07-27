import "./modale.css"

export default function Modale({closeModale, children}) {
  return (
    <div className="modale-mask">
      <div className="modale">
        <button className="close" onClick={() => closeModale(false)}>Fermer</button>
        <div>{children}</div>
      </div>
    </div>
  )
}