import localforage from 'localforage'
import React, { useEffect, useState } from 'react'
import { MunicipiosEndpointResponse } from 'services/tiempo.model'

export interface MunicipiosGuardadosContextModel{
  municipiosGuardados: MunicipiosEndpointResponse[]
  guardarMunicipios: (val: MunicipiosEndpointResponse[]) => void
}

export const MunicipiosGuardadosContext = React.createContext<MunicipiosGuardadosContextModel>({
  municipiosGuardados: [],
  guardarMunicipios: (val: MunicipiosEndpointResponse[]) => null
})

const currentMunicipiosGuardados = await localforage.getItem<MunicipiosEndpointResponse[]>('municipiosGuardados')

export function MunicipiosGuardadosContextProvider ({ children }: any): React.ReactElement {
  const [municipiosGuardados, guardarMunicipios] = useState<MunicipiosEndpointResponse[]>(
    currentMunicipiosGuardados ?? [])

  useEffect(() => {
    localforage.setItem('municipiosGuardados', municipiosGuardados)
      .catch(error => console.error(error))
  }, [municipiosGuardados])

  return (
    <MunicipiosGuardadosContext.Provider value={{ municipiosGuardados, guardarMunicipios }}>
      {children}
    </MunicipiosGuardadosContext.Provider>
  )
}
