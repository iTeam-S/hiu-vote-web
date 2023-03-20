import React, { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import styles from './typing.module.css'

type params = {
  user: string
  host: string
  lists: string[]
  root: boolean
}

export default function TypingEffect({ user, host, lists, root }: params) {
  const el = useRef(null)

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: lists,
      startDelay: 3000,
      typeSpeed: 130,
      backSpeed: 50,
      backDelay: 2000,
      smartBackspace: true,
      loop: true,
    })

    return () => {
      typed.destroy()
    }
  }, [])

  return (
    <>
      <div className={styles.text}>
        <span>
          {user}
          <span
            style={{
              color: 'teal',
            }}
          >
            @
          </span>
          {host}
          <span
            style={{
              color: 'gray',
            }}
          >
            :~{root ? '#' : '$'}
          </span>
        </span>
        &nbsp;
        <span ref={el}></span>
      </div>
    </>
  )
}
