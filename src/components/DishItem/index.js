import {BsFillCircleFill} from 'react-icons/bs'

import './index.css'
import CartContext from '../../context/CartContext'

const DishItem = props => {
  const {dish, changeItemQuantity} = props

  return (
    <CartContext.Consumer>
      {value => {
        const {addCartItem} = value
        return (
          <li className="dish-item">
            <div className="dish-type-and-info">
              <div
                className={
                  dish.dish_type === 1 ? 'dish-type-non-veg' : 'dish-type-veg'
                }
              >
                <BsFillCircleFill
                  color={dish.dish_type === 1 ? 'red' : 'green'}
                />
              </div>
              <div className="dish-info">
                <p className="dish-name">{dish.dish_name}</p>
                <p className="dish-name">{`${dish.dish_currency} ${dish.dish_price}`}</p>
                <p className="dish-description">{dish.dish_description}</p>
                {dish.dish_Availability ? (
                  <div className="available">
                    <button
                      onClick={() => changeItemQuantity('-', dish.dish_id)}
                      type="button"
                    >
                      -
                    </button>
                    <p>{dish.quantity}</p>
                    <button
                      onClick={() => changeItemQuantity('+', dish.dish_id)}
                      type="button"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <p className="not-available">Not available</p>
                )}
                {dish.addonCat.length > 0 && (
                  <p className="customization-available">
                    Customizations available
                  </p>
                )}
                {dish.dish_Availability && dish.quantity > 0 && (
                  <button
                    onClick={() => addCartItem(dish)}
                    className="add-to-cart-btn"
                    type="button"
                  >
                    ADD TO CART
                  </button>
                )}
              </div>
            </div>
            <div className="dish-calories-and-img">
              <div className="dish-calories">
                {dish.dish_calories} calories{' '}
              </div>
              <div className="dish-image">
                <img src={dish.dish_image} alt="dishImage" />
              </div>
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}
export default DishItem
