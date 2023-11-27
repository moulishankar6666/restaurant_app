import {Component} from 'react'

import Loader from 'react-loader-spinner'

import DishItem from '../DishItem'
import Header from '../Header'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    menuDetails: {},
    activeMenuCategory: '',
    status: apiStatus.initial,
  }

  componentDidMount() {
    this.getMenu()
  }

  convertCategoryDishes = dish => ({
    ...dish,
    quantity: 0,
  })

  convertTableMenuList = menu => ({
    ...menu,
    category_dishes: menu.category_dishes.map(dish =>
      this.convertCategoryDishes(dish),
    ),
  })

  convertData = data => ({
    ...data,
    table_menu_list: data.table_menu_list.map(menu =>
      this.convertTableMenuList(menu),
    ),
    tableName: data.table_name,
  })

  getMenu = async () => {
    this.setState({status: apiStatus.progress})
    const options = {method: 'GET'}
    const response = await fetch(
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc',
      options,
    )
    const data = await response.json()
    const updatedData = this.convertData(data[0])

    this.setState({
      menuDetails: updatedData,
      activeMenuCategory: updatedData.table_menu_list[0].menu_category,
      status: apiStatus.success,
    })
  }

  changeCartCount = (res, id) => {
    this.setState(prevState => ({
      menuDetails: {
        ...prevState.menuDetails,
        table_menu_list: prevState.menuDetails.table_menu_list.map(each => ({
          ...each,
          category_dishes: each.category_dishes.map(eachDish => {
            if (eachDish.dish_id === id && res === '+') {
              return {
                ...eachDish,
                quantity: eachDish.quantity + 1,
              }
            }
            if (
              eachDish.dish_id === id &&
              res !== '+' &&
              eachDish.quantity > 0
            ) {
              return {
                ...eachDish,
                quantity: eachDish.quantity - 1,
              }
            }
            return eachDish
          }),
        })),
      },
    }))
  }

  setActiveTab = categoryName => {
    this.setState({
      activeMenuCategory: categoryName,
    })
  }

  tabsList = category => {
    const {activeMenuCategory} = this.state
    return (
      <li
        className={
          activeMenuCategory === category.menu_category ? 'active-tab' : null
        }
        key={category.menu_category_id}
      >
        <button
          className={
            activeMenuCategory === category.menu_category ? 'active-tab' : null
          }
          onClick={() => this.setActiveTab(category.menu_category)}
          type="button"
        >
          {category.menu_category}
        </button>
      </li>
    )
  }

  onSuccessView = () => {
    const {menuDetails, activeMenuCategory} = this.state
    const filteredData = menuDetails.table_menu_list.filter(
      eachMenu => activeMenuCategory === eachMenu.menu_category,
    )
    const dishesList = filteredData[0].category_dishes
    return (
      <>
        <nav>
          <ul>
            {menuDetails.table_menu_list.map(category =>
              this.tabsList(category),
            )}
          </ul>
        </nav>
        <section>
          <ul>
            {dishesList.map(eachDish => (
              <DishItem
                key={eachDish.dish_id}
                changeItemQuantity={this.changeCartCount}
                dish={eachDish}
              />
            ))}
          </ul>
        </section>
      </>
    )
  }

  onProgressView = () => (
    <div className="loader">
      <Loader color="#000" type="ThreeDots" height={50} width={50} />
    </div>
  )

  renderStatus = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.success:
        return this.onSuccessView()
      case apiStatus.progress:
        return this.onProgressView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="Restaurant-home-page">
        <Header />
        {this.renderStatus()}
      </div>
    )
  }
}
export default Home
