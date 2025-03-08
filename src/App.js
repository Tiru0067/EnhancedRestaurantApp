import {Route, Switch} from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import MenuItemsList from './components/MenuItemsList'
import Cart from './components/Cart'
import {CartProvider} from './context/CartContext'
import {DataProvider} from './context/DataContext'

const App = () => (
  <DataProvider>
    <CartProvider>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={MenuItemsList} />
        <ProtectedRoute exact path="/cart" component={Cart} />
      </Switch>
    </CartProvider>
  </DataProvider>
)

export default App
