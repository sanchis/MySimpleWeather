import axios from 'axios'
import { MunicipiosContextProvider } from 'context/municipios'
import { MunicipiosGuardadosContextProvider } from 'context/municipiosGuardados'
import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './views/App'

axios.defaults.baseURL = import.meta.env.VITE_ApiBaseUrl
axios.defaults.headers.api_key = import.meta.env.VITE_ApiKey

ReactDOM.render(
  <React.StrictMode>

    <MunicipiosContextProvider>
      <MunicipiosGuardadosContextProvider>
        <App />
      </MunicipiosGuardadosContextProvider>
    </MunicipiosContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
