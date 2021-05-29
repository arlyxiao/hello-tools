import * as React from "react";


import MainLayout from "../layouts/MainLayout";
import Puppeteer from "../components/Puppeteer";


const Chrome = function() {
  return (
    <>
      <MainLayout>
        <Puppeteer />
      </MainLayout>
    </>
  );
};


export default Chrome;
