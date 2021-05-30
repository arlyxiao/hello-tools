import React, { useState } from "react";


const HtmlConverter = () => {
  const [inputValue, setInputValue] = useState("https://douban.com");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function handleClick(event: any) {
    if (isLoading) {
      return;
    }

    const url = `${process.env.BASE_URL}/html-to-pdf?url=${inputValue}`;

    setResult(`${process.env.BASE_URL}/static/loading.html`);
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
      <div className="chrome panel">
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


export default HtmlConverter;
