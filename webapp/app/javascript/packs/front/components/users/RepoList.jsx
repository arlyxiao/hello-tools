import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import "../../styles/users.scss";


const RepoList = function () {

  return (
    <>
      <h1>{kk}</h1>
      <ul>
        <li></li>
      </ul>
    </>
  );
};


document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<RepoList kk={kk} />, document.getElementById("repo-list-page"));
});
