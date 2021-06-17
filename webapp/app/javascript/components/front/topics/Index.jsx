import * as React from "react";

import BaseLayout from "../layouts/BaseLayout";
import "../../styles/front/topics.scss";

const Index = (props) => {
  const topics = props.topics;
  const pagination = props.pagination;

  return (
    <BaseLayout {...props}>
      <div className="topics container">
        <div className="container">
          <section>
            <ul>
              {topics &&
                topics.map((topic) => (
                  <li key={topic}>
                    <div dangerouslySetInnerHTML={{ __html: topic.link }}></div>
                    <div className="small-text">
                      <span className="time">{topic.created_at}</span>
                    </div>
                  </li>
                ))}
            </ul>
          </section>

          <section>
            <div dangerouslySetInnerHTML={{ __html: pagination }}></div>
          </section>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Index;
