import React from 'react'
import styles from './Header.module.css';
import logo from './logo1.png';


const Header: React.FC = () => (
    <header className={styles.header}>
      <img src={logo} alt="Logo" width={150}/>
      <span>Enter yours connections informations</span>
    </header>
  );

export default Header;