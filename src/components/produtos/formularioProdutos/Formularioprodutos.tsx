import React from 'react';
import './App.css';

import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Cadastro from './pages/cadastro/Cadastro';
import Home from './pages/home/Home';
import { AuthProvider } from './contexts/AuthContext';
import Listatipos from './components/tipos/listatipos/Listatipos';
import Formulariotipo from './components/tipos/formulariotipo/Formulariotipo';
import Deletartipo from './components/tipos/deletartipo/Deletartipo';
import Listaprodutos from './components/produtos/listaprodutos/Listaprodutos';
import Formularioproduto from './components/produtos/formularioproduto/Formularioproduto';


function App() {
  return (
    <>
    <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <div className='min-h-[80vh]'>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/home" element={<Home />} />
              <Route path="/tipos" element={<Listatipos />} />
              <Route path="/cadastrotipo" element={<Formulariotipo />} />
              <Route path="/editartipo/:id" element={<Formulariotipo />} />
              <Route path="/deletartipo/:id" element={<Deletartipo />} />
              <Route path="/produtos" element={<Listaprodutos />} />
              <Route path="/cadastroproduto" element={<Formularioproduto />} />
              <Route path="/editarproduto/:id" element={<Formularioproduto />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
        </AuthProvider>
    </>
  );
}
export default App;