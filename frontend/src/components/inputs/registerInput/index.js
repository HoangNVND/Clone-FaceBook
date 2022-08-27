import { ErrorMessage, useField } from "formik";
import { useMediaQuery } from "react-responsive";
import "./style.css";
export default function RegisterInput({ placeholder, bottom, ...props }) {
  const [field, meta] = useField(props);
  const desktopView1 = useMediaQuery({ query: "(min-width: 539px)" });
  const desktopView2 = useMediaQuery({ query: "(min-width: 850px)" });
  const desktopView3 = useMediaQuery({ query: "(min-width: 1170px)" });

  const test1 = desktopView3 && field.name === "first_name";
  const test2 = desktopView3 && field.name === "last_name";

  return (
    <div className="input_wrap register_input_wrap">
      <input
        className={meta.touched && meta.error ? "input_error_border" : ""}
        style={{
          width: `${
            desktopView1 &&
            (field.name === "first_name" || field.name === "last_name")
              ? "100%"
              : desktopView1 &&
                (field.name === "email" || field.name === "password")
              ? "400px"
              : "300px"
          }`,
        }}
        type={field.type}
        placeholder={placeholder}
        name={field.name}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
        <div
          className={
            desktopView3 && desktopView2
              ? "input_error input_error_desktop"
              : "input_error"
          }
          style={{
            left: `${test1 ? "-160%" : test2 ? "107%" : ""}`,
          }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={
                desktopView3 && field.name !== "last_name"
                  ? "error_arrow_left"
                  : desktopView3 && field.name === "last_name"
                  ? "error_arrow_right"
                  : !desktopView3 && "error_arrow_bottom"
              }
            ></div>
          )}
        </div>
      )}
      {meta.touched && meta.error && <i className="error_icon" />}
    </div>
  );
}
