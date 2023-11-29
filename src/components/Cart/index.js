import Header from '../Header'
import CartContext from '../../context/CartContext'
import CartItem from '../CartItem'

import './index.css'

const CartRoute = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value

      return (
        <div className="restaurant-cart">
          <Header />
          {cartList.length > 0 ? (
            <section>
              <div className="remove-all-btn-container">
                <button
                  onClick={() => removeAllCartItems()}
                  className="remove-all-button"
                  type="button"
                >
                  Remove All
                </button>
              </div>

              <ul className="cart-list-items">
                {cartList.map(dish => (
                  <CartItem key={dish.dish_id} dish={dish} />
                ))}
              </ul>
            </section>
          ) : (
            <div className="empty-cart">
              <img
                width={150}
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                alt="empty cart"
              />
            </div>
          )}
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartRoute
