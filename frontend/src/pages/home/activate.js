import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import CreatePost from "../../components/createPost";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import ActivateForm from "./ActivateForm";
import "./style.css";

export default function Activate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = useParams();

  useEffect(() => {
    activateAccount();
  }, []);

  const activateAccount = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/activate`,
        { token },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setSuccess(data.message);
      Cookie.set("userInfo", JSON.stringify({ ...user, verified: true }));
      dispatch({
        type: "VERIFY",
        payload: true,
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  return (
    <div className="home">
      {success && (
        <ActivateForm
          type="success"
          header="Account verified success"
          text={success}
          loading={loading}
        />
      )}
      {error && (
        <ActivateForm
          type="error"
          header="Account verified failed"
          text={error}
          loading={loading}
        />
      )}
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
}
