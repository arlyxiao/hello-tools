import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Basic from "./pages/Basic";


const App = () => {

  React.useEffect(() => {
  }, []);


  return (
    <Router>
      <Switch>
        <Route path={`/pages/basic`} component={Basic} exact />
      </Switch>
    </Router>
  )
}


export default App;
