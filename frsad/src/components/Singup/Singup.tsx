import React from 'react';
import styles from './Singup.module.css';
import Formsign from './Formsign/Formsign';
import Headersign from './Headersign/Headersign';
import Footersign from './Footersign/Footersign';

const Singup = () => {
  const handleFormSubmit = (formData: any) => {
    console.log('Formulário enviado com os dados:', formData);
  };

  return (
    <div className={styles.page}>
      <div className={styles.containerSign}>
        <div className={styles.mainContainer}>
          <Headersign />
          <Formsign />
          <Footersign />
        </div>
      </div>
    </div>
  );
};

export default Singup;
