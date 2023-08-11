import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'

import {MdWork} from 'react-icons/md'

import './index.css'

const JobsList = props => {
  const {itemDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = itemDetails
  return (
    <Link to={`/jobs/${id}`}>
      <li className="companyHead">
        <div className="head1">
          <img className="logo" src={companyLogoUrl} alt="company Logo" />
          <div>
            <h3>{title}</h3>
            <div className="star">
              <AiFillStar className="starIcon" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="secondTheme">
          <div className="inside2">
            <div>
              <p>{location}</p>
            </div>
            <div className="inside">
              <MdWork className="workIcon" />
              <p>{employmentType}</p>
            </div>
          </div>

          <div>
            <p>{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="hr" />
        <div>
          <h4>Description</h4>
          <p>{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobsList
