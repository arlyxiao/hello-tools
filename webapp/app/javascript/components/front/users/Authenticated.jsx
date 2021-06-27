import * as React from "react";

import BaseLayout from "../layouts/BaseLayout";
import "../../styles/front/users.scss";

const Authenticated = (props) => {

  return (
    <BaseLayout {...props}>
      <div className="form">
        <h5>
          Authenticated?
        </h5>
      </div>
    </BaseLayout>
  );
};

export default Authenticated;
