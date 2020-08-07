import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Login from './components/Login';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Route exact path='/' component={Login} />

    </BrowserRouter>
  );
}

export default App;
