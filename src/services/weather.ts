import axios from 'axios'
import { isToday } from 'date-fns'
import { AemetCommonResponse, CityEndpointResponse, Dato, Dia, EstadoCielo, HourValue, PeriodoItem, Weather, WeatherFormated } from './weather.model'

/**
 * Get all cities from spain
 *
 * @export
 * @return {*}  {Promise<CityEndpointResponse[]>}
 */
export async function getCities (): Promise<CityEndpointResponse[]> {
  return await axios.get<CityEndpointResponse[]>('maestro/municipios')
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

/**
 * Get period from data from 00 to 24 hrs
 *
 * @param {PeriodoItem[]} data
 * @return {*}  {HourValue[]}
 */
function generatePeriod (data: PeriodoItem[]): HourValue[] {
  const getOnlyPrecipitaciones = ['00-06', '06-12', '12-18', '18-24']
  const probPrecipitaciones: HourValue[] = []
  data
    .filter(precipitacion => getOnlyPrecipitaciones.includes(precipitacion.periodo))
    .forEach(precipitacion => {
      if (getOnlyPrecipitaciones.includes(precipitacion.periodo)) {
        const hoursParts = precipitacion.periodo.split('-')
        const start = Number(hoursParts[0]) + 1
        const end = Number(hoursParts[1]) + 1
        for (let index = start; index < end; index++) {
          probPrecipitaciones.push({
            hour: index.toString().padStart(2, '0') === '24' ? '00' : index.toString().padStart(2, '0'),
            value: precipitacion.value
          })
        }
      }
    })

  return probPrecipitaciones
}

/**
 * Generate average temp between dates
 *
 * @param {Dato[]} data
 * @return {*}  {HourValue[]}
 */
function generateValuesBeteenwHours (data: Dato[]): HourValue[] {
  const result: HourValue[] = []
  data.unshift({ hora: 0, value: data[0].value })
  data.forEach((val, i) => {
    if (val.hora !== 24) {
      const nextTemp = (Math.abs(data[i + 1].value - val.value) / 6)
      for (let currentHour = val.hora; currentHour < data[i + 1].hora; currentHour++) {
        const calculateNextTempByHour = (nextTemp * (currentHour - val.hora))
        result.push({
          hour: currentHour.toString(),
          value: data[i + 1].value > val.value ? (val.value + calculateNextTempByHour) : (val.value - calculateNextTempByHour)
        })
      }
    } else {
      result.push({
        hour: '00',
        value: val.value
      })
    }
  })
  return result
}

/**
 * Get sky state
 *
 * @param {EstadoCielo[]} skys
 * @return {*}  {HourValue[]}
 */
function generateSkyState (skys: EstadoCielo[]): HourValue[] {
  const periodoSky = skys.map(sky => ({ periodo: sky.periodo, value: sky.value }))
  return generatePeriod(periodoSky)
}

/**
 * Get background based on current state sky and temp
 *
 * @export
 * @param {WeatherFormated} weather
 * @return {*}  {string}
 */
export function getBackgroundImage (weather: WeatherFormated): string {
  const currentHour = new Date().getHours()
  const currentHourString = new Date().getHours().toString().padStart(2, '0')
  const sunnyIds = ['11', '11n', '81', '82', '83']
  const cloudyIds = ['12', '12n', '14', '14n', '13n', '13', '17', '17n']
  const coverIds = ['15', '16']
  const rainIds = ['43', '43n', '44', '44n', '45', '46', '23', '23n', '24', '24n', '25', '26']
  const snowIds = ['71', '71n', '72', '72n', '73', '74', '33', '33n', '34', '34n', '35', '36']
  const electricalStormIds = ['51', '51n', '52', '52n', '53', '54', '61', '61n', '62', '62n', '63', '64']
  const currentSkyState = weather.estadoCielo.find(sky => sky.hour === currentHourString)?.value.toString()

  const isMorning = currentHour >= 7 && currentHour <= 10
  const isDay = currentHour >= 11 && currentHour <= 17
  const isEvening = currentHour >= 18 && currentHour <= 22
  if (currentSkyState === undefined) {
    // Default image
    return './day-sunny.jpg'
  }

  // is Rain
  if (currentSkyState !== undefined && rainIds.includes(currentSkyState)) {
    return './day-rain.png'
  } else if (currentSkyState !== undefined && electricalStormIds.includes(currentSkyState)) {
    // is electrical storm
    return './electrical-storm.jpg'
  } else if (currentSkyState !== undefined && snowIds.includes(currentSkyState)) {
    // is snow
    return './snow.jpg'
  } else if (currentSkyState !== undefined && cloudyIds.includes(currentSkyState)) {
    // is cloudy
    if (isMorning) {
      return './sunrise-cloudy.jpg'
    } else if (isDay) {
      return './day-cloudy.jpg'
    } else {
      return './sunset-cloudy.jpg'
    }
  } else if (currentSkyState !== undefined && sunnyIds.includes(currentSkyState)) {
    // is sunny
    return isMorning ? './sunrise-sunny.jpg'
      : isDay ? './day-sunny.jpg'
        : isEvening ? './sunset-sunny.jpg' : './night.jpg'
  } else if (currentSkyState !== undefined && coverIds.includes(currentSkyState)) {
    // is full cover
    return './cover.jpg'
  }

  return './day-sunny.jpg'
}

function mapWeatherResponse (weather: Dia, name: string, date: Date): WeatherFormated {
  return {
    name: name,
    date,
    probPrecipitaciones: generatePeriod(weather.probPrecipitacion),
    humedadMinMax: {
      max: weather.humedadRelativa.maxima,
      min: weather.humedadRelativa.minima
    },
    temperaturaMinMax: {
      max: weather.sensTermica.maxima,
      min: weather.sensTermica.minima
    },
    estadoCielo: generateSkyState(weather.estadoCielo),
    humedad: generateValuesBeteenwHours(weather.humedadRelativa.dato),
    temperatura: generateValuesBeteenwHours(weather.sensTermica.dato)
  }
}
