import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class JobItemDetails extends Component {
  state = {isLoading: true, data: []}

  componentDidMount() {
    this.fetchedData()
  }

  fetchedData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const fetchData = await response.json()
    console.log(fetchData)
    const formatData = {
      companyLogoUrl: fetchData.job_details.company_logo_url,
      companyWebsiteUrl: fetchData.job_details.company_website_url,
      employmentType: fetchData.job_details.employment_type,
      id: fetchData.job_details.id,
      jobDescription: fetchData.job_details.job_description,
      lifeAtCompany: {
        description: fetchData.job_details.life_at_company.description,
        imageUrl: fetchData.job_details.life_at_company.image_url,
      },
      location: fetchData.job_details.location,
      packagePerAnnum: fetchData.job_details.package_per_annum,
      rating: fetchData.job_details.rating,
      skills: fetchData.job_details.skills.map(i => ({
        imageUrl: i.image_url,
        name: i.name,
      })),
      title: fetchData.job_details.title,
      similarJobs: fetchData.similar_jobs.map(i => ({
        companyLogoUrl: i.company_logo_url,
        employmentType: i.employment_type,
        id: i.id,
        jobDescription: i.job_description,
        location: i.location,
        rating: i.rating,
        title: i.title,
      })),
    }
    console.log(formatData)
    this.setState({data: formatData, isLoading: false})
  }

  render() {
    const {data, isLoading} = this.state
    console.log(data)
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      skills,
      lifeAtCompany,
      similarJobs,
    } = data

    return (
      <>
        <Header />
        {!isLoading ? (
          <div>
            <div>
              <img src={companyLogoUrl} alt="job details company logo" />
              <ul>
                <li>
                  <h3>{title}</h3>
                  <p>{rating}</p>
                </li>
                <li>
                  <p>{location}</p>
                </li>
                <li>
                  <p>{employmentType}</p>
                </li>
                <li>
                  <p>{packagePerAnnum}</p>
                </li>
              </ul>
              <hr />
              <div>
                <h3>Description</h3>
                <a href={companyWebsiteUrl} target="blank_">
                  Visit
                </a>
                <p>{jobDescription}</p>
              </div>
              <div>
                <h3>Skills</h3>
                <ul className="skill">
                  {skills &&
                    skills.map(i => (
                      <li key={Math.ceil(Math.random() * 10)}>
                        <img src={i.imageUrl} alt={i.name} />
                        <h1>{i.name}</h1>
                      </li>
                    ))}
                </ul>

                <h1>Life at Company</h1>
                <p>{lifeAtCompany.description}</p>
                <img src={lifeAtCompany.imageUrl} alt="life at company" />
              </div>
            </div>
            <div>
              <h1>Similar Jobs</h1>

              <ul className="SmilarJob">
                {similarJobs &&
                  similarJobs.map(i => (
                    <li key={Math.ceil(Math.random() * 10)}>
                      <img
                        src={i.companyLogoUrl}
                        alt="similar job company logo"
                      />
                      <p>{i.title}</p>
                      <p>{i.rating}</p>
                      <h3>Description</h3>
                      <p>{i.jobDescription}</p>
                      <div>
                        <p>{i.location}</p>
                        <h1>{i.title}</h1>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )}
      </>
    )
  }
}

export default JobItemDetails
