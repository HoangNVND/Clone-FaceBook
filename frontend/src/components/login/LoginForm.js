import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import classes from "./Login.module.css";
import LoginInput from "../../components/inputs/loginInput";
import * as Yup from "yup";
import RingLoader from "react-spinners/RingLoader";
import axios from "axios";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const loginInfos = {
  email: "Hello",
  password: "",
};

export default function LoginForm({ setVisible }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email Address is required")
      .email("Must be a valid email")
      .max(100),
    password: Yup.string().required("Password is required"),
  });

  const loginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          email,
          password,
        }
      );
      dispatch({ type: "LOGIN", payload: data });
      Cookie.set("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className={classes.login_wrap}>
      <div className={classes.login_1}>
        <img src="../../icons/facebook.svg" alt="logo Facebook" />
        <span>
          Facebook helps you connect and share with the people in your life .
        </span>
      </div>
      <div className={classes.login_2}>
        <div className={classes.login_2_wrap}>
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}
            onSubmit={() => {
              loginSubmit();
            }}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder="Email address or phone number"
                  onChange={handleLoginChange}
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleLoginChange}
                  bottom
                />

                <button type="submit" className="blue_btn">
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <div style={{ textAlign: "center" }}>
            {loading && (
              <RingLoader color="#1876f2" loading={loading} size={30} />
            )}
          </div>
          <Link to="/reset" className={classes.forgot_password}>
            Forgotten password
          </Link>
          {error && <p className={classes.error_text}>{error}</p>}
          <div className={classes.sign_splitter}></div>
          <button
            className={`blue_btn ${classes.open_signup}`}
            onClick={() => {
              setVisible(true);
            }}
          >
            Create Account
          </button>
        </div>
        <Link to="/">
          <b>Create a Page</b> for a celebrity, band or business.
        </Link>
      </div>
    </div>
  );
}
