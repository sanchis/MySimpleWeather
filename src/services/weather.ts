import axios from 'axios'
import { isToday } from 'date-fns'
import { AemetCommonResponse, CityEndpointResponse, Weather, WeatherFormated, RootCityResponse } from './weather.model'
import { mapWeatherResponse } from './weather.utils'

/**
 * Get all cities from spain
 *
 * @export
 * @return {*}  {Promise<CityEndpointResponse[]>}
 */
export async function getCities (): Promise<CityEndpointResponse[]> {
  const response = await axios.get<RootCityResponse>('maestro/municipios')
    .then(response => response.data)

  return await axios.get<CityEndpointResponse[]>(response.datos)
    .then(response => response.data)
}

/**
 * Get current weather for a specific city
 *
 * @export
 * @param {string} cityId
 * @return {*}  {Promise<WeatherFormated>}
 */
export async function getWeatherCity (cityId: string): Promise<WeatherFormated> {
  return await axios.get<AemetCommonResponse>(`prediccion/especifica/municipio/diaria/${cityId.replace('id', '')}`)
    .then(response => response.data)
    .then(data => {
      if (data.estado !== 200) {
        throw new Error(data.descripcion)
      }
      return data
    })
    .then(async ({ datos }) => await axios.get<Weather[]>(datos))
    .then((response) => ({
      /** Get the current day for the predictions */
      data: response.data[0].prediccion.dia.find(data => isToday(new Date(data.fecha))),
      name: response.data[0].nombre,
      date: response.data[0].prediccion.dia.find(data => isToday(new Date(data.fecha)))?.fecha
    })
    )
    .then(response => {
      /** Map the current data to format for the view */
      if (response?.data !== undefined && response?.date !== undefined) {
        return mapWeatherResponse(response.data, response.name, new Date(response?.date))
      } else {
        throw new Error('No data found')
      }
    })
}
