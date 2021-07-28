import React, { ReactElement } from 'react'
import Input from 'components/ui/input'
import video from 'assets/video.webm'
import styles from './App.module.css'

export default function App (): ReactElement {
  return (
    <>
      <div className={styles.indexContainer}>
        <Input placeholder='Localidad' />
        <video autoPlay className={styles.video} loop>
          <source src={video} />
        </video>
      </div>
    </>
  )
}
