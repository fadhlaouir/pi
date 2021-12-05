import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// route components
import App from "./App";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/shared/NotFoundPage";

const getSessionToken = () => localStorage.getItem("access_token");

const AuthRoute = (props) => {
  if (!getSessionToken()) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
};
/*eslint-disable */
function LayoutRoute({ component: Component, layout: Layout, ...rest }) {
  return (
    <AuthRoute
      {...rest}
      render={(props) => (
        <Layout {...props}>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

export const renderRoutes = () => (
  <Router>
    <Switch>
      <LayoutRoute
        exact
        path="/"
        component={() => <div>Landing page</div>}
        layout={App}
      />
      <Route
        exact
        path="/login"
        render={() =>
          getSessionToken() && getSessionToken() !== null ? (
            <Redirect exact from="/login" to="/" />
          ) : (
            <LoginPage />
          )
        }
      />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);
