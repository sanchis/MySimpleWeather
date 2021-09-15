import localforage from 'localforage'
import React, { useEffect, useState } from 'react'
import { getCities } from 'services/weather'
import { CityEndpointResponse } from 'services/weather.model'

export interface CitiesContextModel{
  cities: CityEndpointResponse[]
  setCities: (val: CityEndpointResponse[]) => void
}

export const CitiesContext = React.createContext<CitiesContextModel>({
  cities: [],
  setCities: (val: CityEndpointResponse[]) => null
})

export function CitiesContextProvider ({ children }: any): React.ReactElement {
  const [cities, setCities] = useState<CityEndpointResponse[]>([])

  useEffect(() => {
    // Check if the current cities is in the navigator storage
    localforage.getItem<CityEndpointResponse[]>('cities').then(citiesStorage => {
      if (citiesStorage === null || citiesStorage.length === 0) {
        // If no set in the storage get from the external resources
        getCities()
          .then(async cities => await localforage.setItem('cities', cities))
          .then(cities => setCities(cities))
          .catch(error => console.error(error))
      } else {
        // if is set load in the current state
        setCities(citiesStorage)
      }
    }).catch(error => console.error(error))
  }, [])

  return (
    <CitiesContext.Provider value={{ cities, setCities }}>
      {children}
    </CitiesContext.Provider>
  )
}
