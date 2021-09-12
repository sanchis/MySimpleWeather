import React, { ReactElement } from 'react'
import video from 'assets/video.webm'
import styles from './index.module.css'
import { useMunicipios } from 'hooks/useMunicipios'
import Autocomplete, { AutocompleteItem } from 'components/ui/autocomplete'
import { useLocation } from 'wouter'
import { useMunicipiosGuardados } from 'hooks/useMunicipiosGuardados'

export default function Index (): ReactElement {
  const { municipios } = useMunicipios()
  const [, setLocation] = useLocation()
  const { guardarMunicipios } = useMunicipiosGuardados()
  const handleClickMunicipio = (item: AutocompleteItem): void => {
    guardarMunicipios([item.value])
    setLocation(`/t/${item.id}`)
  }

  return (
    <>
      <div className={styles.indexContainer}>
        <Autocomplete
          limit={10}
          placeholder='Localidad'
          items={municipios.map((municipio) => ({ id: municipio.CODIGOINE, label: municipio.NOMBRE, value: municipio }))}
          onClickItem={handleClickMunicipio}
        />
        <video autoPlay className={styles.video} loop>
          <source src={video} />
        </video>
      </div>
    </>
  )
}
