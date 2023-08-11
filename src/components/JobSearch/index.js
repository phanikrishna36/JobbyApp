import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import JobsList from '../JobsList'

import './index.css'

class JobSearch extends Component {
  state = {isLoading: true, data: [], isError: false}

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl =
      'https://apis.ccbp.in/jobs?employment_type=&minimum_package=&search='
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchData = await response.json()
    if (response.ok) {
      const formatData = fetchData.jobs.map(i => ({
        companyLogoUrl: i.company_logo_url,
        employmentType: i.employment_type,
        id: i.id,
        jobDescription: i.job_description,
        location: i.location,
        packagePerAnnum: i.package_per_annum,
        rating: i.rating,
        title: i.title,
      }))
      this.setState({
        data: formatData,
        isLoading: false,
      })
    } else {
      this.setState({isError: true, isLoading: false})
    }
  }

  retry = () => {
    this.setState({isLoading: true, data: [], isError: false})
    this.fetchData()
  }

  renderFail = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.retry}>
        retry
      </button>
    </div>
  )

  renderJobSearch = () => {
    const {data} = this.state
    return (
      <ul>
        {data.map(i => (
          <JobsList key={i.id} itemDetails={i} />
        ))}
      </ul>
    )
  }

  renderResult = () => {
    const {isError} = this.state
    return isError ? this.renderFail() : this.renderJobSearch()
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return isLoading ? this.renderLoader() : this.renderResult()
  }
}

export default JobSearch
