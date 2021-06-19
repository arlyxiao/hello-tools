import React, { useState } from "react";

import BaseLayout from "../layouts/BaseLayout";
import RepoRow from "./RepoRow";
import "../../styles/front/users.scss";

const Dashboard = function (props) {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [repoList, setRepoList] = useState(JSON.parse(props.repoList));

  React.useEffect(() => {
    setToken(props.githubToken);
  }, []);

  function saveGithubToken(token) {
    const params = {
      github_token: token,
    };
    fetch(`/repositories/save_github_token`, {
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

    fetch(`/repositories`, {
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
                  <RepoRow key={name} name={name} formToken={props.formToken} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Dashboard;
