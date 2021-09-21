
import Autocomplete, { AutocompleteItem } from 'components/autocomplete'
import { useCities } from 'hooks/useCities'
import { useSavedCities } from 'hooks/useSavedCities'
import React, { ReactElement } from 'react'

export default function SearchBar (): ReactElement {
  const { cities } = useCities()
  const { addNewCity } = useSavedCities()
  const handleClickMunicipio = (item: AutocompleteItem): void => {
    addNewCity(item.value)
  }

  return (
    <Autocomplete
      input={{
        placeholder: 'Busca tu ciudad'
      }}
      limit={10}
      placeholder='Localidad'
      items={cities.map((city) => ({ id: city.id, label: city.nombre, value: city }))}
      onClickItem={handleClickMunicipio}
    />
  )
}
