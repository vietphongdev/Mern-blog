import * as React from 'react';
import { Redirect, RouteProps, Route } from 'react-router-dom';
import { getAccessTokenLocalStorage } from 'src/utils';

export function PrivateRoute(props: RouteProps) {
  // Check if user is logged in
  // If yes, show route
  // Otherwise, redirect to login page
  const isLoggedIn = Boolean(getAccessTokenLocalStorage());
  if (!isLoggedIn) return <Redirect to="/login" />;

  return <Route {...props} />;
}
