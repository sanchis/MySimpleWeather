import { useTiempoMunicipio } from 'hooks/useTiempoMunicipios'
import React, { ReactElement } from 'react'
import styles from './style.module.css'
import { MunicipiosEndpointResponse } from 'services/tiempo.model'
import Loading from 'components/loading'

interface Props{
  municipio: MunicipiosEndpointResponse
}

export default function Municipio ({ municipio }: Props): ReactElement {
  const { loading, tiempo } = useTiempoMunicipio(municipio.CODIGOINE)
  return (
    <>
      <div className={styles.municipio} key={municipio.CODIGOINE}>
        <span className={styles.municipioNombre}>{municipio.NOMBRE}</span>
        <Loading show={loading}>
          <h1 className={styles.municipioTemperatura}> {tiempo?.temperatura_actual}º</h1>
          <span className={styles.subTitle}>Max: {tiempo?.temperaturas.max}º Min: {tiempo?.temperaturas.min}</span>
          <span className={styles.subTitle}>Humedad: {tiempo?.humedad}%</span>
          <span className={styles.subTitle}>Cielo: {tiempo?.stateSky.description}</span>
        </Loading>
      </div>

    </>
  )
}
