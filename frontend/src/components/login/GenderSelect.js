import React from "react";
import classes from "./GenderSelect.module.css";
import useMediaQuery from "react-responsive";
export default function GenderSelect({ handleRegisterChange, genderError }) {
  const view1 = useMediaQuery({ query: "(min-width: 600px)" });
  const view2 = useMediaQuery({ query: "(min-width: 900px)" });
  const view3 = useMediaQuery({ query: "(min-width:1170px)" });

  return (
    <div>
      <div
        className={classes.regi_grid}
        style={{ marginBottom: `${genderError && !view3 ? "80px" : "0px"}` }}
      >
        <label htmlFor="male">
          Male
          <input
            type="radio"
            name="gender"
            id="male"
            value="male"
            onChange={handleRegisterChange}
          />
        </label>
        <label htmlFor="female">
          Female
          <input
            type="radio"
            name="gender"
            id="female"
            value="female"
            onChange={handleRegisterChange}
          />
        </label>
        <label htmlFor="custom">
          Custom
          <input
            type="radio"
            name="gender"
            id="custom"
            value="custom"
            onChange={handleRegisterChange}
          />
        </label>
        {genderError && (
          <div
            className={
              !view3
                ? classes.input_error
                : `${classes.input_error} ${classes.input_error_select_large}`
            }
          >
            <div
              className={
                !view3
                  ? classes.error_arrow_bottom
                  : `${classes.error_arrow_left}`
              }
            ></div>
            {genderError}
          </div>
        )}
      </div>
    </div>
  );
}
