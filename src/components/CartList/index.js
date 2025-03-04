import CartListItem from '../CartListItem'

const CartList = ({cartList}) => (
  <ul className="cart-items-list">
    {cartList?.map(item =>
      // prettier-ignore
      <CartListItem key={item.dishId} listItem={item} />,
    )}
  </ul>
)
export default CartList
