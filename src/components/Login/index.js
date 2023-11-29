import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isShowPassword: false,
    error: false,
    errorMsg: '',
  }

  setUsername = event => {
    this.setState({username: event.target.value})
  }

  setPassword = event => {
    this.setState({password: event.target.value})
  }

  showAndHidePassword = event => {
    this.setState({isShowPassword: event.target.checked})
  }

  verifyUserDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const {history} = this.props

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    const JwtToken = data.jwt_token
    if (response.ok === true) {
      Cookies.set('jwt_token', JwtToken, {expires: 30})
      history.replace('/')
    } else {
      this.setState({
        error: true,
        errorMsg: data.error_msg,
      })
    }
  }

  renderLoginPage = () => {
    const {username, password, isShowPassword, error, errorMsg} = this.state
    return (
      <div className="login-main-container">
        <div className="Login-card">
          <p className="welcome-note">Welcome to</p>
          <h1 className="restaurant-name">UNI Resto Cafe</h1>
          <form className="login-form" onSubmit={this.verifyUserDetails}>
            <label htmlFor="username">USERNAME</label>
            <input
              onChange={this.setUsername}
              value={username}
              placeholder="username"
              id="username"
              type="text"
            />
            <label htmlFor="password">PASSWORD</label>
            <input
              onChange={this.setPassword}
              placeholder="password"
              value={password}
              id="password"
              type="password"
            />
            {/* <div className="show-password-container">
              <input
                onChange={this.showAndHidePassword}
                checked={isShowPassword}
                id="showPassword"
                type="checkbox"
              />

              <label htmlFor="showPassword">Show Password</label>
            </div> */}
            <button className="login-button" type="submit">
              Login
            </button>
            {error && <p className="error-msg">{`* ${errorMsg}`}</p>}
          </form>
        </div>
      </div>
    )
  }

  render() {
    const JwtToken = Cookies.get('jwt_token')

    if (JwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return this.renderLoginPage()
  }
}
export default Login
