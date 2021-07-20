import React, { useRef } from "react";

import BaseLayout from "../layouts/BaseLayout";
import SearchPanel from "../layouts/SearchPanel";
import "../../styles/front/topics.scss";

const Show = (props) => {
  const title = props.title;
  const content = props.content;
  const createdAt = props.created_at;
  const labelText = props.label_text;
  const node = useRef(null);

  React.useEffect(() => {
    var anchors = node.current.querySelectorAll("a");
    for (var i = 0; i < anchors.length; i++) {
      anchors[i].setAttribute("target", "_blank");
    }
  }, []);

  return (
    <BaseLayout {...props}>
      <SearchPanel />

      <div className="container">
        <section className="topic" ref={node}>
          <h4 className="title">{title}</h4>
          <div className="small-text">
            <span className="time">{createdAt}</span>
            {labelText.length > 0 && (
              <>
                <span>, &nbsp;</span>
                <span className="label">{labelText}</span>
              </>
            )}
          </div>
          <div
            className="content-body"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </section>
      </div>
    </BaseLayout>
  );
};

export default Show;
