import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth } from '../config/firebase'; // Adjust the import path as needed

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(false);
      }
      setLoading(false); // Set loading to false after authentication state is updated
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while authentication state is being updated
  }

  return currentUser ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
