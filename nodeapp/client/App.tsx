import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import PageCrypto from "./pages/PageCrypto";
import PageHtmlConverter from "./pages/PageHtmlConverter";

const App = () => {

  React.useEffect(() => {
  }, []);


  return (
    <Router>
      <Switch>
        <Route path={`/pages/crypto`} component={PageCrypto} exact />
        <Route path={`/pages/html-converter`} component={PageHtmlConverter} />
      </Switch>
    </Router>
  )
}


export default App;
