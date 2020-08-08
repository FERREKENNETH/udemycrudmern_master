import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Nav from './components/Nav';
import Login from './components/Login';
import Registro from './components/Registro';
import Index from './components/Index';
import Actualizar from './components/Actualizar';

// SI hay un token en la cabecera, esta autenticado , sino no
const estaAutenticado = () => {
  const token = sessionStorage.getItem('token')
  if (token) {
    return true
  } else {
    return false
  }
}

const MyRoute = (props) => {
  return estaAutenticado() ? <Route {...props} />
    : <Redirect to='/' />
}

function App() {
  return (
    <BrowserRouter>

      <Nav />
      <Route exact path='/' component={Login} />
      <Route exact path='/registro' component={Registro} />
      <MyRoute exact path='/index' component={Index} />
      <MyRoute exact path='/actualizar/:id' component={Actualizar} />

    </BrowserRouter>
  );
}

export default App;
