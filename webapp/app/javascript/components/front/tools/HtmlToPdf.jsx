import React, { useState } from "react";

import BaseLayout from "../layouts/BaseLayout";
import "../../styles/front/tools.scss";

const HtmlToPdf = (props) => {
  const nodeServerHost = props.node_server_host
  const [inputValue, setInputValue] = useState("https://douban.com");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  function handleClick(event) {
    if (isLoading) {
      return;
    }

    if (
      !inputValue.startsWith("http://") &&
      !inputValue.startsWith("https://")
    ) {
      return;
    }

    setResult(`/static/loading.html`);
    setIsLoading(true);

    fetch(`${nodeServerHost}/html-to-pdf?url=${inputValue}`)
      .then((res) => res.blob())
      .then((blob) => {
        const file = window.URL.createObjectURL(blob);
        setResult(file);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <BaseLayout>
      <div className="html-to-pdf container">
        <div className="form d-flex flex-column align-items-center">
          <div className="input-wrap d-flex flex-column justify-content-center align-items-center">
            <input
              type="text"
              name=""
              value={inputValue}
              onChange={(event) => handleChange(event)}
            />
          </div>

          <button className="btn" type="button" onClick={handleClick}>
            <span className={`text ${isLoading ? "hide" : ""}`}>
              HTML To PDF
            </span>
            <span className={`loading ${!isLoading ? "hide" : ""}`}>
              <i className="fa fa-spinner fa-spin fa-fw"></i>
            </span>
          </button>

          <iframe src={result}></iframe>
        </div>
      </div>
    </BaseLayout>
  );
};

export default HtmlToPdf;