import React, { useState, useRef } from "react";

import Header from "./Header";
import "../../styles/front/shared/layout.scss";

const BaseLayout = ({ children, currentUser }) => {

  React.useEffect(() => {
  }, []);

  return (
    <div className="base-layout">
      <Header currentUser={currentUser} />

      {children}

      <footer></footer>
    </div>
  );
};

export default BaseLayout;
