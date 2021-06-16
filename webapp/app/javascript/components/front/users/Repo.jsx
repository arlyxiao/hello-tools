import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";

import BaseLayout from "../layouts/BaseLayout";
import "../../styles/front/users.scss";

const Repo = function (props) {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [syncDone, setSyncDone] = useState(true);
  const [repoList, setRepoList] = useState(JSON.parse(props.repoList));

  React.useEffect(() => {
    setToken(props.githubToken);
  }, []);

  function saveGithubToken(token) {
    const params = {
      github_token: token,
    };
    fetch(`/repos/save_github_token`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": props.formToken,
      },
    })
      .then((res) => {
        if (res.status === 200) {
        } else {
          setToken("");
        }
      })
      .catch((err) => console.error("Error:", err));
  }

  function addRepo() {
    const params = {
      name: name,
    };

    fetch(`/repos`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": props.formToken,
      },
    })
      .then((res) => {
        if (res.status === 201) {
          if (repoList.indexOf(name) === -1) {
            repoList.push(name);
          }
          setRepoList([...repoList]);
        }
      })
      .catch((err) => console.error("Error:", err));
  }

  function removeRepo(name) {
    if (!confirm(`Are you sure to remove ${name}?`)) {
      return;
    }

    const params = {
      name: name,
    };
    fetch(`/repos`, {
      method: "DELETE",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": props.formToken,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          const index = repoList.indexOf(name);
          if (index > -1) {
            repoList.splice(index, 1);
          }
          setRepoList([...repoList]);
        }
      })
      .catch((err) => console.error("Error:", err));
  }

  function syncIssues(name) {
    if (!syncDone) {
      return;
    }

    const params = {
      name: name,
    };

    setSyncDone(false);
    fetch(`/repos/sync_issues`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": props.formToken,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("Sync done");
        }
      })
      .catch((err) => console.error("Error:", err))
      .finally(function() {
        setSyncDone(true);
      });
  }

  return (
    <BaseLayout {...props}>
      <div className="repo-page">
        <div className="container">
          <h5>Github Token</h5>
          <table>
            <tbody>
              <tr>
                <td>
                  <div className="input-wrap d-flex flex-column justify-content-center align-items-center">
                    <div className="after-input">
                      <div className="input-hint hide">Password</div>
                      <input
                        type="text"
                        name="token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                      />
                    </div>
                  </div>
                </td>
              </tr>

              <tr>
                <td>
                  <button
                    className="small btn"
                    type="button"
                    onClick={() => saveGithubToken(token)}
                  >
                    Save Token
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <h5>Add New Repo</h5>
          <table>
            <tbody>
              <tr>
                <td>
                  <div className="input-wrap d-flex flex-column justify-content-center align-items-center">
                    <div className="after-input">
                      <div className="input-hint hide">Repo Name</div>
                      <input
                        type="text"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                </td>
              </tr>

              <tr>
                <td>
                  <button
                    className="small btn"
                    type="button"
                    onClick={() => addRepo()}
                  >
                    Add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <h5 className="repo-list-caption">Repo List</h5>
          <table className="repo-list">
            <tbody>
              {repoList &&
                repoList.map((name) => (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>
                      <button
                        type="button"
                        className="small btn"
                        onClick={() => removeRepo(name)}
                      >
                        Remove
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="small btn"
                        onClick={() => syncIssues(name)}
                      >
                        <span className={`${syncDone ? 'hide' : ''}`}>
                          <i className="fas fa-spinner fa-spin"></i>
                        </span>
                        <span className={`${syncDone ? 'text' : 'hide'}`}>Sync Issues</span>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Repo;
