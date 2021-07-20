import React from "react";

import BaseLayout from "../layouts/BaseLayout";
import "../../styles/front/users.scss";

const Welcome = (props) => {
  const currentUser = props.currentUser;
  console.log(currentUser);

  return (
    <BaseLayout {...props}>
      <div className="container">
        <div className="repo-page">
          {currentUser.username && (
            <div className="card">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <div className="description">Congratulations.</div>
                <a href="/repositories">Go to repo dashboard.</a>
              </div>
            </div>
          )}

          {!currentUser.username && (
            <div className="card">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <div className="description">
                  In order to publish your repo. Please sign in first.
                </div>
                <a href="/signin">Go to sign in page.</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </BaseLayout>
  );
};

export default Welcome;
