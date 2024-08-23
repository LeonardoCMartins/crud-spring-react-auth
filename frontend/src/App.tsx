import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import Footer from './components/Footer/Footer';
import Singup from './components/Singup/Singup';
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin';
import Forgot from './components/Forgot/Forgot';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="App">
        <div className='container'>
          <Header />
          <Form />
          <Footer />
        </div>
      </div>
    ),
  },
  {
    path: "/Signup",
    element: <Singup />, 
  },
  {
    path: "/Home",
    element: <Home />, 
  },
  {
    path: "/admin",
    element: <Admin />, 
  },
  {
    path: "/forgot",
    element: <Forgot/>,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
