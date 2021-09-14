import { useEffect, useState } from 'react'
import { getTiempoMunicipio } from 'services/tiempo'
import { Tiempo } from 'services/tiempo.model'
import { useMunicipios } from './useMunicipios'

interface HookModel{
  tiempo: Tiempo | undefined
  loading: boolean
}

export function useTiempoMunicipio (id: string): HookModel {
  const { municipios, findMunicipio } = useMunicipios()
  const [loading, setLoading] = useState<boolean>(false)
  const [tiempo, setTiempo] = useState<Tiempo>()

  useEffect(() => {
    const currentMunicipio = findMunicipio(id)
    if (currentMunicipio === undefined) {
      return
    }

    setLoading(true)
    getTiempoMunicipio(currentMunicipio.CODPROV, currentMunicipio.CODIGOINE)
      .then(data => setTiempo(data))
      .finally(() => setLoading(false))
  }, [id, municipios])

  return {
    tiempo,
    loading
  }
}
