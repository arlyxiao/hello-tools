import * as React from "react";
import "../../styles/front/users.scss";

import BaseLayout from "../layouts/BaseLayout";

const Index = (props) => {
  const topics = props.topics;

  return (
    <BaseLayout>
      <section className="topics container">
        <ul>
          {topics &&
            topics.map((topic) => (
              <li key={topic}>
                <div dangerouslySetInnerHTML={{ __html: topic }}></div>
              </li>
            ))}
        </ul>
      </section>
    </BaseLayout>
  );
};

export default Index;
