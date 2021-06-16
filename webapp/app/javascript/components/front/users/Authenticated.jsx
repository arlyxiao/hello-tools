import * as React from "react";

import BaseLayout from "../layouts/BaseLayout";
import "../../styles/front/users.scss";

const Authenticated = (props) => {
  const topics = props.topics;
  const pagination = props.pagination;

  return (
    <BaseLayout {...props}>
      <div className="container">
        <h5>
          Authenticated?
        </h5>
      </div>
    </BaseLayout>
  );
};

export default Authenticated;
