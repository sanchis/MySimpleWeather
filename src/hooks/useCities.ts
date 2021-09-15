import { CitiesContext } from 'context/cities'
import { useCallback, useContext } from 'react'
import { CityEndpointResponse } from 'services/weather.model'

interface HookModel{
  cities: CityEndpointResponse[]
  findCity: (id: string) => CityEndpointResponse | undefined
}

export function useCities (): HookModel {
  const { cities } = useContext(CitiesContext)

  const findCity = useCallback((id: string) => {
    return cities.find(cities => cities.id === id)
  }, [cities]
  )

  return { cities, findCity }
}
