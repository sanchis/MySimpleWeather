
import SearchBar from 'components/searchBar'
import { useSavedCities } from 'hooks/useSavedCities'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { CityEndpointResponse, WeatherFormated } from 'services/weather.model'
import styles from './style.module.css'

interface Props{
  onClickCity: (city: CityEndpointResponse) => void
  weather?: WeatherFormated
  loading: boolean
}

export default function Aside ({ onClickCity }: Props): ReactElement {
  const { savedCities } = useSavedCities()
  const [selectedCity, setSelectedCity] = useState<CityEndpointResponse|null>(null)
  const [visibleMenu, setVisibleMenu] = useState(false)

  useEffect(() => {
    if (document.body.clientWidth < 720) {
      setVisibleMenu(true)
    }
  }, [])

  useEffect(() => {
    if (selectedCity === null && savedCities.length > 0) {
      hadleSelectCity(savedCities[0])
    }
  }, [savedCities])

  const hadleSelectCity = (city: CityEndpointResponse): void => {
    setSelectedCity(city)
    onClickCity(city)
  }

  return (
    <>
      <svg
        onClick={() => setVisibleMenu(true)}
        viewBox='0 0 100 80' width='80' className={styles.hamburguer} height='60' style={{
          display: visibleMenu
            ? 'none' : 'initial'
        }}
      >
        <rect width='150' height='20' />
        <rect y='30' width='150' height='20' />
        <rect y='60' width='150' height='20' />
      </svg>
      <aside className={styles.aside} hidden={!visibleMenu}>
        <a
          className={styles.close} onClick={(e) => {
            e.preventDefault()
            setVisibleMenu(false)
          }}
        />
        <SearchBar />
        {savedCities.map(city => <div className={selectedCity === city ? styles.selectedCity : ''} onClick={() => hadleSelectCity(city)} key={city.id}>{city.nombre}</div>)}

        <div className={styles.separator} />
        <div className={styles.header}>Detalles Climáticos</div>

        <div className={styles.separator} />

      </aside>
    </>
  )
}
