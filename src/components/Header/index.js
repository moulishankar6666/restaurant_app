import {Link, withRouter} from 'react-router-dom'

import {AiOutlineShoppingCart} from 'react-icons/ai'

// import Cookies from 'js-cookie'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  //   const onClickLogout = () => {
  //     const {history} = props
  //     // Cookies.remove('jwt_token')
  //     history.replace('/login')
  //   }
  console.log(props)
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        return (
          <header className="header">
            {/* <Link className="link" to="/"> */}
            <h1>UNI Resto Cafe</h1>
            {/* </Link> */}
            <div className="cart-and-logout">
              <p className="orders">My Orders</p>

              <div className="cart-container">
                {/* <Link to="/Cart"> */}
                <button className="cart-icon-btn" type="button">
                  <AiOutlineShoppingCart className="cart-logo" />
                </button>
                {/* </Link> */}
                <div className="cart-count">
                  <p>{cartList.length}</p>
                </div>
              </div>

              <button
                // onClick={onClickLogout}
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
export default Header
