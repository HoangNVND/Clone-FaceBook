import React, { useState, useRef } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import {
  Logo,
  Search,
  HomeActive,
  Watch,
  Friends,
  Market,
  Gaming,
  Menu,
  Messenger,
  Notifications,
  ArrowDown,
} from "../../svg";

import { useSelector } from "react-redux";
import SearchMenu from "./SearchMenu";
import AllMenu from "./AllMenu";
import UserMenu from "./userMenu";
import useClickOutside from "../../helpers/clickOutside";
import { Home } from "../../svg";
const color = "#65676b";
export default function Header({ page }) {
  const { user } = useSelector((user) => ({ ...user }));
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const allMenu = useRef(null);
  const usermenu = useRef(null);

  useClickOutside(allMenu, () => {
    setShowAllMenu(false);
  });

  useClickOutside(usermenu, () => {
    setShowUserMenu(false);
  });

  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div
          className="search searchi"
          onClick={() => {
            setShowSearchMenu(true);
          }}
        >
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Facebook"
            className="hide_input"
          />
        </div>
      </div>
      {showSearchMenu && <SearchMenu setShowSearchMenu={setShowSearchMenu} />}
      <div className="header_middle">
        <Link
          to="/"
          className={`middle_icon ${page === "home" ? "active" : ""}`}
        >
          {page === "home" ? (
            <HomeActive color={color} />
          ) : (
            <Home color={color} />
          )}
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Friends color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Watch color={color} />
          <div className="middle_notifications">9+</div>
        </Link>{" "}
        <Link to="/" className="middle_icon hover1">
          <Market color={color} />
        </Link>{" "}
        <Link to="/" className="middle_icon hover1">
          <Gaming color={color} />
        </Link>
      </div>
      <div className="header_right">
        <Link
          to="/profile"
          className={`profile_link hover1 ${
            page === "profile" ? "active_link" : ""
          }`}
        >
          <img src={user?.picture} alt=""></img>
          <span>{user?.first_name}</span>
        </Link>
        <div
          className={`circle_icon hover1 ${showAllMenu && " active_header"}`}
          ref={allMenu}
        >
          <div
            onClick={() => {
              setShowAllMenu((prev) => !prev);
            }}
          >
            <div style={{ transform: "translateY(2px)" }}>
              <Menu />
            </div>
          </div>
          {showAllMenu && <AllMenu />}
        </div>
        <div className="circle_icon hover1">
          <Messenger />
        </div>
        <div className="circle_icon hover1">
          <Notifications />
          <div className="right_notifications">6</div>
        </div>
        <div
          className={`circle_icon hover1 ${showUserMenu && "active_header"}`}
          ref={usermenu}
        >
          <div
            onClick={() => {
              setShowUserMenu((prev) => !prev);
            }}
          >
            <div style={{ transform: "translateY(2px)" }}>
              <ArrowDown />
            </div>
          </div>

          {showUserMenu && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
}
