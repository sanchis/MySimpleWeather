import { useWeatherCity } from 'hooks/useWeatherCity'
import React, { ReactElement } from 'react'
import styles from './style.module.css'
import { CityEndpointResponse } from 'services/weather.model'
import Loading from 'components/loading'

interface Props{
  city: CityEndpointResponse
}

export default function City ({ city }: Props): ReactElement {
  const { loading } = useWeatherCity(city.id_old)
  return (
    <>
      <div className={styles.city}>
        <span className={styles.cityNombre}>{city.nombre}</span>
        <Loading show={loading}>
          <h1 className={styles.cityTemperatura}> 0º</h1>
          <span className={styles.subTitle}>Max: 0º Min: 0</span>
          <span className={styles.subTitle}>Humedad: 0%</span>
          <span className={styles.subTitle}>Cielo: 0</span>
        </Loading>
      </div>

    </>
  )
}
