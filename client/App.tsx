
import * as React from "react";

import Basic from "./pages/Basic";


interface Props {
   name:
    string
}

class App extends React.Component<Props> {
  render() {
    const { name } = this.props;
    return (
      <>
        <Basic />
      </>
    );
  }
}

export default App;
