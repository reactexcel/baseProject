import React, { useEffect, useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import styled from "styled-components";
import List from "./components/List";
import Vector from "../../img/Vector.svg";
import { logoutApi } from "../../api/auth";
import { connect } from "react-redux";
import { getProfileAction } from "../../store/actions/auth";

const Header = props => {
  const [search, setSearch] = useState("");
  const [windowData, setWindowData] = useState(null);
  const [isOpen, setIsopen] = useState(false);
  const handleChange = event => {
    event.preventDefault();
    let value = event.target.value.trim();
    setSearch(value);
  };

  useEffect(() => {
    if (window.innerWidth <= 935) {
      setWindowData("small");
    } else {
      setWindowData("big");
    }
    window.addEventListener("resize", onScroll, false);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onScroll, false);
  });

  const onScroll = () => {
    if (window.innerWidth <= 935) {
      setWindowData("small");
    } else {
      setWindowData("big");
    }
  };

  if (!windowData) {
    return (
      <div className="loader-wrapper">
        <div className="loader" />
      </div>
    );
  }

  const clickHandler = () => {
    setIsopen(!isOpen);
  };

  const logoutHandler = () => {
    logoutApi()
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <DIV>
      {windowData === "big" ? (
        <React.Fragment>
          <div className="header-big">Whizle</div>
          <div className="navbar-right-side">
            <nav className="navlinks">
              <NavLink to="#" className="nav">
                Inbox
              </NavLink>
              <NavLink to="#" className="nav">
                Whizles
              </NavLink>
              <List />
            </nav>
            <div className="input-wrapper">
              <input
                className="search"
                value={search}
                onChange={event => handleChange(event)}
                placeholder="Search"
              />
              <img className="search-img" alt="search" src={Vector} />
            </div>

            <NavLink to="/login" className="nav login">
              Login
            </NavLink>
{/* 
            <div className="nav" onClick={logoutHandler}>
              Logout
            </div> */}

            <NavLink to="/sign-up" className="nav">
              Sign Up 
            </NavLink>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="burger" onClick={clickHandler}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line last-line"></div>
          </div>
          <img className="search-img-small" alt="search" src={Vector} />

          <div className="header-big">Whizle</div>

          <NavLink to="/login" className="nav login">
            Login
          </NavLink>

          <div
            className={`navbar-right-side-small ${isOpen ? "" : "none"}`}
            onClick={event => event.stopPropagation()}
          >
            <nav className="navlinks-small">
              <NavLink to="#" className="nav">
                Inbox
              </NavLink>
              <NavLink to="#" className="nav">
                Whizles
              </NavLink>
              <List />
            </nav>
          </div>
        </React.Fragment>
      )}
    </DIV>
  );
};

const DIV = styled.div`
  box-shadow: 0px 4px 15px rgba(218, 218, 218, 0.25);
  width: 100vw;
  height: 80px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  padding: 23px 38px 23px 20px;
  .navlinks {
    display: flex;

    .nav {
      transition: 1s all linear;
      padding-right: 40px;
    }
  }
  .header-big {
  }

  .nav {
    cursor: pointer;
  }

  .ul {
    list-style-type: none;
    position: absolute;
    list-style-type: none;
    right: 12px;
    top: 25px;
    padding: 8px 0 8px 0;
    background-color: white;
    border: 1px solid #e7e7e7;
    border-radius: 3px;
    .li {
      &:hover {
        cursor: pointer;
        background: #ff693a;
        color: white;
      }

      padding: 8px 16px;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
    }
  }

  .relative {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
  }

  .none {
    display: none !important;
  }

  .arrow {
    padding-left: 5px;
  }

  .search {
    background: #f8f8f8;
    border-radius: 20px;
    width: 100%;
    max-width: 290px;
    height: 40px;
    border: none;
    padding: 10px 20px 10px 50px;
  }

  .input-wrapper {
    position: relative;
    margin-right: 30px;
  }

  .search-img {
    position: absolute;
    left: 22px;
    top: 11px;
  }

  .navbar-right-side {
    display: flex;
    align-items: center;
  }

  //****************for small windows**********************************************

  .burger {
    transition: 1s all linear;
    z-index: 1;
    cursor: pointer;
    .line {
      width: 24px;
      height: 2px;
      margin-bottom: 5px;
      display: block;
      background-color: #142948;
    }

    .last-line {
      width: 16px;
      margin-bottom: 0;
    }
  }
  .navbar-right-side-small {
    padding-top: 80px;
    display: flex;
    background-color: #e8e8e8fa;
    position: fixed;
    top: 0;
    left: 0;
    width: 50%;
    height: 100vh;
    max-width: 300px;
    padding-left: 20px;
  }

  .navlinks-small {
    display: flex;
    flex-direction: column;
    .nav {
      cursor: pointer;
      padding: 10px;
    }
  }

  .search-img-small {
    position: absolute;
    left: 53px;
    top: 34px;
  }

  .login {
    margin-right: 10px;
  }
`;


const mapDispatchToProps = {
  getProfileAction
};
export default connect(null, mapDispatchToProps)(Header);
