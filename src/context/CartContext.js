import {createContext} from 'react'

const CartContext = createContext({
  apidata: [],
  loading: true,
  cartList: [],
  setCartList: () => {},
  activeMenuId: '11',
  setActiveMenuId: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  addCartItem: () => {},
  removeAllCartItems: () => {},
})

export default CartContext
