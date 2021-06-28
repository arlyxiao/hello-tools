import React from "react";

import BaseLayout from "../layouts/BaseLayout";
import "../../styles/front/errors.scss";

const InternalServerError = (props) => {
  return (
    <BaseLayout>
      <div className="error-page container">
        <div className="card">
          <div className="card-body d-flex flex-column justify-content-center align-items-center">
            <h4>Server Error</h4>
            <a href="/">Back to Home</a>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default InternalServerError;
