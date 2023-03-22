import React, { useEffect, useRef } from 'react'

/* libs */
import Typed from 'typed.js'

/* styles */
import styles from './typing.module.css'

/* types */
import { I_TypingEffect } from '../../types'

// ===========================================================

export default function Typing({ user, host, lists, root }: I_TypingEffect) {
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
    <React.Fragment>
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
    </React.Fragment>
  )
}
