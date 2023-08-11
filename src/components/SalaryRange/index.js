import './index.css'

const SalaryRange = props => {
  const {itemDetails} = props
  const {label, salaryRangeId} = itemDetails
  return (
    <li className="checkrow">
      <input type="radio" id={salaryRangeId} name="salary" />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}

export default SalaryRange
