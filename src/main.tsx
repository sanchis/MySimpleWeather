import axios from 'axios'
import { CitiesContextProvider } from 'context/cities'
import { SavedCitiesContextProvider } from 'context/citiesSaved'
import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './views/App'

axios.defaults.baseURL = import.meta.env.VITE_ApiBaseUrl
axios.defaults.params = {
  api_key: import.meta.env.VITE_ApiKey
}

ReactDOM.render(
  <React.StrictMode>

    <CitiesContextProvider>
      <SavedCitiesContextProvider>
        <App />
      </SavedCitiesContextProvider>
    </CitiesContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
