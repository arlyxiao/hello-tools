
import React, { useState, useRef } from "react";
import md5 from "crypto-js/md5";


const Crypto = () => {
  const [inputValue, setInputValue] = useState("");
  const [md5Value, setMd5Value] = useState("");

  function convert() {
    setMd5Value(md5(inputValue).toString());
  }

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(event.target.value);
  }

  return (
    <>
      <div className="digest panel">
        <textarea name="digest"
                  onChange={ (event: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(event) }></textarea>

        <div className="action-list">
          <button type="button" onClick={() => convert()}>md5</button>
        </div>

        <textarea name="result" defaultValue={md5Value}></textarea>
      </div>
    </>
  )
}


export default Crypto;
