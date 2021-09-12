import React from 'react'
import styles from './style.module.css'

interface Props extends React.InputHTMLAttributes<HTMLInputElement>{

}

export default function Input (props: Props): React.ReactElement<Props, any> {
  return (
    <>
      <input {...props} className={`${styles.input} ${props.className ?? ''}`} />
    </>
  )
}
