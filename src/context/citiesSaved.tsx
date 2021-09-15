import localforage from 'localforage'
import React, { useEffect, useState } from 'react'
import { CityEndpointResponse } from 'services/weather.model'

export interface CitiesSavedContextModel{
  citiesSaved: CityEndpointResponse[]
  saveCities: React.Dispatch<React.SetStateAction<CityEndpointResponse[]>>
}

export const SavedCitiesContext = React.createContext<CitiesSavedContextModel>({
  citiesSaved: [],
  saveCities: () => {}
})

export function SavedCitiesContextProvider ({ children }: any): React.ReactElement {
  const [currentSaveCities, saveCities] = useState<CityEndpointResponse[]>([])

  useEffect(() => {
    localforage.setItem('saveCities', currentSaveCities)
      .catch(error => console.error(error))
  }, [currentSaveCities])

  // Load the current cities from the storage to the current state
  useEffect(() => {
    localforage.getItem<CityEndpointResponse[]>('saveCities')
      .then(storeSavedCities => {
        if (storeSavedCities !== null && storeSavedCities.length > 0) {
          saveCities(storeSavedCities)
        }
      })
      .catch(error => console.error(error))
  }, [])

  return (
    <SavedCitiesContext.Provider value={{ citiesSaved: currentSaveCities, saveCities: saveCities }}>
      {children}
    </SavedCitiesContext.Provider>
  )
}
