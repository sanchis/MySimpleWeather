import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './style.module.css'
import debounce from 'just-debounce-it'
import Input from '../input'

export interface AutocompleteItem{
  id: string
  label: string
  value: any
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement>{
  items: AutocompleteItem[]
  onClickItem: (item: AutocompleteItem) => void
  limit?: number
}

export default function Autocomplete (props: Props): React.ReactElement<Props, any> {
  const [items, setItems] = useState<AutocompleteItem[]>([])
  const [search, setSearch] = useState<string>('')
  const [focus, setFocus] = useState<HTMLAnchorElement |null>(null)
  const itemsRefs = useRef<HTMLAnchorElement[]>([])

  const debounceCallback = useCallback(
    debounce((val: string) => setSearch(val), 500)
    , [setSearch])

  const handleKeyUpAndDown = (event: React.KeyboardEvent): void => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
      return
    }

    console.log(event)
    const currentFocus = focus === null ? 0 : itemsRefs.current.indexOf(focus)
    let currentElement: HTMLAnchorElement
    if (event.key === 'ArrowDown') {
      const nextFocus = currentFocus + 1 === itemsRefs.current.length ? 0 : currentFocus + 1
      currentElement = itemsRefs.current[nextFocus]
    } else {
      const prevFocus = (currentFocus - 1) < 0 ? itemsRefs.current.length - 1 : currentFocus - 1
      currentElement = itemsRefs.current[prevFocus]
    }

    setFocus(currentElement)
    currentElement.focus()
  }

  useEffect(() =>
    setItems(
      props.items
        .filter(item => item.label.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        .slice(0, props.limit ?? 50)
    )
  , [search])

  return (
    <>
      <div className={styles.autocompleteWrapper}>
        <Input
          onFocus={() => setFocus(null)}
          onChange={(event) => debounceCallback(event.target.value)}
          onKeyDown={(event) => handleKeyUpAndDown(event)}
        />
        <ul className={styles.autoCompleteBox}>
          {items.map(item =>
            <li key={item.id} className={styles.item}>
              <a
                onClick={(ev) => {
                  ev.preventDefault()
                  props.onClickItem(item)
                  setFocus(ev.currentTarget)
                }}
                onKeyDown={(event) =>
                  handleKeyUpAndDown(event)} ref={el => el !== null ? itemsRefs.current.push(el) : null}
                className={styles.itemLink}
              >
                {item.label}
              </a>
            </li>)}
        </ul>
      </div>
    </>
  )
}
