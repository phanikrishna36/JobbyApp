import './index.css'

const TypeEmployement = props => {
  const {itemDetails} = props
  const {label, employmentTypeId} = itemDetails
  return (
    <li className="checkrow">
      <input type="checkbox" id={employmentTypeId} />
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}

export default TypeEmployement
