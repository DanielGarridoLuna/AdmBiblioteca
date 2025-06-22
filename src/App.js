import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './Comps/Layout';
import Login from './Pags/Login';
import Home from './Pags/Home';
import Material from './Pags/Material';


function App() {
  return (

    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/material" element={< Material />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Layout>
    </BrowserRouter>

  );
}

export default App;