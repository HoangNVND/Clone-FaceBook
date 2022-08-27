import React from "react";
import { Formik, Form, validateYupSchema } from "formik";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ChangePassword({
  userInfo,
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
  error,
  setError,
  setLoading,
}) {
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const { email } = userInfo;
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/changePassword`,
        { email, password }
      );
      setError("");
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  const validatePassword = Yup.object({
    password: Yup.string()
      .required("Enter your password")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters"),
    confirmPassword: Yup.string()
      .required("Confirm password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  return (
    <div className="reset_form">
      <div className="reset_form_header">Change Password</div>
      <div className="splitter_reset"></div>
      <div className="reset_form_text">Please enter new password.</div>
      <Formik
        enableReinitialize
        initialValues={{ password, confirmPassword }}
        validationSchema={validatePassword}
        onSubmit={() => {
          handleSubmit();
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="password"
              name="password"
              placeholder="New Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              bottom
            />

            <LoginInput
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              bottom
            />

            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btn">
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
