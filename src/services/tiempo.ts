import axios from 'axios'
import { MunicipiosEndpointResponse, Tiempo } from './tiempo.model'

export async function getMunicipios (): Promise<MunicipiosEndpointResponse[]> {
  return await axios.get<MunicipiosEndpointResponse[]>('maestro/municipios')
    .then(response => response.data)
}

export async function getTiempoMunicipio (codigoProvincia: string, codigoMunicipio: string): Promise<Tiempo> {
  return await axios.get<Tiempo>(`provincias/${codigoProvincia}/municipios/${codigoMunicipio}`)
    .then(response => response.data)
}
