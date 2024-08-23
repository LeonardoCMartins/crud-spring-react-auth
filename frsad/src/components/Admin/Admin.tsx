import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Admin.module.css';

interface User {
  id: number;
  name: string;
  email: string;
  senha: string;
}

const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [updatedName, setUpdatedName] = useState<string>('');
  const [updatedEmail, setUpdatedEmail] = useState<string>('');
  const [updatedPassword, setUpdatedPassword] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8081/get/all');
        setUsers(response.data);
      } catch (error) {
        console.error('Error', error);
      }
    };
    fetchUsers();
  }, []);

  const handleUpdate = async (id: number) => {
    try {
      await axios.put(`http://localhost:8081/put/${id}`, {
        name: updatedName,
        email: updatedEmail,
        senha: updatedPassword,
      });
      const response = await axios.get('http://localhost:8081/get/all');
      setUsers(response.data);
    } catch (error) {
      console.error('Error', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8081/delete/${id}`);
      const response = await axios.get('http://localhost:8081/get/all');
      setUsers(response.data);
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <div className={styles.admPage}>
      <h1>Admin</h1>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => {
                  setSelectedUser(user);
                  setUpdatedName(user.name);
                  setUpdatedEmail(user.email);
                  setUpdatedPassword(user.senha);
                }}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div className={styles.updateForm}>
          <h2>Update User</h2>
          <label>
            Name
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={updatedEmail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={updatedPassword}
              onChange={(e) => setUpdatedPassword(e.target.value)}
            />
          </label>
          <button onClick={() => {
            if (selectedUser) {
              handleUpdate(selectedUser.id);
              setSelectedUser(null);
            }
          }}>Save Changes</button>
        </div>
      )}
    </div>
  );
};

export default Admin;
