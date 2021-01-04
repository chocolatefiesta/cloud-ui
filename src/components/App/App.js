import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import Library from '../Library/Library';
import useUser from './useUser';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

function App() {
  const { user, setUser } = useUser();

  if (!user) {
    return <Login setUser={setUser} />
  }

  return (
    <>
      <Navbar className="justify-content-between" expand="md">
        <Navbar.Brand href="#home">Chocolate Fiesta Cloud</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Печать</Nav.Link>
            <Nav.Link href="/dashboard">Рисунки</Nav.Link>
            <Nav.Link href="/library">Библиотека моделей</Nav.Link>
            <Nav.Link href="#link">Конструктор</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/library">
            <Library />
          </Route>
        </Switch>
      </BrowserRouter>

    </>
  );
}


export default App;
