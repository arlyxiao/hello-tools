import React, { useRef } from "react";

import BaseLayout from "../layouts/BaseLayout";
import "../../styles/front/topics.scss";

const Show = (props) => {
  const title = props.title;
  const content = props.content;
  const node = useRef(null);

  React.useEffect(() => {
    var anchors = node.current.querySelectorAll('a');
    for (var i = 0; i < anchors.length; i++){
      anchors[i].setAttribute('target', '_blank');
    }
  }, []);

  return (
    <BaseLayout>
      <section className="topic" ref={node}>
        <div className="container">
          <h4>{title}</h4>
          <p dangerouslySetInnerHTML={{ __html: content }}></p>
        </div>
      </section>
    </BaseLayout>
  );
};

export default Show;
