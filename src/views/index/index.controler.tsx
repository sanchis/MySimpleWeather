import { useWeatherCity } from 'hooks/useWeatherCity'
import React, { ReactElement, useState } from 'react'

import { CityEndpointResponse } from 'services/weather.model'
import IndexView from './index'

export default function Index (): ReactElement {
  const [currentCitySelected, setCurretCitySelected] = useState<CityEndpointResponse| undefined>()
  const { loading, weather } = useWeatherCity(currentCitySelected?.id)
  const props = { loading, weather, setCurretCitySelected }

  return (
    // <IndexView curreCitiySelected={currentCitySelected} loading={loading} weather={weather} setCurretCitySelected={setCurretCitySelected} />
    <IndexView {... props} />
    //   <>
    //     <div
    //       className={styles.mainContainer}
    //       style={{
    //         background:
    //         `url('${weather === undefined ? './day-sunny.jpg'
    //         : getBackgroundImage(weather)}') no-repeat center center fixed`
    //       }}
    //     >
    //       <Aside onClickCity={(city) => setCurretCitySelected(city)} loading={loading} weather={weather} />
    //       <Main loading={loading} weather={weather} />
    //     </div>
    //   </>
  )
}
