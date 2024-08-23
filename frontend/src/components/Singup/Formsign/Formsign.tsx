import React, { useState } from 'react';
import styles from './Formsign.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Formsign: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: string[] = [];

    // Verifica se todos os campos estão preenchidos
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      newErrors.push('Todos os campos são obrigatórios.');
    }

    // Verifica se as senhas coincidem
    if (formData.password !== formData.confirmPassword) {
      newErrors.push('As senhas não coincidem.');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors([]);

    try {
      await axios.post('http://localhost:8081/post', {
        name: formData.fullName,
        email: formData.email,
        senha: formData.password,
      });

      navigate('/Home');
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      setErrors(['Erro ao registrar usuário. Tente novamente.']);
    }
  };

  return (
    <form className={styles.formSign} onSubmit={handleSubmit}>
      {errors.length > 0 && (
        <div className={styles.errorMessages}>
          {errors.map((error, index) => (
            <p key={index} className={styles.errorMessage}>{error}</p>
          ))}
        </div>
      )}

      <label>Full Name</label>
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
      />

      <label>Email</label>
      <input
        type="email"
        name="email"
        placeholder="xxx@gmail.com"
        value={formData.email}
        onChange={handleChange}
      />

      <label>Password</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />

      <label>Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
      />

      <button type="submit">Confirm</button>
    </form>
  );
};

export default Formsign;
