import { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import PrivateRoute from "./components/privateRoute";

import {AppContext} from "./context/appContext";
import {API, setAuthToken} from "./config/API";

// component
import Detail from "./pages/Detail";
import LandingPage from "./pages/LandingPage";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import Toping from "./pages/Toping";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

if (localStorage.token) {
  setAuthToken(localStorage.token)
}


function App() {

  const [state, dispatch] = useContext(AppContext);

  const loadUser = async () => {
    try {
      const response = await API("/check-auth");

      if (response.status === 401) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // console.log(state);
      // console.log(response.data.data);

      dispatch({
        type: "USER_LOADED",
        payload: response.data.data
      });

    } catch (err) {
      dispatch({
        type: "AUTH_ERROR",
      });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Router>
      <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <PrivateRoute exact path="/detail/:id" component={Detail} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/product">
            <Product />
          </Route>
          <Route exact path="/toping">
            <Toping />
          </Route>
          <Route exact path="/admin">
            <Admin />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
