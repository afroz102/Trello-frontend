import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import TrelloBoard from './pages/TrelloBoard';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import GetSearchedPage from './pages/GetSearchedPage';
import Login from './components/authComponents/Login';
import Register from './components/authComponents/Register';
import Header from './components/layout/Header';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/board" render={props => <Home {...props} />} />
            <Route exact path="/login" render={props => <Login {...props} />} />
            <Route exact path="/register" render={props => <Register {...props} />} />
            <Route exact path="/search/task" render={props => <GetSearchedPage {...props} />} />
            <Route exact path="/board/:boardID" render={props => <TrelloBoard {...props} />} />

          </Switch>
        </div>
      </>
    );
  }
}

export default App;