
import React, { useState, useRef } from "react";
import md5 from "crypto-js/md5";
import sha256 from 'crypto-js/sha256';


const Crypto = () => {
  const [inputValue, setInputValue] = useState("");
  const [resultValue, setResultValue] = useState("");

  function convertMd5() {
    setResultValue(md5(inputValue).toString());
  }

  function convertSha256() {
    setResultValue(sha256(inputValue).toString());
  }

  function encodeBase64() {
    setResultValue(btoa(inputValue));
  }

  function decodeBase64() {
    setResultValue(atob(inputValue));
  }

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(event.target.value);
  }

  return (
    <>
      <div className="crypto panel">
        <textarea name="digest"
                  onChange={ (event: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(event) }></textarea>

        <ul className="action-list">
          <li>
            <button type="button" onClick={() => convertMd5()}>Md5</button>
          </li>
          <li>
            <button type="button" onClick={() => convertSha256()}>Sha256</button>
          </li>
          <li>
            <button type="button" onClick={() => encodeBase64()}>Encode Base64</button>
          </li>
          <li>
            <button type="button" onClick={() => decodeBase64()}>Decode Base64</button>
          </li>
        </ul>

        <textarea name="result" readOnly defaultValue={resultValue}></textarea>
      </div>
    </>
  )
}


export default Crypto;
