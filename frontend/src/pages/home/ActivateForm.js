import React from "react";
import BarLoader from "react-spinners/BarLoader";

export default function ActivateForm({ type, header, text, loading }) {
  return (
    <div className="blur">
      <div className="popup">
        <div
          className={`popup_header ${
            type === "success" ? "success_text" : "error_text"
          }`}
        >
          {header}
        </div>
        <div className="popup_message">{text}</div>
        <div className="popup_loading">
          <BarLoader color="#1876f2" size={50} loading={loading} />
        </div>
      </div>
    </div>
  );
}
