import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './components/auth';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { ContentProperties } from './components/ContentProperties';


 const App = () => {
   return(
    <AuthProvider>
    <Routes>
    <Route path='/' element={<Login />} />
    <Route path='/Home' element={<Home />} />
    <Route path='/contentProperties' element={<ContentProperties />} />

    </Routes>
    </AuthProvider>
  );
}

export default App;
