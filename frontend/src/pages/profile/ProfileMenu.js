import React from "react";
import { Link } from "react-router-dom";
import { Dots } from "../../svg";

export default function ProfileMenu() {
  return (
    <div className="profile_menu_wrap">
      <div className="profile_menu">
        <Link to="/" className="profile_menu_active">
          Posts
        </Link>
        <Link to="/" className="hover2">
          About
        </Link>
        <Link to="/" className="hover2">
          Friends
        </Link>
        <Link to="/" className="hover2">
          Photos
        </Link>
        <Link to="/" className="hover2">
          Video
        </Link>
        <Link to="/" className="hover2">
          Check in
        </Link>
        <Link to="/" className="hover2">
          More
        </Link>
        <div className="p10_dots hover3">
          <Dots />
        </div>
      </div>
    </div>
  );
}
