import React, { ReactElement } from 'react'
import video from 'assets/video.webm'
import styles from './index.module.css'
import SearchBar from 'components/searchBar'
import { useSavedCities } from 'hooks/useSavedCities'
import City from 'components/city'

export default function Index (): ReactElement {
  const { savedCities } = useSavedCities()
  return (
    <>
      <div className={styles.indexContainer}>
        <SearchBar />
        <div className={styles.containerCities}>
          {savedCities.map(cities =>
            <City city={cities} key={cities.id} />
          )}
        </div>
      </div>
      <div className={styles.videoContainer}>
        <video autoPlay className={styles.video} loop>
          <source src={video} />
        </video>
      </div>
    </>
  )
}
