import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Login from './components/Login';
import Registro from './components/Registro';
import Index from './components/Index';
import Actualizar from './components/Actualizar';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Route exact path='/' component={Login} />
      <Route exact path='/registro' component={Registro} />
      <Route exact path='/index' component={Index} />
      <Route exact path='/actualizar/:id' component={Actualizar} />

    </BrowserRouter>
  );
}

export default App;
