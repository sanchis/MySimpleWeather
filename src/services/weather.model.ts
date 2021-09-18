
export interface CityEndpointResponse {
  latitud: string
  id_old: string
  url: string
  latitud_dec: string
  altitud: string
  capital: string
  num_hab: string
  zona_comarcal: string
  destacada: string
  nombre: string
  longitud_dec: string
  id: string
  longitud: string
}

export interface WeatherFormated{
  name: string
  date: Date
  probPrecipitaciones: HourValue[]
  estadoCielo: SkyState[]
  temperatura: HourValue[]
  temperaturaMinMax: MinMaxValue
  humedad: HourValue[]
  humedadMinMax: MinMaxValue

}

interface SkyState extends HourValue{
  descripcion?: string
}

export interface HourValue {
  hour: String
  value: number
}

interface MinMaxValue {
  min: Number
  max: Number
}

export interface AemetCommonResponse{
  descripcion: string
  estado: number
  datos: string
  metadatos: string
}

export interface Weather {
  origen: Origen
  elaborado: string
  nombre: string
  provincia: string
  prediccion: Prediccion
  id: number
  version: number
}

interface Prediccion {
  dia: Dia[]
}

export interface Dia {
  probPrecipitacion: ProbPrecipitacion[]
  cotaNieveProv: CotaNieveProv[]
  estadoCielo: EstadoCielo[]
  viento: Viento[]
  rachaMax: CotaNieveProv[]
  temperatura: Temperatura
  sensTermica: Temperatura
  humedadRelativa: Temperatura
  uvMax?: number
  fecha: string
}

export interface Temperatura {
  maxima: number
  minima: number
  dato: Dato[]
}

export interface Dato {
  value: number
  hora: number
}

interface Viento {
  direccion: string
  velocidad: number
  periodo?: string
}

export interface EstadoCielo {
  value: string
  periodo: string
  descripcion: string
}

interface CotaNieveProv {
  value: string
  periodo?: string
}

export interface ProbPrecipitacion {
  value: number
  periodo: string
}

export interface PeriodoItem{
  value: any
  periodo: string
}

interface Origen {
  productor: string
  web: string
  enlace: string
  language: string
  copyright: string
  notaLegal: string
}
