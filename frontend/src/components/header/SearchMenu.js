import React, { useEffect, useRef, useState } from "react";
import { Return, Search } from "../../svg";
import useClickOutside from "../../helpers/clickOutside";

export default function SearchMenu({ setShowSearchMenu }) {
  const [iconVisible, setIconVisible] = useState(true);
  const color = "#65676b";
  const menu = useRef(null);
  const input = useRef(null);

  useClickOutside(menu, () => {
    setShowSearchMenu(false);
  });
  useEffect(() => {
    input.current.focus();
  }, []);
  return (
    <div className="header_left search_area scrollbar" ref={menu}>
      <div className="search_wrap">
        <div className="header_logo">
          <div
            className="circle hover1"
            onClick={() => {
              setShowSearchMenu(false);
            }}
          >
            <Return color={color} />
          </div>
        </div>
        <div
          className="search"
          onClick={() => {
            input.current.focus();
          }}
        >
          {iconVisible && (
            <div>
              <Search color={color} />
            </div>
          )}
          <input
            type="text"
            className=""
            placeholder="Search Facebook"
            ref={input}
            onFocus={() => {
              setIconVisible(false);
            }}
            onBlur={() => {
              setIconVisible(true);
            }}
          />
        </div>
      </div>
      <div className="search_history_header">
        <span>Recent Search</span>
        <a>Edit</a>
      </div>
      <div className="search_history"></div>
      <div className="search_result"></div>
    </div>
  );
}
