import * as React from "react";

const Header = (props) => {
  const currentUser = props.currentUser;
  const isLogined =
    currentUser && currentUser.username && currentUser.username.length > 0;

  return (
    <header>
      <section className="container">
        <ul>
          <li className="first">
            <a href="/">Home</a>
          </li>

          <li className="">
            <a href="/users/repos">Repo</a>
          </li>
        </ul>

        <ul>
          {isLogined && (
            <li>
              <a href="/signout" data-method="delete" rel="nofollow">
                Signout
              </a>
            </li>
          )}

          {!isLogined && (
            <>
              <li>
                <a href="/signin">Signin</a>
              </li>

              <li>
                <a href="/signup">Signup</a>
              </li>
            </>
          )}
        </ul>
      </section>
    </header>
  );
};

export default Header;
