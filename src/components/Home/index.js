import {Component} from 'react'
import {FaSearch} from 'react-icons/fa'

import GenerateCitycard from '../GenerateCitycard'

import './index.css'

class Home extends Component {
  state = {
    inputCity: '',
    errorMsg: '',
    fetchSucess: false,
    cityDetails: '',
    cityDetailsList: [],
    getCityList: false,
  }

  onFetchSucess = data => {
    this.setState({fetchSucess: true, cityDetails: data})
  }

  requestCityData = async cityName => {
    const url = ` https://api.weatherapi.com/v1/current.json?key=f04889c875844c2dbf544245243011&q=${cityName}&units=metric`
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) {
      this.onFetchSucess(data)
    } else {
      this.setState({errorMsg: data.error.message})
    }
  }

  onChangeInput = event => {
    this.setState({inputCity: event.target.value})
  }

  onSearchCity = () => {
    const {inputCity} = this.state
    if (inputCity === '') {
      this.setState({errorMsg: 'Please enter city name'})
    } else {
      this.requestCityData(inputCity)
    }
  }

  getSavedCityData = () => {
    const savedCities = JSON.parse(localStorage.getItem('cityDetails'))
    this.setState({cityDetailsList: savedCities, getCityList: true})
  }

  render() {
    const {
      errorMsg,
      fetchSucess,
      cityDetails,
      cityDetailsList,
      getCityList,
    } = this.state

    const errorMsgGenerated = errorMsg !== ''
    return (
      <div className="bg-container">
        <h1>Weather Dashboard</h1>
        <div className="input-container">
          <input
            type="text"
            className="input-field"
            onChange={this.onChangeInput}
          />
          <FaSearch size={25} onClick={this.onSearchCity} />
        </div>
        <button
          type="button"
          onClick={this.getSavedCityData}
          className="button"
        >
          get data
        </button>
        {getCityList &&
          cityDetailsList.map(eachCity => (
            <ul className="current-card list-container">
              <GenerateCitycard cityDetails={eachCity} showSaveButton={false} />
            </ul>
          ))}
        {fetchSucess && (
          <div className="current-card">
            <GenerateCitycard cityDetails={cityDetails} showSaveButton />
          </div>
        )}
        {errorMsgGenerated && <p className="error-mesg">*{errorMsg}</p>}
      </div>
    )
  }
}

export default Home
