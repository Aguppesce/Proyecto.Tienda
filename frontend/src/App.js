import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Register from './pages/Register';
import './styles/App.css';

function App() {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    window.appSetCarrito = setCarrito;
    return () => {
      delete window.appSetCarrito;
    };
  }, []);

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((item) => item.nombre === producto.nombre);
      if (existe) {
        return prevCarrito.map((item) =>
          item.nombre === producto.nombre ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (producto) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.nombre !== producto.nombre));
  };

  const descontarDelCarrito = (producto) => {
    setCarrito((prevCarrito) =>
      prevCarrito
        .map((item) =>
          item.nombre === producto.nombre
            ? item.cantidad > 1
              ? { ...item, cantidad: item.cantidad - 1 }
              : null
            : item
        )
        .filter(Boolean)
    );
  };

  return (
    <Router>
      <div className="App">
        <Navbar carrito={carrito} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Home agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
