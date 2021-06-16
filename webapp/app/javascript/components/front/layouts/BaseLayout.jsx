import * as React from "react";

import Header from "./Header";


const BaseLayout = ({ children }) => {
  return (
    <div className="base-layout">
      <Header />

      {children}

      <footer></footer>
    </div>
  );
};

export default BaseLayout;
