import localforage from 'localforage'
import React, { useEffect, useState } from 'react'
import { getMunicipios } from 'services/tiempo'
import { MunicipiosEndpointResponse } from 'services/tiempo.model'

export interface MunicipiosContextModel{
  municipios: MunicipiosEndpointResponse[]
  setMunicipios: (val: MunicipiosEndpointResponse[]) => void
}

export const MunicipiosContext = React.createContext<MunicipiosContextModel>({
  municipios: [],
  setMunicipios: (val: MunicipiosEndpointResponse[]) => null
})

export function MunicipiosContextProvider ({ children }: any): React.ReactElement {
  const [municipios, setMunicipios] = useState<MunicipiosEndpointResponse[]>([])

  useEffect(() => {
    // Check if the current municipios is in the navigator storage
    localforage.getItem<MunicipiosEndpointResponse[]>('municipios').then(municipiosStorage => {
      if (municipiosStorage === null || municipiosStorage.length === 0) {
        // If no set in the storage get from the external resources
        getMunicipios()
          .then(async municipios => await localforage.setItem('municipios', municipios))
          .then(municipios => setMunicipios(municipios))
          .catch(error => console.error(error))
      } else {
        // if is set load in the current state
        setMunicipios(municipiosStorage)
      }
    }).catch(error => console.error(error))
  }, [])

  return (
    <MunicipiosContext.Provider value={{ municipios, setMunicipios }}>
      {children}
    </MunicipiosContext.Provider>
  )
}
