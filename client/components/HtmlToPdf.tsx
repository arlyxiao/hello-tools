import React, { useState } from "react";


const HtmlToPdf = () => {
  const [inputValue, setInputValue] = useState("https://baidu.com");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function handleClick(event: any) {
    if (isLoading) {
      return;
    }

    const url = `http://localhost:4500/html-to-pdf?url=${inputValue}`;

    setResult("http://localhost:4500/static/loading.html");
    setIsLoading(true);
    fetch(url)
      .then( res => res.blob() )
      .then( blob => {
        const file = window.URL.createObjectURL(blob);
        setResult(file);
      })
      .finally( () => setIsLoading(false) );
  }

  return (
    <>
      <div className="puppeteer panel">
        <div className="input-wrapper">
          <input type="text"
                name=""
                value={inputValue}
                onChange={ (event: React.ChangeEvent<HTMLInputElement>) => handleChange(event) } />
        </div>

        <button type="button"
                onClick={ handleClick }>
          <span className={`text ${isLoading ? 'hide' : ''}`}>HTML To PDF</span>
          <span className={`loading ${!isLoading ? 'hide' : ''}`}>
            <i className="fa fa-spinner fa-spin fa-fw"></i>
          </span>
        </button>

        <iframe src={result}></iframe>
      </div>
    </>
  )
}


export default HtmlToPdf;
