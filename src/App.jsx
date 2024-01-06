import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import getRandomNumber from './utils/getRandomNumber'
import LocationCard from './components/LocationCard'
import ResidentCard from './components/ResidentCard'

function App() {
  const locationId = getRandomNumber(126)
  const [inputValue, setInputValue] = useState(locationId)
  const [isValidInput, setIsValidInput] = useState(true)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const url = `https://rickandmortyapi.com/api/location/${inputValue}?page=${currentPage}`;
  const [location, getLocation, hasError] = useFetch(url)

  useEffect(() => {
    if (isValidInput) {
      getLocation()
    }
  }, [inputValue, isValidInput, getLocation, currentPage])

  const inputLocation = useRef()

  const handleSubmit = e => {
    e.preventDefault()
    const inputNumber = parseInt(inputLocation.current.value, 10)

    if (isNaN(inputNumber) || inputNumber < 1 || inputNumber > 126) {
      setIsValidInput(false)
    } else {
      setIsValidInput(true)
      setCurrentPage(1); // Resetear a la primera página al realizar una nueva búsqueda
      setInputValue(inputNumber)
    }
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div className="app-container">
      <span className='app-title'></span> 
      <form className="app-form" onSubmit={handleSubmit}>
        <input className='resident__inputSearch' ref={inputLocation} type="text" />
        <button className='resident__buttonSearch'>Search</button>
      </form>
      {
        !isValidInput
      
          ? <>
          <div className='resident__not__image'></div>
          <h2 className='resident__not'>Hey! You must provide an id from 1 to 126</h2>
        </>
          
          : (
            <>
              <LocationCard
                location={location}
              />
              <div className='resident__container'>
                {
                  location?.residents.slice(startIndex, endIndex).map(url => (
                    <ResidentCard
                      key={url}
                      url={url}
                    />
                  ))
                }
              </div>
              <div className="pagination">
                {Array.from({ length: Math.ceil(location?.residents.length / itemsPerPage) }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={currentPage === index + 1 ? 'active' : ''}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </>
          )
      }
    </div>
  )
}

export default App
