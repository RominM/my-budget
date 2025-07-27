import './bentWrapper.css'

export default function BentoWrapper({ children }) {
  return (
    <div className="bento-wrapper">
      {children}
    </div>
  )
}