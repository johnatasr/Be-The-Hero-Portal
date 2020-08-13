import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../src/services/auth'

import Logon from './pages/Logon';
import SelectOng from './components/ongs';
import Register from './pages/Register';
import Profiles from './pages/Profiles';
import NewIncident from './pages/NewIncident';
import NewOng from './pages/RegisterOngOnly';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
);

export default function Routes () {
    return (
        <BrowserRouter>
          <Switch>
              <Route path='/' exact component={Logon}/>
              <Route path='/register' component={Register} />
              <Route path='/selectOng' exact component={SelectOng}/>
              <Route path='/newOng' component={NewOng} />             
              <Route path='/profiles' component={Profiles} />
              <Route path='/newincident' component={NewIncident} />
              

              <Route path="*" component={() => <h1>Page not found</h1>} />
          </Switch>
        </BrowserRouter>
    );
}

{/* <PrivateRoute path='/profiles' component={Profiles} /> */}


