import React, { useState, useRef } from "react";

const SearchPanel = (props) => {
  const urlParams = new URLSearchParams(window.location.search);
  const [queryText, setQueryText] = useState(urlParams.get("q") ? urlParams.get("q") : "");
  const node = useRef(null);

  React.useEffect(() => {
    node.current.querySelector(".search-input").focus();
  }, []);

  return (
    <>
      <section className="search-panel">
        <div className="container">
          <form className="search-form" action={`/`} method="get" ref={node}>
            <div className="input-wrap d-flex align-items-center">
              <div className="after-input d-flex align-items-center">
                <input
                  className="search-input"
                  type="text"
                  name="q"
                  placeholder="Start searching..."
                  value={queryText}
                  onChange={(e) => setQueryText(e.target.value)}
                />
                <i className="fas fa-search"></i>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default SearchPanel;
