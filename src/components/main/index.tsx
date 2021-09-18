import React, { ReactElement } from 'react'
import styles from './style.module.css'
import { WeatherFormated } from 'services/weather.model'
import { format } from 'date-fns'
import es from 'date-fns/esm/locale/es/index.js'
import Loading from 'components/loading'

interface Props{
  weather?: WeatherFormated
  loading: boolean
}

export default function Main ({ loading, weather }: Props): ReactElement {
  const date = new Date()

  const currentSkyState = weather?.estadoCielo
    .find(temp => temp.hour === date.getHours().toString())?.value
  const currentTempState = weather?.temperatura
    .find(temp => temp.hour === date.getHours().toString())?.value.toFixed(0)

  return (
    <>
      {weather === undefined ? <p className={styles.noCitySelected}>Abre el menú y busca tu ciudad. </p> : null}
      <main>
        <div className={styles.weatherContent}>
          <Loading show={loading || weather === undefined}>

            <div><h1>{currentTempState}º</h1></div>
            <div className={styles.cityInfo}>
              <h2 className={styles.city}>{weather?.name}</h2>
              <small className={styles.subTitle}>{format(date, 'HH:mm - eeee, d LLLL', {
                locale: es
              })}
              </small>
            </div>
            <div className={styles.cityInfo}>
              <img src={`./src/assets/weather-icons/${currentSkyState !== undefined ? currentSkyState?.toString() : ''}.svg`} />
              {/* <small className={styles.subTitle}>Cloudy</small> */}
            </div>
          </Loading>
        </div>
      </main>
    </>
  )
}
