import React from 'react'
import styles from './Footer.module.css';
import { Link, useNavigate  } from 'react-router-dom';


export default function Footer() {
  return (
    <div className={styles.footerContainer}>
        
        <Link to="Forgot" className={styles.forgotPasswordLink}>
            Forgot my password
        </Link>
        
      

        <p className={styles.createAccountLink}>
            Your not have account?
            <Link to="Signup" className={styles.createAccountLink}>
                Create Account
            </Link>
        </p>
    </div>
  )
}
