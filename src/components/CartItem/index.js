import {BsFillCircleFill} from 'react-icons/bs'
import {AiOutlineMinus} from 'react-icons/ai'
import {GoPlus} from 'react-icons/go'

import './index.css'
import CartContext from '../../context/CartContext'

const CartItem = props => {
  const {dish} = props

  return (
    <CartContext.Consumer>
      {value => {
        const {
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          removeCartItem,
        } = value
        return (
          <li className="cart-item">
            <div className="cart-dish-type-and-info-container">
              <div
                className={
                  dish.dish_type === 1 ? 'dish-type-non-veg' : 'dish-type-veg'
                }
              >
                <BsFillCircleFill
                  color={dish.dish_type === 1 ? 'red' : 'green'}
                />
              </div>
              <div className="cart-dish-info">
                <p className="cart-dish-name">{dish.dish_name}</p>
                <p className="cart-dish-name">{` ${dish.dish_currency} ${dish.dish_price}`}</p>
                {dish.dish_Availability && (
                  <div className="change-quantity-container">
                    <button
                      onClick={() => decrementCartItemQuantity(dish.dish_id)}
                      type="button"
                    >
                      <AiOutlineMinus size={10} />
                    </button>
                    <p>{dish.quantity}</p>
                    <button
                      onClick={() => incrementCartItemQuantity(dish.dish_id)}
                      type="button"
                    >
                      <GoPlus size={10} />
                    </button>
                  </div>
                )}
                <div className="total-price">
                  <p className="total-price-text">Total Price:</p>
                  <p className="total-amount">{` ${Math.round(
                    dish.dish_price * dish.quantity,
                  )} ${dish.dish_currency} `}</p>
                </div>
              </div>
            </div>
            <div className="cart-dish-remove-btn-and-img">
              <div className="dish-image">
                <img src={dish.dish_image} alt="dishImage" />
              </div>
              <button
                onClick={() => removeCartItem(dish.dish_id)}
                className="remove-btn"
                type="button"
              >
                Remove
              </button>
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}
export default CartItem
