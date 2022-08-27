import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import SearchAccount from "./SearchAccount";
import SendEmail from "./SendEmail";
import CodeVerification from "./CodeVerification";
import ChangePassword from "./ChangePassword";
import Footer from "../../components/login/Footer";
import Cookie from "js-cookie";

import "./style.css";

export default function Reset() {
  const { user } = useSelector((state) => ({ ...state }));

  const [visible, setVisible] = useState(0);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    Cookie.set("userInfo", "");
    navigate("/login");
  };

  return (
    <div className="reset">
      <div className="reset_header">
        <img src="../../../icons/facebook.svg" alt="logo" />
        {user ? (
          <div className="right_reset">
            <Link to="/profile">
              <img src={user.picture} alt="profile" />
            </Link>
            <button className="blue_btn" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/" className="right_reset">
            <button className="blue_btn">Login</button>
          </Link>
        )}
      </div>
      <div className="reset_wrap">
        {visible === 0 && (
          <SearchAccount
            email={email}
            error={error}
            setError={setError}
            setEmail={setEmail}
            setLoading={setLoading}
            setUserInfo={setUserInfo}
            setVisible={setVisible}
          />
        )}
        {visible === 1 && userInfo && (
          <SendEmail
            userInfo={userInfo}
            error={error}
            email={email}
            setError={setError}
            setEmail={setEmail}
            setLoading={setLoading}
            setUserInfo={setUserInfo}
            setVisible={setVisible}
          />
        )}
        {visible === 2 && (
          <CodeVerification
            user={user}
            code={code}
            error={error}
            setCode={setCode}
            setError={setError}
            setLoading={setLoading}
            setVisible={setVisible}
            userInfo={userInfo}
          />
        )}
        {visible === 3 && (
          <ChangePassword
            userInfo={userInfo}
            password={password}
            confirmPassword={confirmPassword}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            error={error}
            setError={setError}
            setLoading={setLoading}
            setVisible={setVisible}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
