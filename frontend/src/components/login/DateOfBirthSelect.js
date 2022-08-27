import React from "react";
import { useMediaQuery } from "react-responsive";
import classes from "./DateOfBirthSelect.module.css";

export default function DateOfBirthSelect({
  days,
  months,
  years,
  handleRegisterChange,
  bYear,
  bMonth,
  bDay,
  dateError,
}) {
  const view1 = useMediaQuery({ query: "(min-width: 600px)" });
  const view2 = useMediaQuery({ query: "(min-width: 900px)" });
  const view3 = useMediaQuery({ query: "(min-width:1170px)" });

  return (
    <div>
      <div
        className={classes.regi_grid}
        style={{ marginBottom: `${dateError && !view3 ? "90px" : "0px"}` }}
      >
        <select name="bDay" value={bDay} onChange={handleRegisterChange}>
          {days.map((day, i) => (
            <option value={day} key={i}>
              {day}
            </option>
          ))}
        </select>
        <select name="bMonth" value={bMonth} onChange={handleRegisterChange}>
          {months.map((month, i) => (
            <option value={month} key={i}>
              {month}
            </option>
          ))}
        </select>
        <select name="bYear" value={bYear} onChange={handleRegisterChange}>
          {years.map((year, i) => (
            <option value={year} key={i}>
              {year}
            </option>
          ))}
        </select>
        {dateError && (
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
            {dateError}
          </div>
        )}
      </div>
    </div>
  );
}
