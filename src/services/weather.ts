import axios from 'axios'
import { AemetCommonResponse, CityEndpointResponse, Weather } from './weather.model'

export async function getCities (): Promise<CityEndpointResponse[]> {
  return await axios.get<CityEndpointResponse[]>('maestro/municipios')
    .then(response => response.data)
}

export async function getWeatherCity (cityId: string): Promise<Weather> {
  return await axios.get<AemetCommonResponse>(`prediccion/especifica/municipio/diaria/${cityId}`)
    .then(response => response.data)
    .then(async ({ datos }) => await axios.get<Weather[]>(datos))
    .then((response) => response.data[0])
}
