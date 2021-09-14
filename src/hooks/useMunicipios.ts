import { MunicipiosContext } from 'context/municipios'
import { useCallback, useContext } from 'react'
import { MunicipiosEndpointResponse } from 'services/tiempo.model'

interface HookModel{
  municipios: MunicipiosEndpointResponse[]
  findMunicipio: (id: string) => MunicipiosEndpointResponse | undefined
}

export function useMunicipios (): HookModel {
  const { municipios } = useContext(MunicipiosContext)

  const findMunicipio = useCallback((id: string) => {
    return municipios.find(municipios => municipios.id === id)
  }, [municipios]
  )

  return { municipios, findMunicipio }
}
