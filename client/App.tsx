import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Basic from "./pages/Basic";
import Chrome from "./pages/Chrome";

const App = () => {

  React.useEffect(() => {
  }, []);


  return (
    <Router>
      <Switch>
        <Route path={`/pages/basic`} component={Basic} exact />
        <Route path={`/pages/chrome`} component={Chrome} />
      </Switch>
    </Router>
  )
}


export default App;
