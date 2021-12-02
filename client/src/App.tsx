import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Header } from 'src/components/header/header';
import { PrivateRoute } from 'src/components/shared';
import { FogotPassword, HomePage, LoginPage, ProfilePage, SignupPage } from 'src/pages';

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/forgot-password" component={FogotPassword} />
          <Route exact path="/" component={HomePage} />
          <PrivateRoute exact path="/profile/:id" component={ProfilePage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
