import {useContext, useState, useEffect} from 'react'
import {BsFillCircleFill} from 'react-icons/bs'
import CartContext from '../../context/CartContext'
import './index.css'

const MenuItem = ({dish, index}) => {
  const {cartList, addCartItem} = useContext(CartContext)
  const [quantity, setQuantity] = useState(0)

  const {
    dish_id: dishId,
    dish_name: dishName,
    dish_price: dishPrice,
    dish_description: dishDescription,
    dish_currency: dishCurrency,
    dish_calories: dishCalories,
    dish_image: dishImage,
    dish_Availability: dishAvailability,
    addonCat,
  } = dish

  const circleColor = index % 2 === 0 ? 'green' : 'red'

  useEffect(() => {
    const currentQuantity =
      cartList?.find(obj => obj.dishId === dishId)?.quantity || 0
    setQuantity(currentQuantity)
  }, [cartList, dishId])

  const handleIncrease = () => setQuantity(prev => prev + 1)
  const handleDecrease = () => setQuantity(prev => (prev > 0 ? prev - 1 : 0))

  return (
    <li className="dish-item">
      <div className="dish-item-content">
        <div className="dish-icon-container" style={{borderColor: circleColor}}>
          <BsFillCircleFill
            className="dish-icon"
            style={{color: circleColor}}
          />
        </div>

        <div className="dish-info-wrapper">
          <div className="dish-info">
            <h1 className="dish-name">{dishName}</h1>
            <p className="dish-price">
              {dishCurrency} {dishPrice}
            </p>
            <p className="dish-description">{dishDescription}</p>
          </div>

          {dishAvailability ? (
            <>
              <div className="add-to-cart-container">
                <div className="quantity-container">
                  <button
                    type="button"
                    onClick={handleDecrease}
                    className="quantity-button decrease"
                  >
                    -
                  </button>
                  <p className="quantity">{quantity}</p>
                  <button
                    type="button"
                    onClick={handleIncrease}
                    className="quantity-button increase"
                  >
                    +
                  </button>
                </div>
                {quantity > 0 && (
                  <button
                    type="button"
                    className="add-to-cart-button"
                    onClick={() => addCartItem(dishId, quantity)}
                  >
                    ADD TO CART
                  </button>
                )}
              </div>
              {addonCat.length > 0 && (
                <p className="customization-text">Customizations available</p>
              )}
            </>
          ) : (
            <p className="not-available-text">Not available</p>
          )}
        </div>
      </div>
      <p className="dish-calories">{dishCalories} Calories</p>
      <img className="dish-image" src={dishImage} alt={dishName} />
    </li>
  )
}

export default MenuItem
