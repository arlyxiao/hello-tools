import * as React from "react";

import MainLayout from "../layouts/MainLayout";
import Crypto from "../components/Crypto";


const PageCrypto = function() {
  return (
    <>
      <MainLayout>
        <Crypto />
      </MainLayout>
    </>
  );
};


export default PageCrypto;
