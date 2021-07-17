import React, { useState } from "react";

import BaseLayout from "../layouts/BaseLayout";
import "../../styles/front/tools.scss";
import Spinner from "../../styles/icons/Spinner";

const HtmlConverter = (props) => {
  const nodeServerHost = props.node_server_host;
  const nodeDataPath = props.node_data_path;
  const [inputValue, setInputValue] = useState("https://douban.com");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  function prepareInputValue() {
    if (!props.currentUser.username) {
      alert("Plase sign in first.");
      return;
    }

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

    return inputValue;
  }

  function handlePDF(event) {
    const inputValue = prepareInputValue();
    if (!inputValue) {
      return;
    }

    fetch(`${nodeServerHost}/html-to-pdf?url=${inputValue}`)
      .then((res) => res.blob())
      .then((blob) => {
        const file = window.URL.createObjectURL(blob);
        setResult(file);
      })
      .finally(() => setIsLoading(false));
  }

  function handleImage(event) {
    const inputValue = prepareInputValue();
    if (!inputValue) {
      return;
    }

    fetch(`${nodeServerHost}/html-to-image?url=${inputValue}`)
      .then((res) => res.json())
      .then((result) => {
        setResult(`${nodeDataPath}${result.url}`);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <BaseLayout {...props}>
      <div className="container">
        <div className="html-converter">
          <div className="form d-flex flex-column align-items-center">
            <div className="input-wrap d-flex flex-column justify-content-center align-items-center">
              <input
                type="text"
                name=""
                value={inputValue}
                onChange={(event) => handleChange(event)}
              />
            </div>

            <div className="button-groups d-flex">
              <button className="btn" type="button" onClick={handlePDF}>
                <span className={`text ${isLoading ? "hide" : ""}`}>
                  HTML To PDF
                </span>
                <span className={`loading ${!isLoading ? "hide" : ""}`}>
                  <Spinner />
                </span>
              </button>

              <button className="btn" type="button" onClick={handleImage}>
                <span className={`text ${isLoading ? "hide" : ""}`}>
                  HTML To Image
                </span>
                <span className={`loading ${!isLoading ? "hide" : ""}`}>
                  <Spinner />
                </span>
              </button>
            </div>

          </div>

          <iframe src={result}></iframe>

        </div>
      </div>
    </BaseLayout>
  );
};

export default HtmlConverter;
