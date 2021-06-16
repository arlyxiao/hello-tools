import * as React from "react";

import Header from "./Header";


const BaseLayout = ({ children, currentUser }) => {
  return (
    <div className="base-layout">
      <Header currentUser={currentUser} />

      {children}

      <footer></footer>
    </div>
  );
};

export default BaseLayout;
