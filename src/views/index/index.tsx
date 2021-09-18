import React, { ReactElement, useState } from 'react'
import styles from './index.module.css'
import { useWeatherCity } from 'hooks/useWeatherCity'
import Aside from 'components/aside'
import Main from 'components/main'
import { CityEndpointResponse } from 'services/weather.model'
import { getBackgroundImage } from 'services/weather'

export default function Index (): ReactElement {
  const [currentCitySelected, setCurretCitySelected] = useState<CityEndpointResponse| undefined>()
  const { loading, weather } = useWeatherCity(currentCitySelected?.id)

  return (
    <>
      <div
        className={styles.mainContainer}
        style={{
          background: `url('${weather === undefined ? './src/assets/day-sunny.jpg' : getBackgroundImage(weather)}') no-repeat center center fixed`
        }}
      >
        <Aside onClickCity={(city) => setCurretCitySelected(city)} loading={loading} weather={weather} />
        <Main loading={loading} weather={weather} />
      </div>
    </>
  )
}
