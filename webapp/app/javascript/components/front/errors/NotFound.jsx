import React from "react";

import BaseLayout from "../layouts/BaseLayout";
import "../../styles/front/errors.scss";

const NotFound = (props) => {
  return (
    <BaseLayout>
      <div className="container">
        <div className="error-page">
          <div className="card">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <h4>The page is sleeping.</h4>
              <a href="/">Back to Home</a>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default NotFound;
