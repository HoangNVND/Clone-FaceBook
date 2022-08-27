import Footer from "../../components/login/Footer";
import LoginForm from "../../components/login/LoginForm";
import RegisterForm from "../../components/login/RegisterForm";
import classes from "./Login.module.css";
import { useState } from "react";

export default function Login() {
  const [visible, setVisible] = useState(false);

  return (
    <div className={classes.Login}>
      <LoginForm setVisible={setVisible} />
      {visible && <RegisterForm setVisible={setVisible} />}
      <Footer />
    </div>
  );
}
