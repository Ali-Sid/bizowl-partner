import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import Login from 'components/Auth/Login';
import Register from 'components/Auth/Signup';
import PartnerLayout from './layouts/partner/index';
import RtlLayout from 'layouts/rtl';
import Profile from 'views/partner/profile/index';
import PrivateRoute from './components/PrivateRoute'; // Adjust the import path as needed

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <Router>
        <Switch>
          <PrivateRoute path="/partner" component={PartnerLayout} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/rtl" component={RtlLayout} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Register} />
          <Redirect from="/" to="/partner" /> Redirect to /partner if authenticated
        </Switch>
      </Router>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById('root')
);
