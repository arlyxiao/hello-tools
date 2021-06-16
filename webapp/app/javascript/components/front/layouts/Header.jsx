import * as React from "react";

const Header = () => {
  return (
    <header>
      <section className="container">
        <ul>
          <li className="first">
            <a href="/">Home</a>
          </li>
        </ul>

        <ul>
          <li>
            <a href="/signin">Signin</a>
          </li>

          <li>
            <a href="/signup">Signup</a>
          </li>
        </ul>
      </section>
    </header>
  );
};

export default Header;
