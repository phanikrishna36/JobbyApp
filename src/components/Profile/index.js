import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

class Profile extends Component {
  state = {isLoading: true, data: [], isError: false}

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchData = await response.json()
    if (response.ok) {
      const formatData = {
        name: fetchData.profile_details.name,
        imageUrl: fetchData.profile_details.profile_image_url,
        bio: fetchData.profile_details.short_bio,
      }
      this.setState({
        data: formatData,
        isLoading: false,
      })
    } else {
      this.setState({isError: true, isLoading: false})
    }
  }

  renderProfile = () => {
    const {data} = this.state
    const {name, imageUrl, bio} = data
    return (
      <li className="profile">
        <img src={imageUrl} alt="profile" />
        <h1 className="heading">{name}</h1>
        <p>{bio}</p>
      </li>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  renderResult = () => {
    const {isError} = this.state
    return isError ? this.renderFail() : this.renderProfile()
  }

  retry = () => {
    this.setState({isLoading: true, data: [], isError: false})
    this.fetchData()
  }

  renderFail = () => (
    <div>
      <button type="button" onClick={this.retry}>
        retry
      </button>
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div className="profile">
        {isLoading ? this.renderLoader() : this.renderResult()}
      </div>
    )
  }
}

export default Profile
