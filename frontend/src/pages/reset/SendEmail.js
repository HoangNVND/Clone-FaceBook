import React from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SendEmail({
  userInfo,
  error,
  email,
  setError,
  setVisible,
  setUserInfo,
  setLoading,
}) {
  const sendEmail = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sendResetCodeVerification`,
        { email }
      );
      setVisible(2);
      setError("");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="reset_form dynamic_height">
      <div className="reset_form_header">Reset your Password</div>
      <div className="reset_grid">
        <div className="reset_left">
          <div className="reset_form_text">
            How do want to receive the code to reset your password?
          </div>
          <label htmlFor="email" className="hover1">
            <input
              type="radio"
              id="email"
              name="email"
              value=""
              checked
              readOnly
            />
            <div className="label_col">
              <span>Send code via email</span>
              <span>{userInfo.email}</span>
            </div>
          </label>
        </div>
        {error && <div className="error_text">{error}</div>}
        <div className="reset_right">
          <img src={userInfo.picture} alt="profile" />
          <span>{userInfo.email}</span>
          <span></span>
        </div>
      </div>
      <div className="reset_form_btn">
        <Link to="/login" className="gray_btn">
          Not You ?
        </Link>
        <button
          onClick={() => {
            sendEmail();
          }}
          className="blue_btn"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
