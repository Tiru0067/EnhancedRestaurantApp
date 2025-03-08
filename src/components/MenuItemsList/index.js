import {useContext, useEffect, useState} from 'react'

import './index.css'
import Header from '../Header'
import Navbar from '../Navbar'
import MenuItem from '../MenuItem'
import DataContext from '../../context/DataContext'

const MenuItemsList = () => {
  const {loading, apidata, activeMenuId} = useContext(DataContext)
  const [dishes, setDishes] = useState([])

  useEffect(() => {
    if (apidata?.table_menu_list) {
      const filteredDishes = apidata.table_menu_list.filter(
        item => item.menu_category_id === activeMenuId,
      )
      setDishes(filteredDishes[0]?.category_dishes || [])
    }
  }, [apidata, activeMenuId])

  return (
    <>
      <Header />
      <Navbar />
      <main className="dishes">
        {!loading && (
          <ul className="dishes-list">
            {dishes.length > 0 &&
              dishes.map((item, index) => (
                <MenuItem key={item.dish_id} dish={item} index={index} />
              ))}
          </ul>
        )}
      </main>
    </>
  )
}
export default MenuItemsList
