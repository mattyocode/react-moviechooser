import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";

import classes from "./MainNavigation.module.css";

import mainLogo from "../../logo.png";

const MainNavigation = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef();
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  useEffect(() => {
    if (showLinks) {
      linksContainerRef.current.style.height = "auto";
    } else {
      linksContainerRef.current.style.height = "0";
    }
  }, [showLinks]);

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
            onClick={toggleLinks}
          >
            <FaBars />
          </button>
        </div>

        <div className={classes.links_container} ref={linksContainerRef}>
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
