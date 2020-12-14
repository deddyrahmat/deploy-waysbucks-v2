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
import Logout from "./components/Logout";

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

          <PrivateRoute exact path="/logout" component={Logout} />

          {/* <PrivateRoute exact path="/detail/:id" component={Detail} /> */}
          <PrivateRoute exact path="/cart" component={Cart} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/admin" component={Admin} />
          <PrivateRoute exact path="/product" component={Product} />
          <PrivateRoute exact path="/toping" component={Toping} />
          <Route exact path="/detail/:id">
            <Detail />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
