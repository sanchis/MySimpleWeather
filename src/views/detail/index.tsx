import React, { ReactElement } from 'react'
import { useWeatherCity } from 'hooks/useWeatherCity'

interface Props{
  id: string
}

export default function Detail (props: Props): ReactElement {
  const { weather: tiempo } = useWeatherCity(props.id)

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
