import {useState, useEffect} from 'react'
import {Route, Switch} from 'react-router-dom'

import './App.css'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import MenuItemsList from './components/MenuItemsList'
import Cart from './components/Cart'
import CartContext from './context/CartContext'

const App = () => {
  const [apidata, setApidata] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeMenuId, setActiveMenuId] = useState('11')
  const [cartList, setCartList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
        const response = await fetch(url)
        const data = await response.json()
        setApidata(data[0])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // update cart
  const updateCart = (dishId, quantityChange) => {
    setCartList(prevCartList => {
      const existingItem = prevCartList.find(item => item.dishId === dishId)
      if (existingItem) {
        const updatedCart = prevCartList.map(item =>
          item.dishId === dishId
            ? {
                ...item,
                quantity: item.quantity + quantityChange,
              }
            : item,
        )
        return updatedCart.filter(item => item.quantity > 0)
      }
      if (quantityChange > 0) {
        const menuItem = apidata?.table_menu_list
          .find(item => item.menu_category_id === activeMenuId)
          .category_dishes.find(item => item.dish_id === dishId)
        return [
          ...prevCartList,
          {
            dishId,
            ...menuItem,
            quantity: 1,
            categoryId: activeMenuId,
          },
        ]
      }
      return prevCartList
    })
  }

  const incrementCartItemQuantity = dishId => updateCart(dishId, 1)
  const decrementCartItemQuantity = dishId => updateCart(dishId, -1)

  const addCartItem = (dishId, quantity) => {
    setCartList(prevCartList => {
      const existingItem = prevCartList.find(item => item.dishId === dishId)

      if (existingItem) {
        return prevCartList.map(item =>
          item.dishId === dishId ? {...item, quantity} : item,
        )
      }

      const menuItem = apidata?.table_menu_list
        .find(item => item.menu_category_id === activeMenuId)
        .category_dishes.find(item => item.dish_id === dishId)

      return [
        ...prevCartList,
        {
          dishId,
          ...menuItem,
          quantity,
          categoryId: activeMenuId,
        },
      ]
    })
  }

  const removeAllCartItems = () => {
    setCartList([])
  }

  const removeCartItem = id => {
    const updatedCart = cartList.filter(item => item.dish_id !== id)
    setCartList(updatedCart)
  }

  return (
    <CartContext.Provider
      value={{
        apidata,
        loading,
        cartList,
        setCartList,
        activeMenuId,
        setActiveMenuId,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        addCartItem,
        removeAllCartItems,
        removeCartItem,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={MenuItemsList} />
        <ProtectedRoute exact path="/cart" component={Cart} />
      </Switch>
    </CartContext.Provider>
  )
}

export default App
