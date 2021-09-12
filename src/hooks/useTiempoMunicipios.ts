import { useEffect, useState } from 'react'
import { getTiempoMunicipio } from 'services/tiempo'
import { Tiempo } from 'services/tiempo.model'
import { useMunicipios } from './useMunicipios'

interface HookModel{
  tiempo: Tiempo
  loading: boolean
}

export function useTiempoMunicipio (id: string): HookModel {
  const { findMunicipio } = useMunicipios()
  const currentMunicipio = findMunicipio(id)
  const [loading, setLoading] = useState<boolean>(false) // TODO
  const [tiempo, setTiempo] = useState<any>(null) // TODO

  useEffect(() => {
    if (currentMunicipio === undefined) {
      return
    }

    setLoading(true)
    getTiempoMunicipio(currentMunicipio.CODPROV, currentMunicipio.CODIGOINE)
      .then(data => setTiempo(data))
      .finally(() => setLoading(false))
  }, [id])

  return {
    tiempo,
    loading
  }
}
