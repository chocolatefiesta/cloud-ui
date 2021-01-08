import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Login from '../Login/Login';
import DrawPrint from '../DrawPrint/DrawPrint';
import Library from '../Library/Library';
import Navigation from '../Navigation/Navigation';
import Slicer from '../Slicer/Slicer';
import { useUser, UserContext } from './useUser';
import DrawApp from '../DrawApp/DrawApp';

function App() {
  const { user, setUser, removeUser } = useUser();

  if (!user) {
    return <Login setUser={setUser} />
  }

  return (
    <>
      <UserContext.Provider value={{ user, setUser, removeUser }} >

        <BrowserRouter>
          <Switch>
            <Route exact path="/draw">
              <DrawApp />
            </Route>
            <Route path="/">
              <Navigation />
              <Route exact path="/">
                <Library />
              </Route>
              <Route path="/draw-print">
                <DrawPrint />
              </Route>
              <Route path="/library">
                <Library />
              </Route>
              <Route path="/slicer">
                <Slicer />
              </Route>
            </Route>

          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}


export default App;
