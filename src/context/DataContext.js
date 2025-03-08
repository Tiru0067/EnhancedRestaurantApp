import {createContext, useState, useEffect} from 'react'

const DataContext = createContext()

export const DataProvider = ({children}) => {
  const [apidata, setApidata] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeMenuId, setActiveMenuId] = useState('11')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
        const response = await fetch(url)
        const data = await response.json()
        setApidata(data[0])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <DataContext.Provider
      value={{apidata, loading, activeMenuId, setActiveMenuId}}
    >
      {children}
    </DataContext.Provider>
  )
}

export default DataContext
