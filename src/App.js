import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext } from 'react';
import { useState } from 'react';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Destination from './components/Destination/Destination';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState(
    {
      isSignedIn: false,
      name: '',
      email: '',
      password: '',
      error: ''
    }
  );
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <PrivateRoute path='/destination/:id'>
            <Destination />
          </PrivateRoute>
          <Route>
            <h1 className='text-center text-danger'>404 Page Not Found!</h1>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
