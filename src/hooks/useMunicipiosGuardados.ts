import { MunicipiosGuardadosContext } from 'context/municipiosGuardados'
import { useCallback, useContext } from 'react'
import { MunicipiosEndpointResponse } from 'services/tiempo.model'

interface HookModel{
  municipiosGuardados: MunicipiosEndpointResponse[]
  addNewMunicipio: (data: MunicipiosEndpointResponse) => void
  deleteMunicipio: (data: MunicipiosEndpointResponse) => void
}
export function useMunicipiosGuardados (): HookModel {
  const { guardarMunicipios, municipiosGuardados } = useContext(MunicipiosGuardadosContext)

  const addNewMunicipio = useCallback((muni: MunicipiosEndpointResponse) => {
    guardarMunicipios((current) => {
      if (!current.some(currentMuni => muni.CODIGOINE === currentMuni.CODIGOINE)) {
        return [...current, muni]
      } else {
        return current
      }
    })
  }, [municipiosGuardados])

  const deleteMunicipio = useCallback((muni: MunicipiosEndpointResponse) => {
    guardarMunicipios((current) => current.filter(currentMuni => currentMuni.CODIGOINE !== muni.CODIGOINE))
  }, [municipiosGuardados])

  return {
    municipiosGuardados,
    addNewMunicipio,
    deleteMunicipio
  }
}
