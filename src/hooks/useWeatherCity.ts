import { useEffect, useState } from 'react'
import { getWeatherCity } from 'services/weather'
import { WeatherFormated } from 'services/weather.model'

interface HookModel{
  weather: WeatherFormated | undefined
  loading: boolean
}

export function useWeatherCity (id?: string): HookModel {
  const [loading, setLoading] = useState<boolean>(false)
  const [weather, setWeather] = useState<WeatherFormated>()

  useEffect(() => {
    if (id === null || id === undefined) {
      return
    }

    setLoading(true)
    getWeatherCity(id)
      .then(data => setWeather(data))
      .finally(() => setLoading(false))
  }, [id])

  return {
    weather,
    loading
  }
}
