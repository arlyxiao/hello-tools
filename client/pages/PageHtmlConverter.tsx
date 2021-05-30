import * as React from "react";


import MainLayout from "../layouts/MainLayout";
import HtmlConverter from "../components/HtmlConverter";


const PageHtmlConverter = function() {
  return (
    <>
      <MainLayout>
        <HtmlConverter />
      </MainLayout>
    </>
  );
};


export default PageHtmlConverter;
