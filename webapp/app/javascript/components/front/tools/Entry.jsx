import React, { useState } from "react";

import BaseLayout from "../layouts/BaseLayout";
import "../../styles/front/tools.scss";

const Entry = (props) => {
  return (
    <BaseLayout {...props}>
      <div className="container">
        <div className="entry-page">
          <div className="card">
            <div className="card-body">
              <a href="/tools/html-converter">Html Converter</a>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <a href="/tools/font-to-base64">Font To Base64</a>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Entry;
