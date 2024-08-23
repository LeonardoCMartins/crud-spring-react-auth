import React from 'react'
import logo from './logo1.png'
import styles from './Headersign.module.css'

const Headersign = () => {
  return (
    <div className={styles.apres}>
        <img src={logo} width='150px'></img>
        <h3>Sign up</h3>
        <p>Enter your details below to create your account and get started</p>

    </div>
  )
}

export default Headersign