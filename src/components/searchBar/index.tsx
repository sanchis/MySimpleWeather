
import Autocomplete, { AutocompleteItem } from 'components/ui/autocomplete'
import { useMunicipios } from 'hooks/useMunicipios'
import { useMunicipiosGuardados } from 'hooks/useMunicipiosGuardados'
import React, { ReactElement } from 'react'
import { useLocation } from 'wouter'

export default function SearchBar (): ReactElement {
  const { municipios } = useMunicipios()
  const [, setLocation] = useLocation()
  const { addNewMunicipio } = useMunicipiosGuardados()
  const handleClickMunicipio = (item: AutocompleteItem): void => {
    addNewMunicipio(item.value)
    setLocation(`/t/${item.id}`)
  }

  return (
    <Autocomplete
      input={{
        placeholder: 'Busca tu ciudad'
      }}
      limit={10}
      placeholder='Localidad'
      items={municipios.map((municipio) => ({ id: municipio.id, label: municipio.nombre, value: municipio }))}
      onClickItem={handleClickMunicipio}
    />
  )
}
