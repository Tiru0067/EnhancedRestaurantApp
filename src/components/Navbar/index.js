import {useContext, useState, useEffect} from 'react'
import './index.css'
import DataContext from '../../context/DataContext'

const Navbar = () => {
  const {loading, apidata, activeMenuId, setActiveMenuId} =
    useContext(DataContext) // prettier-ignore

  const [menuList, setMenuList] = useState([])

  useEffect(() => {
    if (apidata?.table_menu_list) {
      const formattedMenuList = apidata.table_menu_list.map(item => ({
        menuCategory: item.menu_category,
        menuCategoryId: item.menu_category_id,
      }))
      setMenuList(formattedMenuList)
    }
  }, [apidata])

  return (
    <nav>
      {!loading && (
        <ul className="nav-list">
          {menuList.length > 0 &&
            menuList.map(item => (
              <li
                className={
                  activeMenuId === item.menuCategoryId
                    ? 'nav-list-item active'
                    : 'nav-list-item'
                }
                key={item.menuCategoryId}
                value={item.menuCategoryId}
              >
                <button
                  type="button"
                  onClick={() => setActiveMenuId(item.menuCategoryId)}
                >
                  {item.menuCategory}
                </button>
              </li>
            ))}
        </ul>
      )}
    </nav>
  )
}

export default Navbar
