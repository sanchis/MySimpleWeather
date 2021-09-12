export interface Tiempo {
  municipio: Municipio
  fecha: string
  stateSky: StateSky
  temperatura_actual: string
  temperaturas: Temperaturas
  humedad: string
  viento: string
  lluvia: string
  imagen?: any
  pronostico: Pronostico
  proximos_dias: Proximosdia[]
  breadcrumb: Breadcrumb[]
  keywords: string
}

interface Breadcrumb {
  name: string
  url: string
  title: string
}

export interface MunicipiosEndpointResponse{
  CODIGOINE: string
  ID_REL: string
  COD_GEO: string
  CODPROV: string
  NOMBRE_PROVINCIA: string
  NOMBRE: string
  POBLACION_MUNI: number
  SUPERFICIE: number
  PERIMETRO: number
  CODIGOINE_CAPITAL: string
  NOMBRE_CAPITAL: string
  POBLACION_CAPITAL: string
  HOJA_MTN25: string
  LONGITUD_ETRS89_REGCAN95: number
  LATITUD_ETRS89_REGCAN95: number
  ORIGEN_COORD: string
  ALTITUD: number
  ORIGEN_ALTITUD: string
  DISCREPANTE_INE: number
}

interface Proximosdia {
  '@attributes': Attributes3
  prob_precipitacion: string[] | string
  cota_nieve_prov: Cotanieveprov[] | any
  estado_cielo: string[] | string
  viento: Viento2 | Viento[]
  racha_max: Cotanieveprov[] | any
  temperatura: Temperatura
  sens_termica: Temperatura
  humedad_relativa: Temperatura
  uv_max?: string
}

interface Temperatura {
  maxima: string
  minima: string
  dato?: string[]
}

interface Viento2 {
  direccion: string
  velocidad: string
}

interface Cotanieveprov {
  '@attributes': Attributes2
}

interface Attributes3 {
  fecha: string
}

interface Pronostico {
  hoy: Hoy
  manana: Hoy
}

interface Hoy {
  '@attributes': Attributes
  estado_cielo: string[]
  precipitacion: string[]
  prob_precipitacion: string[]
  prob_tormenta: string[]
  nieve: string[]
  prob_nieve: string[]
  temperatura: string[]
  sens_termica: string[]
  humedad_relativa: string[]
  viento: Viento[]
  racha_max: string[]
}

interface Viento {
  '@attributes': Attributes2
  direccion: string
  velocidad: string
}

interface Attributes2 {
  periodo: string
}

interface Attributes {
  fecha: string
  orto: string
  ocaso: string
}

interface Temperaturas {
  max: string
  min: string
}

interface StateSky {
  description: string
  id: string
}

interface Municipio {
  CODIGOINE: string
  ID_REL: string
  COD_GEO: string
  CODPROV: string
  NOMBRE_PROVINCIA: string
  NOMBRE: string
  POBLACION_MUNI: number
  SUPERFICIE: number
  PERIMETRO: number
  CODIGOINE_CAPITAL: string
  NOMBRE_CAPITAL: string
  POBLACION_CAPITAL: string
  HOJA_MTN25: string
  LONGITUD_ETRS89_REGCAN95: number
  LATITUD_ETRS89_REGCAN95: number
  ORIGEN_COORD: string
  ALTITUD: number
  ORIGEN_ALTITUD: string
  DISCREPANTE_INE: number
}
