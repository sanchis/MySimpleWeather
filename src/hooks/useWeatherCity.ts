import { useEffect, useState } from 'react'
import { getWeatherCity } from 'services/weather'
import { Weather } from 'services/weather.model'
import { useCities } from './useCities'

interface HookModel{
  weather: Weather | undefined
  loading: boolean
}

export function useWeatherCity (id: string): HookModel {
  const { cities: municipios, findCity: findMunicipio } = useCities()
  const [loading, setLoading] = useState<boolean>(false)
  const [weather, setWeather] = useState<Weather>()

  useEffect(() => {
    const currentWeather = findMunicipio(id)
    if (currentWeather === undefined) {
      return
    }

    setLoading(true)
    getWeatherCity(currentWeather.id_old)
      .then(data => setWeather(data))
      .finally(() => setLoading(false))
  }, [id, municipios])

  return {
    weather,
    loading
  }
}
