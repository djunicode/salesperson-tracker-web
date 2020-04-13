import React from 'react';
import './App.css';
import SalesPeople from './components/SalesPeople/SalesPeople';
import ForgotPass from './components/ForgotPass';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard/Dashboard';
import Inventory from './components/Inventory/Inventory';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import SignedInRoute from './SignInRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <SignedInRoute path="/" exact component={SignIn} />{' '}
          <Route path="/forgotpass" exact component={ForgotPass} />{' '}
          <ProtectedRoute path="/dashboard" exact component={Dashboard} />{' '}
          <ProtectedRoute path="/inventory" exact component={Inventory} />{' '}
          <ProtectedRoute path="/sales-people" exact component={SalesPeople} />{' '}
          <Route path="*" exact component={() => '404 NOT FOUND'} />{' '}
        </Switch>{' '}
      </div>{' '}
    </Router>
  );
}

export default App;
