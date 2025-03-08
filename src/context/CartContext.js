import {createContext, useState, useContext} from 'react'
import DataContext from './DataContext'

const CartContext = createContext()

export const CartProvider = ({children}) => {
  const {apidata, activeMenuId} = useContext(DataContext)
  const [cartList, setCartList] = useState([])

  const updateCart = (dishId, quantityChange) => {
    setCartList(prevCartList => {
      const existingItem = prevCartList.find(item => item.dishId === dishId)
      if (existingItem) {
        const updatedCart = prevCartList.map(item =>
          item.dishId === dishId
            ? {...item, quantity: item.quantity + quantityChange}
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
          {dishId, ...menuItem, quantity: 1, categoryId: activeMenuId},
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
        {dishId, ...menuItem, quantity, categoryId: activeMenuId},
      ]
    })
  }

  const removeAllCartItems = () => setCartList([])
  const removeCartItem = id =>
    setCartList(prevCartList =>
      prevCartList.filter(item => item.dish_id !== id),
    )

  return (
    <CartContext.Provider
      value={{
        cartList,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        addCartItem,
        removeAllCartItems,
        removeCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
