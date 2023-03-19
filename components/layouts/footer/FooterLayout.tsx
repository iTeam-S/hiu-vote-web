import React from 'react'
import styles from './FooterLayout.module.css'
import { FaGithubSquare, FaFacebookSquare, FaLinkedin } from 'react-icons/fa'

export default function FooterLayout() {
  const date: Date = new Date()
  const years: number = date.getFullYear()

  return (
    <footer className={styles.footer}>
      <div className="d-flex justify-content-center align-items-center col-sm-6 col-md-12">
        <div className="d-flex justify-content-center align-items-center">
          <h6>
            {years} &copy; Copyright <span>iTeam-$</span>. Tout droits reservés{' '}
          </h6>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <a
            href="https://www.linkedin.com/company/iteamscommunity"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin size={40} className={styles.links} />
          </a>
          <a
            href="https://web.facebook.com/iTeam.Community"
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebookSquare size={40} className={styles.links} />
          </a>
          <a href="https://github.com/iTeam-S" target="_blank" rel="noreferrer">
            <FaGithubSquare size={40} className={styles.links} />
          </a>
        </div>
      </div>
    </footer>
  )
}
