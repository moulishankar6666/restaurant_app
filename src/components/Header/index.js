import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'

import {AiOutlineShoppingCart} from 'react-icons/ai'

import Cookies from 'js-cookie'

import CartContext from '../../context/CartContext'

import './index.css'

class Header extends Component {
  state = {menuDetails: []}

  componentDidMount() {
    this.getName()
  }

  getName = async () => {
    const response = await fetch(
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc',
    )
    const data = await response.json()

    this.setState({menuDetails: data[0]})
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {menuDetails} = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          return (
            <header className="header">
              <Link className="link" to="/">
                <h1>UNI Resto Cafe</h1>
              </Link>
              <div className="cart-and-logout">
                <p className="orders">My Orders</p>

                <div className="cart-container">
                  <Link to="/cart">
                    <button className="cart-icon-btn" type="button">
                      <AiOutlineShoppingCart className="cart-logo" />
                    </button>
                    <div className="cart-count">
                      <p>{cartList.length}</p>
                    </div>
                  </Link>
                </div>
                <button
                  onClick={this.onClickLogout}
                  className="logout-btn"
                  type="button"
                >
                  Logout
                </button>
              </div>
            </header>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default withRouter(Header)
