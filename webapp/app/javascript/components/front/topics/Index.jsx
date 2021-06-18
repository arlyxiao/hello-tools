import * as React from "react";

import BaseLayout from "../layouts/BaseLayout";
import SearchPanel from "../layouts/SearchPanel";
import "../../styles/front/topics.scss";

const Index = (props) => {
  const topics = props.topics;
  const pagination = props.pagination;

  return (
    <BaseLayout {...props}>
      <SearchPanel />

      <div className="topics container">
        <div className="container">
          <section className="list">
            <ul>
              {topics &&
                topics.map((topic) => (
                  <li key={topic.id}>
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
