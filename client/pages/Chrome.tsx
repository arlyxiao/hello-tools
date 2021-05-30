import * as React from "react";


import MainLayout from "../layouts/MainLayout";
import HtmlToPdf from "../components/HtmlToPdf";


const Chrome = function() {
  return (
    <>
      <MainLayout>
        <HtmlToPdf />
      </MainLayout>
    </>
  );
};


export default Chrome;
