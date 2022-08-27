import { Form, Formik } from "formik";
import React, { useState } from "react";
import RegisterInput from "../inputs/registerInput";
import * as Yup from "yup";
import classes from "./RegisterForm.module.css";
import DateOfBirthSelect from "./DateOfBirthSelect";
import GenderSelect from "./GenderSelect";
import RingLoader from "react-spinners/RingLoader";
import axios from "axios";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const userInfo = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  bYear: new Date().getFullYear(),
  bMonth: new Date().getMonth() + 1,
  bDay: new Date().getDay(),
  gender: "",
};

export default function RegisterForm({ setVisible }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState(userInfo);

  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;

  const yearTemp = new Date().getFullYear();

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const daysInMonth = new Date(bYear, bMonth, 0).getDate();

  const years = Array.from(new Array(108), (val, index) => yearTemp - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const days = Array.from(new Array(daysInMonth), (val, index) => 1 + index);

  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("What is your first name?")
      .min(2, "First Name must be between 2 and 20 characters")
      .max(20, "First Name must be between 2 and 20 characters")
      .matches(/^[a-zA-Z]+$/, "Numbers and special characters are not allowed"),
    last_name: Yup.string()
      .required("What is your last name?")
      .min(2, "Last Name must be between 2 and 20 characters")
      .max(20, "Last Name must be between 2 and 20 characters")
      .matches(/^[a-zA-Z]+$/, "Numbers and special characters are not allowed"),
    email: Yup.string()
      .required(
        "You'll use this when you log in and if you ever need to reset your password"
      )
      .email("Enter your email address"),
    password: Yup.string()
      .required("Enter your password")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters"),
  });

  const [dateError, setDateError] = useState("");
  const [genderError, setGenderError] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const registerSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          first_name,
          last_name,
          email,
          password,
          bYear,
          bMonth,
          bDay,
          gender,
        }
      );
      setError("");
      setSuccess(data.message);
      setLoading(false);

      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: rest });
        Cookie.set("user", JSON.stringify(rest));
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  return (
    <div className={classes.blur}>
      <div className={classes.register}>
        <div className={classes.register_header}>
          <i
            className="exit_icon"
            onClick={() => {
              setVisible(false);
            }}
          />
          <span>Sign up</span>
          <span>It is quick and easy</span>
        </div>

        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            let current_date = new Date();
            let picked_date = new Date(bYear, bMonth - 1, bDay);
            let atLeast14 = new Date(1970 + 14, 0, 1);
            let noMoreThan70 = new Date(1970 + 70, 0, 1);
            if (current_date - picked_date < atLeast14) {
              setDateError(
                "it looks like you(ve entered the wrong info.Please make sure that you use your real date of birth."
              );
            } else if (current_date - picked_date > noMoreThan70) {
              setDateError(
                "it looks like you(ve entered the wrong info.Please make sure that you use your real date of birth."
              );
            } else if (gender === "") {
              setDateError("");
              setGenderError(
                "Please choose a gender. You can change who can see this later."
              );
            } else {
              setDateError("");
              setGenderError("");
              registerSubmit();
            }
          }}
        >
          {(formik) => (
            <Form className={classes.register_form}>
              <div className={classes.regi_line}>
                <RegisterInput
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="text"
                  placeholder="Surname"
                  name="last_name"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className={classes.regi_line}>
                <RegisterInput
                  type="email"
                  placeholder="Email or Mobile Number"
                  name="email"
                  onChange={handleRegisterChange}
                />
              </div>

              <div className={classes.regi_line}>
                <RegisterInput
                  type="password"
                  placeholder="New password"
                  name="password"
                  onChange={handleRegisterChange}
                />
              </div>

              <div className={classes.regi_col}>
                <div className={classes.regi_line_header}>
                  Date of birth <i className="info_icon" />
                </div>
                <DateOfBirthSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={days}
                  months={months}
                  years={years}
                  dateError={dateError}
                  handleRegisterChange={handleRegisterChange}
                />
              </div>

              <div className={classes.regi_col}>
                <div className={classes.regi_line_header}>
                  Gender <i className="info_icon" />
                </div>
                <GenderSelect
                  handleRegisterChange={handleRegisterChange}
                  genderError={genderError}
                />
              </div>
              <div className={classes.regi_infos}>
                By clicking Sign Up, you agree to our{" "}
                <span>Terms, Data Policy &nbsp;</span> and{" "}
                <span>Cookie Policy</span>. You may receive SMS Notifications
                from us and can opt out any time.
              </div>
              <div className={classes.regi_btn_wrapper}>
                <button
                  type="submit"
                  className={`blue_btn ${classes.open_signup}`}
                >
                  Sign Up
                </button>
              </div>
              <RingLoader color="#1876f2" loading={loading} size={30} />
              {error && <div className={classes.error_text}>{error}</div>}
              {success && <div className={classes.success_text}>{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
