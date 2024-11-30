import {useState} from 'react'

import './index.css'

const GenerateCitycard = props => {
  const {cityDetails, showSaveButton} = props

  const details = {
    locationName: cityDetails.location.name,
    conditionIcon: cityDetails.current.condition.icon,
    temperatureCel: cityDetails.current.temp_c,
    temperatureFer: cityDetails.current.temp_f,
    windSpeed: cityDetails.current.wind_kph,
    humidity: cityDetails.current.humidity,
  }
  const {
    locationName,
    conditionIcon,
    temperatureCel,
    temperatureFer,
    windSpeed,
    humidity,
  } = details

  let [temperature, onRequestChangeUnits] = useState(`${temperatureCel}'C`)

  const onChangeUnit = event => {
    if (event.target.value === 'cel') {
      temperature = onRequestChangeUnits(`${temperatureCel}'C`)
    } else {
      onRequestChangeUnits = onRequestChangeUnits(`${temperatureFer}'F`)
    }
  }

  const onSaveCity = () => {
    const savedCities = JSON.parse(localStorage.getItem('cityDetails'))
    const updatedCitiesList =
      savedCities === null ? cityDetails : [savedCities, cityDetails]
    localStorage.setItem('cityDetails', JSON.stringify(updatedCitiesList))
  }

  return (
    <div className="card-bg">
      <div className="image-tiggle-container">
        <img src={conditionIcon} alt="condition" className="icon" />
        <div>
          <input
            type="radio"
            id="cel"
            name="unit"
            value="cel"
            selected
            onChange={onChangeUnit}
          />
          <label htmlFor="cel">Cel</label>
          <input
            type="radio"
            id="Fer"
            value="Fer"
            name="unit"
            onChange={onChangeUnit}
          />
          <label htmlFor="Fer">Fer</label>
        </div>
      </div>
      <h1>{locationName}</h1>
      <p>Temperature : {temperature}</p>
      <p>Wind speed : {windSpeed} Kph</p>
      <p>Humidity : {humidity}</p>
      {showSaveButton && (
        <button type="button" onClick={onSaveCity} className="save-button">
          Save
        </button>
      )}
    </div>
  )
}

export default GenerateCitycard
