import './styles/LocationCard.css'

const LocationCard = ({ location }) => {
  return (
    <article>
      <h2 className='location__title'>{location?.name}</h2>
      <ul className="location__resident">
        <li className='location__item'><span>Type:</span><span>{location?.type}</span></li>
        <li className='location__item'><span>Dimension:</span><span>{location?.dimension}</span></li>
        <li className='location__item'><span>Population:</span><span>{location?.residents.length}</span></li>
        
      </ul>
    </article>
  )
}

export default LocationCard