import React, { useState, useRef } from "react";

import Header from "./Header";
import Footer from "./Footer";
import "../../styles/front/shared/layout.scss";

const BaseLayout = ({ children, currentUser }) => {

  React.useEffect(() => {
  }, []);

  return (
    <div className="base-layout">
      <Header currentUser={currentUser} />

      <main>
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default BaseLayout;
