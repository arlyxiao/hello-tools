import React, { useState } from "react";

import BaseLayout from "../layouts/BaseLayout";
import "../../styles/front/tools.scss";

const FontToBase64 = (props) => {
  const linkExample =
    "https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Montserrat:wght@400;700&family=Gelasio:wght@400;700&display=swap";
  const [sourceValue, setSourceValue] = useState(linkExample);
  const [resultValue, setResultValue] = useState("");

  function handleChange(event) {
    const inputUrl = event.target.value;
    if (inputUrl.indexOf('https://') === -1) {
      return;
    }

    setSourceValue(inputUrl);

    const errorHandler = function(e) {
      console.info("error: ", e);
      setResultValue("Font URL is incorrect.");
    };

    const fetchFontList = function(url) {
      return fetch(url).then(function (res) {
        return res.text();
      }, errorHandler);
    };

    const convertFonts = function(fontList) {
      const locations = fontList.match(/https:\/\/[^)]+/g);
      const loadedData = locations.map(function (location) {
        return new Promise(function (resolve, reject) {
          fetch(location)
            .then(function (res) {
              return res.blob();
            })
            .then(function (blob) {
              let reader = new FileReader();
              reader.addEventListener("load", function () {
                fontList = fontList.replace(location, this.result);
                resolve();
              });
              reader.readAsDataURL(blob);
            })
            .catch(reject);
        });
      });

      return Promise.all(loadedData).then(function() {
        return fontList;
      });
    };

    const outputResult = function(fontList) {
      setResultValue(fontList);
    };

    fetchFontList(sourceValue)
      .then(convertFonts)
      .then(outputResult)
      .catch(errorHandler);
  }

  return (
    <BaseLayout {...props}>
      <div className="container">
        <div className="font-to-base64">
          <div className="form d-flex flex-column align-items-center">
            <h4>
              Select Fonts from&nbsp;
              <a href="https://fonts.google.com" target="_blank">
                fonts.google.com
              </a>
            </h4>

            <textarea
              className="source"
              placeholder={`${sourceValue}`}
              name="source"
              onChange={(event) => handleChange(event)}
            ></textarea>

            <h4>Result</h4>
            <textarea
              className="result"
              placeholder="No Data"
              name="result"
              readOnly
              defaultValue={resultValue}
            ></textarea>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default FontToBase64;
