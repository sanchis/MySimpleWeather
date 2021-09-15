import { SavedCitiesContext } from 'context/citiesSaved'
import { useCallback, useContext } from 'react'
import { CityEndpointResponse } from 'services/weather.model'

interface HookModel{
  savedCities: CityEndpointResponse[]
  addNewCity: (data: CityEndpointResponse) => void
  deleteCity: (data: CityEndpointResponse) => void
}
export function useSavedCities (): HookModel {
  const { saveCities, citiesSaved } = useContext(SavedCitiesContext)

  const addNewCity = useCallback((city: CityEndpointResponse) => {
    saveCities((current) => {
      if (!current.some(currentCity => city.id === currentCity.id)) {
        return [...current, city]
      } else {
        return current
      }
    })
  }, [citiesSaved])

  const deleteCity = useCallback((city: CityEndpointResponse) => {
    saveCities((current) => current.filter(currentCity => currentCity.id !== city.id))
  }, [citiesSaved])

  return {
    savedCities: citiesSaved,
    addNewCity,
    deleteCity
  }
}
