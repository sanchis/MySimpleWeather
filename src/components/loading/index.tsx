import React, { ReactElement } from 'react'
import style from './style.module.css'

interface Props{
  show: boolean
  children: React.ReactNode
}

export default function Loading ({ show, children }: Props): ReactElement {
  return (
    <>
      {show
        ? <div className={style.ldsRipple}><div /><div /></div> : children}
    </>
  )
}
