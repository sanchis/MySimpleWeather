import localforage from 'localforage'
import React, { useEffect, useState } from 'react'
import { MunicipiosEndpointResponse } from 'services/tiempo.model'

export interface MunicipiosGuardadosContextModel{
  municipiosGuardados: MunicipiosEndpointResponse[]
  guardarMunicipios: React.Dispatch<React.SetStateAction<MunicipiosEndpointResponse[]>>
}

export const MunicipiosGuardadosContext = React.createContext<MunicipiosGuardadosContextModel>({
  municipiosGuardados: [],
  guardarMunicipios: () => {}
})

export function MunicipiosGuardadosContextProvider ({ children }: any): React.ReactElement {
  const [municipiosGuardados, guardarMunicipios] = useState<MunicipiosEndpointResponse[]>([])

  useEffect(() => {
    localforage.setItem('municipiosGuardados', municipiosGuardados)
      .catch(error => console.error(error))
  }, [municipiosGuardados])

  // Load the current municipios fron the storage to the current state
  useEffect(() => {
    localforage.getItem<MunicipiosEndpointResponse[]>('municipiosGuardados')
      .then(storeMunicipiosGuardados => {
        if (storeMunicipiosGuardados !== null && storeMunicipiosGuardados.length > 0) {
          guardarMunicipios(storeMunicipiosGuardados)
        }
      })
      .catch(error => console.error(error))
  }, [])

  return (
    <MunicipiosGuardadosContext.Provider value={{ municipiosGuardados, guardarMunicipios }}>
      {children}
    </MunicipiosGuardadosContext.Provider>
  )
}
