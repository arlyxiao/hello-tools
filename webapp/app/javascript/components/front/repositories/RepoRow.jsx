import React, { useState } from "react";
import consumer from "../../../channels/consumer";


const RepoRow = function (props) {
  const [syncDone, setSyncDone] = useState(true);
  const name = props.name;

  React.useEffect(() => {
    consumer.subscriptions.create("SyncGithubIssuesChannel", {
      connected() {},

      disconnected() {},

      received(data) {
        if (data.done) {
          setSyncDone(true);
        }
      },
    });
  }, []);

  function removeRepo(name) {
    if (!confirm(`Are you sure to remove ${name}?`)) {
      return;
    }

    const params = {
      name: name,
    };
    fetch(`/repositories`, {
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
    fetch(`/repositories/sync_issues`, {
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
      .finally(function () {});
  }

  return (
    <>
      <tr>
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
            <span className={`${syncDone ? "hide" : ""}`}>
              <i className="fas fa-spinner fa-spin"></i>
            </span>
            <span className={`${syncDone ? "text" : "hide"}`}>Sync Issues</span>
          </button>
        </td>
      </tr>
    </>
  );
};

export default RepoRow;
