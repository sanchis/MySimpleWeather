import { MunicipiosGuardadosContext, MunicipiosGuardadosContextModel } from 'context/municipiosGuardados'
import { useContext } from 'react'

export function useMunicipiosGuardados (): MunicipiosGuardadosContextModel {
  const { guardarMunicipios, municipiosGuardados } = useContext(MunicipiosGuardadosContext)

  return {
    municipiosGuardados,
    guardarMunicipios
  }
}
