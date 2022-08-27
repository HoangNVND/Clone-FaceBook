import React from "react";
import { Link } from "react-router-dom";
import classes from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={classes.login_footer}>
      <div className={classes.login_footer_wrap}>
        <Link to="/">English(UK)</Link>
        <Link to="/">Tiếng Việt</Link>
        <Link to="/">中文(台灣)</Link>
        <Link to="/">한국어</Link>
        <Link to="/">日本語</Link>
        <Link to="/">Français (France)</Link>
        <Link to="/">ภาษาไทย</Link>
        <Link to="/">Español</Link>
        <Link to="/">Português (Brasil)</Link>
        <Link to="/" className={classes.footer_square}>
          <i className="plus_icon" />
        </Link>
      </div>
      <div className={classes.footer_splitter}></div>
      <div className={classes.login_footer_wrap}>
        <Link to="/">Sign Up</Link>
        <Link to="/">Log in</Link>
        <Link to="/">Messenger</Link>
        <Link to="/">Facebook Lite</Link>
        <Link to="/">Watch</Link>
        <Link to="/">Places</Link>
        <Link to="/">Games</Link>
        <Link to="/">Marketplace</Link>
        <Link to="/">Facebook Pay</Link>
        <Link to="/">Oculus</Link>
        <Link to="/">Portal</Link>
        <Link to="/">Instagram</Link>
        <Link to="/">Bulletin</Link>
        <Link to="/">Local</Link>
        <Link to="/">Fundraisers</Link>
        <Link to="/">Services</Link>
        <Link to="/">Voting Information Centre</Link>
        <Link to="/">Groups</Link>
        <Link to="/">About</Link>
        <Link to="/">Create ad</Link>
        <Link to="/">Create Page</Link>
        <Link to="/">Developers</Link>
        <Link to="/">Careers</Link>
        <Link to="/">Privacy</Link>
        <Link to="/">Cookies</Link>
        <Link to="/">
          AdChoices
          <i className="adChoices_icon"></i>
        </Link>
        <Link to="/">Terms</Link>
        <Link to="/">Help</Link>
      </div>
      <div className={classes.login_footer_wrap}>
        <Link to="/" style={{ fontSize: "12px", marginTop: "10px" }}>
          Meta © 2022
        </Link>
      </div>
    </footer>
  );
}
