import React from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput";
import * as Yup from "yup";
import axios from "axios";

export default function CodeVerification({
  code,
  setCode,
  error,
  setError,
  setLoading,
  setVisible,
  userInfo,
}) {
  const validateCode = Yup.object({
    code: Yup.string()
      .required("Code has been required.")
      .min(5, "Code must be at least 5 characters")
      .max(8, "Code can't be more than 8 characters long."),
  });
  const { email } = userInfo;
  const verifyCode = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/validateResetCode`,
        { email, code }
      );
      setError("");
      setVisible(3);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="reset_form">
      <div className="reset_form_header">Find Your Account</div>
      <div className="splitter_reset"></div>
      <div className="reset_form_text">
        Please enter code that been sent to your email.
      </div>
      <Formik
        enableReinitialize
        initialValues={{ code }}
        validationSchema={validateCode}
        onSubmit={() => {
          verifyCode();
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="code"
              placeholder="Code"
              onChange={(e) => {
                setCode(e.target.value);
              }}
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
