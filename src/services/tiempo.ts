import axios from 'axios'
import { MunicipiosEndpointResponse, Tiempo } from './tiempo.model'

export async function getMunicipios (): Promise<MunicipiosEndpointResponse[]> {
  return await axios.get<MunicipiosEndpointResponse[]>('maestro/municipios')
    .then(response => response.data)
    .then(data => data.map((municipio) => ({ ...municipio, CODIGOINE: municipio.CODIGOINE.substr(0, 5) })))
}

export async function getTiempoMunicipio (codigoProvincia: string, codigoMunicipio: string): Promise<Tiempo> {
  return await axios.get<Tiempo>(`provincias/${codigoProvincia}/municipios/${codigoMunicipio}`)
    .then(response => response.data)
}
