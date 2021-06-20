import React from "react";
import { Provider } from "react-redux";

import store from "../../store/front";
import Dashboard from "./Dashboard";

const Entry = function (props) {
  return (
    <Provider store={store}>
      <Dashboard {...props} />
    </Provider>
  );
};

export default Entry;
