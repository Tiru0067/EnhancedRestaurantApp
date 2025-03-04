import {useContext} from 'react'
import {IoTrashOutline} from 'react-icons/io5'

import CartContext from '../../context/CartContext'
import './index.css'

const CartListItem = ({listItem}) => {
  // prettier-ignore
  const {incrementCartItemQuantity, decrementCartItemQuantity, removeCartItem} =
    useContext(CartContext)

  const handleIncreaseQuantity = () => {
    incrementCartItemQuantity(listItem.dishId, 1)
  }

  const handleDecreaseQuantity = () => {
    if (listItem.quantity > 0) {
      decrementCartItemQuantity(listItem.dishId)
    }
  }

  return (
    <li className="cart-item">
      <div className="cart-item-details">
        <img
          src={listItem.dish_image}
          alt={listItem.dish_name}
          className="cart-item-image"
        />
        <h1 className="cart-item-name">{listItem.dish_name}</h1>
      </div>
      <div className="cart-item-actions-container">
        <div className="cart-item-actions">
          <div className="cart-item-quantity">
            <button
              type="button"
              onClick={handleDecreaseQuantity}
              className="cart-quantity-btn decrease"
            >
              -
            </button>
            <p className="cart-quantity">{listItem.quantity}</p>
            <button
              type="button"
              onClick={handleIncreaseQuantity}
              className="cart-quantity-btn increase"
            >
              +
            </button>
          </div>
          <button
            type="button"
            className="remove-btn"
            onClick={() => removeCartItem(listItem.dishId)}
          >
            <IoTrashOutline /> Remove
          </button>
        </div>
        <p className="cart-item-price">{listItem.dish_price}</p>
      </div>
    </li>
  )
}
export default CartListItem
