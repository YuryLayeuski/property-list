import React from 'react'
import Header from './components/Header';
import PropertyList from './components/PropertyList';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/'>
          <Redirect exact to="/property-listings"/>
          <Route path="/property-listings">
            <Header />
            <PropertyList/>
          </Route>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
