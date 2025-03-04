import {useContext} from 'react'

import CartContext from '../../context/CartContext'
import Header from '../Header'
import CartList from '../CartList'

import './index.css'

const Cart = () => {
  const {cartList, removeAllCartItems, loading} = useContext(CartContext)

  const subTotal = cartList.reduce(
    (acc, item) => acc + item.dish_price * item.quantity,
    0,
  )
  const discount = 0
  const grandTotal = subTotal - discount

  return (
    <>
      <Header />
      {!loading && (
        <div className="cart-wrapper">
          {/* Container for cart items */}
          <div className="cart-items-container">
            <div className="cart-header">
              <h1 className="cart-title">Cart</h1>
              <button
                className="clear-cart-btn"
                type="button"
                onClick={removeAllCartItems}
              >
                Remove All
              </button>
            </div>
            <div className="cart-columns">
              <span className="cart-column-product">PRODUCT</span>
              <span className="cart-column-quantity">QUANTITY</span>
              <span className="cart-column-price">PRICE</span>
            </div>
            {!loading && cartList.length > 0 ? (
              <CartList cartList={cartList} />
            ) : (
              <div className="empty-cart">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                  alt="empty cart"
                />
              </div>
            )}
          </div>

          {/* Container for cart total and additional details */}
          {!loading && (
            <div className="cart-summary-container">
              <div className="cart-summary-item">
                <span className="cart-label">Subtotal</span>
                <span className="cart-value">{subTotal}</span>
              </div>
              <div className="cart-summary-item">
                <span className="cart-label">Discount</span>
                <span className="cart-value">{discount}</span>
              </div>
              <div className="cart-summary-item">
                <span className="cart-label">Grand Total</span>
                <span className="cart-value">{grandTotal}</span>
              </div>
              <button type="button" className="checkout-button">
                Checkout Now
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}
export default Cart
