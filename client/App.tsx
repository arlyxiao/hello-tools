import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Chrome from "./pages/Chrome";
import PageCrypto from "./pages/PageCrypto";

const App = () => {

  React.useEffect(() => {
  }, []);


  return (
    <Router>
      <Switch>
        <Route path={`/pages/crypto`} component={PageCrypto} exact />
        <Route path={`/pages/chrome`} component={Chrome} />
      </Switch>
    </Router>
  )
}


export default App;
