import React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement>{

}

export default function Input (props: Props): React.ReactElement<Props, any> {
  return (
    <>
      <input {...props} />
    </>
  )
}
