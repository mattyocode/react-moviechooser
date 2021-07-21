import React from "react";
import { FaBars } from "react-icons/fa";

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
            <FaBars />
          </button>
        </div>

        <div className={classes.links_container}>
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
        </div>
        <div className={classes.login_register_container}>
          <ul className={classes.links}>
            <li>
              <a href="/">Login</a>
            </li>
            <li>
              <a href="/">Register</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
