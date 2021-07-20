import React from "react";

import classes from "./MainNavigation.module.css";

import mainLogo from "../../logo.png";

const MainNavigation = () => {
  return (
    <nav className={classes.nav} data-testid="navigation">
      <div className={classes.nav_center}>
        <div className={classes.nav_header}>
          <img
            src={mainLogo}
            alt="moviechooser logo"
            className={classes.logo}
          />
          <button className={classes.nav_toggle} name="menu">
            <i className="fas fa-bars"></i>
          </button>
        </div>

        <ul className={classes.links}>
          <li>
            <a href="/">All Movies</a>
          </li>
          <li>
            <a href="/">Surprise Me</a>
          </li>
          <li>
            <a href="/">My List</a>
          </li>
        </ul>
        <ul className={classes.login_register}>
          <li>
            <a href="/">Login</a>
          </li>
          <li>
            <a href="/">Register</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MainNavigation;
