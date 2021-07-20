import * as React from "react";

import BaseLayout from "../layouts/BaseLayout";
import "../../styles/front/users.scss";

const Authenticated = (props) => {
  return (
    <BaseLayout {...props}>
      <div className="container">
        <div className="form">
          <div className="card">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <div className="description">Authenticated?</div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Authenticated;
