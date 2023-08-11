import Cookies from 'js-cookie'
import {BiSearch} from 'react-icons/bi'
import {Redirect} from 'react-router-dom'
import TypeEmployement from '../TypeEmployement'
import SalaryRange from '../SalaryRange'
import Header from '../Header'
import Profile from '../Profile'
import JobSearch from '../JobSearch'

import './index.css'

const Jobs = () => {
  const employmentTypesList = [
    {
      label: 'Full Time',
      employmentTypeId: 'FULLTIME',
    },
    {
      label: 'Part Time',
      employmentTypeId: 'PARTTIME',
    },
    {
      label: 'Freelance',
      employmentTypeId: 'FREELANCE',
    },
    {
      label: 'Internship',
      employmentTypeId: 'INTERNSHIP',
    },
  ]

  const salaryRangesList = [
    {
      salaryRangeId: '1000000',
      label: '10 LPA and above',
    },
    {
      salaryRangeId: '2000000',
      label: '20 LPA and above',
    },
    {
      salaryRangeId: '3000000',
      label: '30 LPA and above',
    },
    {
      salaryRangeId: '4000000',
      label: '40 LPA and above',
    },
  ]
  const accessToken = Cookies.get('jwt_token')

  if (accessToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <>
      <Header />
      <div className="contElements">
        <div>
          <ul className="profile">
            <Profile />
          </ul>
          <hr className="hr" />
          <ul>
            <h1>Type of Employment</h1>

            {employmentTypesList.map(i => (
              <TypeEmployement key={i.employmentTypeId} itemDetails={i} />
            ))}
          </ul>
          <hr className="hr" />
          <ul>
            <h1>Salary Range</h1>
            {salaryRangesList.map(i => (
              <SalaryRange key={i.salaryRangeId} itemDetails={i} />
            ))}
          </ul>
        </div>

        <div>
          <input type="search" placeholder="Search" />
          <button type="button" data-testid="searchButton">
            <BiSearch />
          </button>
          <div>
            <JobSearch />
          </div>
        </div>
      </div>
    </>
  )
}
export default Jobs
