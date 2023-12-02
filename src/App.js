import {Component} from 'react'

import {Route, Switch, Redirect} from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import CartRoute from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'
import NotFound from './components/NotFound'
import Header from './components/Header'

import './App.css'

class App extends Component {
  state = {cartList: []}

  addCartItem = item => {
    const {cartList} = this.state
    const searchItem = cartList.filter(each => each.dish_id === item.dish_id)[0]
    if (searchItem === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, item]}))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachDish => {
          if (eachDish.dish_id === searchItem.dish_id) {
            return {
              ...eachDish,
              quantity: eachDish.quantity + item.quantity,
            }
          }
          return eachDish
        }),
      }))
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(eachDish => eachDish.dish_id !== id),
    }))
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachDish => {
        if (eachDish.dish_id === id) {
          return {
            ...eachDish,
            quantity: eachDish.quantity + 1,
          }
        }
        return eachDish
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachDish => {
        if (eachDish.dish_id === id && eachDish.quantity > 1) {
          return {
            ...eachDish,
            quantity: eachDish.quantity - 1,
          }
        }
        return eachDish
      }),
    }))
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          removeAllCartItems: this.removeAllCartItems,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <>
          <Header />
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/cart" component={CartRoute} />
            <Route exact path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </>
      </CartContext.Provider>
    )
  }
}

export default App
