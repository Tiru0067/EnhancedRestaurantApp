import {useContext, useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import Cookie from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'

import './index.css'
import CartContext from '../../context/CartContext'

const Header = () => {
  const {loading, cartList, apidata, activeMenuId} = useContext(CartContext)
  const [cartAmount, setCartAmount] = useState(0)

  const history = useHistory()

  useEffect(() => {
    // const totalItemsQuantity = cartList.reduce((sum, obj) => sum + obj.quantity, 0)
    const totalItemsQuantity = cartList.length
    setCartAmount(totalItemsQuantity)
  }, [cartList, activeMenuId])

  const onLogout = () => {
    Cookie.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header">
      {!loading && (
        <Link to="/" className="app-title-link">
          <h1 className="app-title">{apidata.restaurant_name}</h1>
        </Link>
      )}
      <div className="cart-container">
        {!loading && <p className="myorders-text">My Orders</p>}
        <div className="cart-icon-container">
          {!loading && (
            <div className="cart-count-container">
              <p className="cart-items-count">{cartAmount}</p>
            </div>
          )}
          <Link to="/cart">
            <button type="button" className="cart-btn" data-testid="cart">
              <AiOutlineShoppingCart className="cart-icon" />
            </button>
          </Link>
        </div>
        <button type="button" className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Header
