import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout';
import Login from '../Pages/Login';
import OnLoad from '../Pages/OnLoad';

const Myroutes = () => {
  return (
        <Routes>
            <Route path='/Home' element={<Layout />}/>
            <Route index path='/' element={<OnLoad />}/>
            <Route path='/login' element={<Login />}/>
        </Routes>
  )
}

export default Myroutes