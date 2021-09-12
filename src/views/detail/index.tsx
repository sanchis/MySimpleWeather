import React, { ReactElement } from 'react'
import { useTiempoMunicipio } from 'hooks/useTiempoMunicipios'

interface Props{
  id: string
}

export default function Detail (props: Props): ReactElement {
  const { tiempo } = useTiempoMunicipio(props.id)

  return (
    <>
      <pre>

        <code>
          {JSON.stringify(tiempo, null, 2)}

        </code>
      </pre>
    </>
  )
}
