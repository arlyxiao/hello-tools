import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import "../../styles/users.scss";

const Repo = function (props) {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [repoList, setRepoList] = useState(JSON.parse(props.repoList));

  React.useEffect(() => {
    setToken(document.getElementById("github-token").value);
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
        "X-CSRF-Token": document.getElementById("form-token").value,
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
        "X-CSRF-Token": document.getElementById("form-token").value,
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
    const params = {
      name: name,
    };
    fetch(`/repos`, {
      method: "DELETE",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.getElementById("form-token").value,
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
    const params = {
      name: name,
    };
    fetch(`/repos/sync_issues`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.getElementById("form-token").value,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("Sync done");
        }
      })
      .catch((err) => console.error("Error:", err));
  }

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                name="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </td>
            <td>
              <button type="button" onClick={() => saveGithubToken(token)}>
                Save Token
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </td>
            <td>
              <button type="button" onClick={() => addRepo()}>
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <table>
        <tbody>
          {repoList &&
            repoList.map((name) => (
              <tr key={name}>
                <td>{name}</td>
                <td>
                  <button type="button" onClick={() => removeRepo(name)}>
                    Remove
                  </button>
                </td>
                <td>
                  <button type="button" onClick={() => syncIssues(name)}>
                    Sync Issues
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Repo repoList={repoList} />,
    document.getElementById("repo-page")
  );
});
