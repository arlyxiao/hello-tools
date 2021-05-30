
import React, { useState, useRef } from "react";


const Puppeteer = () => {
  const [inputValue, setInputValue] = useState("https://baidu.com");
  const [result, setResult] = useState("");
  let timer: any;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function handleClick(event: any) {
    const url = `http://localhost:4500/html-to-pdf?url=${inputValue}`;

    setResult("http://localhost:4500/static/loading.html");
    clearTimeout(timer);
    timer = setTimeout(function() {
      fetch(url)
        .then( res => res.blob() )
        .then( blob => {
          const file = window.URL.createObjectURL(blob);
          setResult(file);
        });
    }, 500);
    
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
                onClick={ handleClick }>HTML To PDF</button>

        <iframe src={result}></iframe>
      </div>
    </>
  )
}


export default Puppeteer;
