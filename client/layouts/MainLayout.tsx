import React from "react";

import Header from "./Header";


type Props = {
  children: React.ReactNode
}

const MainLayout = function({ children }: Props) {
  return (
    <div className="main-container">
      <Header />

      { children }
    </div>
  )
};


export default MainLayout;
