import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SettingPrivacy from "./SettingPrivacy";
import HelpSupport from "./HelpSupport";
import DisplayAccessibility from "./DisplayAccessibility";
import { useDispatch } from "react-redux";
import Cookie from "js-cookie";
export default function UserMenu({ user }) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(0);
  const navigate = useNavigate();

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    Cookie.set("userInfo", "");
    navigate("/login");
  };
  return (
    <div className="mmenu">
      {visible === 0 && (
        <div>
          <Link to="/" className="mmenu_header hover3">
            <img src={user?.picture} alt={user.first_name} />
            <div className="mmenu_col">
              <span>
                {user?.first_name} {user?.last_name}
              </span>
              <span>See your profile</span>
            </div>
          </Link>
          <div className="mmenu_splitter"></div>
          <div className="mmenu_main hover3">
            <div className="small_circle">
              <i className="report_filled_icon"></i>
            </div>
            <div className="mmenu_col">
              <div className="mmenu_span1">Give Feed Back</div>
              <div className="mmenu_span2">Help us improve Facebook</div>
            </div>
          </div>
          <div className="mmenu_splitter"></div>
          <div
            className="mmenu_item hover3"
            onClick={() => {
              setVisible(1);
            }}
          >
            <div className="small_circle">
              <i className="settings_filled_icon "></i>
            </div>
            <span>Setting & privacy</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          <div
            className="mmenu_item hover3"
            onClick={() => {
              setVisible(2);
            }}
          >
            <div className="small_circle">
              <i className="help_filled_icon"></i>
            </div>
            <span>Help & Support</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          <div
            className="mmenu_item hover3"
            onClick={() => {
              setVisible(3);
            }}
          >
            <div className="small_circle">
              <i className="dark_filled_icon"></i>
            </div>
            <span>Display & Accessibility</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          <div className="mmenu_item hover3" onClick={logout}>
            <div className="small_circle">
              <i className="logout_filled_icon "></i>
            </div>
            <span>Logout</span>
          </div>
        </div>
      )}
      {visible === 1 && <SettingPrivacy setVisible={setVisible} />}
      {visible === 2 && <HelpSupport setVisible={setVisible} />}
      {visible === 3 && <DisplayAccessibility setVisible={setVisible} />}
    </div>
  );
}
