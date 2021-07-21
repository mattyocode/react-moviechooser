import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

import classes from "./MainNavigation.module.css";

import mainLogo from "../../logo.png";

const MainNavigation = () => {
  const [showLinks, setShowLinks] = useState(false);

  let containerClasses;

  if (showLinks) {
    containerClasses = `${classes.links_container} ${classes.show_links}`;
  } else {
    containerClasses = classes.links_container;
  }

  return (
    <nav className={classes.nav} data-testid="navigation">
      <div className={classes.nav_center}>
        <div className={classes.nav_header}>
          <img
            src={mainLogo}
            alt="moviechooser logo"
            className={classes.logo}
          />
          <button
            className={classes.nav_toggle}
            data-testid="toggle-btn"
            onClick={() => setShowLinks(!showLinks)}
          >
            <FaBars />
          </button>
        </div>

        <div className={containerClasses}>
          <ul>
            <li>
              <a href="/">Browse All</a>
            </li>
            <li>
              <a href="/">Surprise Me</a>
            </li>
            <li>
              <a href="/">My List</a>
            </li>
          </ul>
          <ul className={classes.sign_in}>
            <li>
              <a href="/">Sign in</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
