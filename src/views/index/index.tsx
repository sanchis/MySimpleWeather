import React, { ReactElement } from 'react'
import video from 'assets/video.webm'
import styles from './index.module.css'
import SearchBar from 'components/searchBar'
import { useMunicipiosGuardados } from 'hooks/useMunicipiosGuardados'
import Municipio from 'components/municipio'

export default function Index (): ReactElement {
  const { municipiosGuardados } = useMunicipiosGuardados()
  return (
    <>
      <div className={styles.indexContainer}>
        <SearchBar />
        <div className={styles.containerMunicipios}>
          {municipiosGuardados.map(municipio =>
            <Municipio municipio={municipio} key={municipio.CODIGOINE} />
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
