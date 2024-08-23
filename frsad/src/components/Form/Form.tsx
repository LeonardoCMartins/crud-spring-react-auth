import React, { useState } from 'react';
import axios from 'axios';
import styles from './Form.module.css';
import { useNavigate } from 'react-router-dom';

const Form: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8081/login', {
        email,
        senha: password,
      });
      
      if (response.status === 200) {
        console.log('deu certo', response.data);
        navigate('/Home');  
      } else {
        setError('Email or password incorrect.');
      }
    } catch (error) {
      setError('Email or password incorrect.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <label>Email</label>
        <input
          type='email'
          placeholder='xxx@gmail.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className={styles.error}>{error}</p>}

        <button type='submit'>Login</button>
      </div>
    </form>
  );
};

export default Form;
