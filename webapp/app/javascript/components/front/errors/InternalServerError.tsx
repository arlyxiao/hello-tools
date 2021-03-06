import React from "react";

import BaseLayout from "../layouts/BaseLayout";
import "../../styles/front/errors.scss";

const InternalServerError = (props) => {
  return (
    <BaseLayout {...props}>
      <div className="container">
        <div className="error-page">
          <div className="card">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <div className="description">The page is sleeping.</div>
              <a href="/">Back to Home</a>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default InternalServerError;
