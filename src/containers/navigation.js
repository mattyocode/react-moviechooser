import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router";
import { Modal, Navbar } from "../components";
import { AuthForm } from "./auth-form";
import { useSelector } from "react-redux";

import { elementScrollIntoView } from "seamless-scroll-polyfill";
import mainLogo from "../assets/png/logo.png";

export function NavbarContainer({ linksData }) {
  const [showLinks, setShowLinks] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const user = useSelector((state) => state.auth.auth);

  let loggedInGreeting;
  if (user.account) {
    loggedInGreeting = `Hi, ${
      user.account.username ||
      user.account.email.substr(0, user.account.email.indexOf("@"))
    }`;
  }

  const openAuthHandler = () => {
    if (!location.pathname.includes("/auth/")) {
      // history.replace(`${location.pathname}#auth`);
      setAuthOpen(true);
    } else {
      history.push("/auth/login");
    }
  };

  const closeAuthHandler = () => {
    history.replace(`${location.pathname}`);
    setAuthOpen(false);
  };

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  const closeLinks = () => {
    setShowLinks(false);
  };

  const handleLogout = () => {
    setAuthOpen(true);
  };

  useEffect(() => {
    if (location.hash && location.hash !== "#auth") {
      setTimeout(() => {
        let elem = document.getElementById(location.hash.slice(1));
        if (elem) {
          elementScrollIntoView(
            document.querySelector(`#${location.hash.slice(1)}`),
            { behavior: "smooth", block: "center", inline: "center" }
          );
        } else {
          window.scrollTo({ top: 0, left: 0 });
        }
      }, 1000);
    }
  }, [location]);

  useEffect(() => {
    if (location.hash && location.hash === "#auth") {
      setAuthOpen(true);
    }
  }, [location.hash]);

  return (
    <>
      {authOpen && (
        <Modal openState={authOpen} closeModal={closeAuthHandler}>
          <AuthForm formTypeInitial={"login"} closeSelf={setAuthOpen} />
        </Modal>
      )}
      <Navbar>
        <Navbar.Header>
          <Navbar.Logo to="/" src={mainLogo} alt="Movie Chooser" />
          <Navbar.ToggleBtn isOpen={showLinks} togglefn={toggleLinks} />
        </Navbar.Header>
        {linksData && (
          <Navbar.Links showLinks={showLinks} closefn={closeLinks}>
            {linksData.map((link) => {
              if (!link.authRequired || user.account) {
                return (
                  <li key={link.id} onClick={toggleLinks}>
                    <Navbar.NavbarLink
                      to={link.url}
                      text={link.text}
                      activeClassName={link.activeClass}
                      highlight={link.highlight}
                    />
                  </li>
                );
              } else {
                return null;
              }
            })}
            {!user.account ? (
              <li>
                <Navbar.NavbarBtn
                  id={0}
                  actionFn={openAuthHandler}
                  activeClassName={"active"}
                  highlight={true}
                >
                  Sign In
                </Navbar.NavbarBtn>
              </li>
            ) : (
              <li>
                <Navbar.NavbarBtn
                  id={10}
                  actionFn={handleLogout}
                  activeClassName={"active"}
                  highlight={false}
                >
                  {loggedInGreeting}
                </Navbar.NavbarBtn>
              </li>
            )}
          </Navbar.Links>
        )}
      </Navbar>
    </>
  );
}
