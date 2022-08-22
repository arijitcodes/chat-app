import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useGlobalState from "../State/GlobalState";

const Navbar = ({ userSet, myRoom }) => {
  // const myRoom = JSON.parse(localStorage.getItem("chat-app-room")).room || null;
  const [room] = useGlobalState("room");
  const fullURL = window.location.href.split("/");
  const URL = fullURL[0] + "//" + fullURL[2] + "?room=" + room.name;

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          {/* <a className="navbar-brand" href="">
            ChatApp
          </a> */}
          <span className="navbar-brand">ChatApp</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userSet && (
                <>
                  <li className="nav-item">
                    <span
                      className="nav-link active"
                      aria-current="page"
                      href="#"
                    >
                      <CopyToClipboard text={URL}>
                        <button className="btn btn-sm btn-outline-info mx-2">
                          📋 Click to Copy ChatRoom URL 📋
                        </button>
                      </CopyToClipboard>
                    </span>
                  </li>
                  <li className="nav-item">
                    <span
                      className="nav-link active"
                      aria-current="page"
                      href="#"
                    >
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = "/";
                        }}
                      >
                        Leave Room
                      </button>
                    </span>
                  </li>
                </>
              )}
              {/* <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link disabled"
                  href="#"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Disabled
                </a>
              </li> */}
            </ul>
            {/* <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
