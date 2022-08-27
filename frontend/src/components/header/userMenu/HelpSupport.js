import React from "react";

export default function HelpSupport({ setVisible }) {
  return (
    <div className="absolute_wrap">
      <div className="absolute_wrap_header">
        <div
          className="circle hover1"
          onClick={() => {
            setVisible(0);
          }}
        >
          <i className="arrow_back_icon" />
        </div>
        Help & Support
      </div>
      <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="help_center_icon" />
        </div>
        <span>Help Center</span>
      </div>
      <div className="mmenu_item hover3">
        <div className="small_circle ">
          <i className="email_icon" />
        </div>
        <span>Support Inbox</span>
      </div>
      <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="info_filled_icon" />
        </div>
        <span>Report & Problem</span>
      </div>
    </div>
  );
}
