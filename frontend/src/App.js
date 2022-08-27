import { Routes, Route } from "react-router-dom";
import CreatePostPopup from "./components/createPopup";
import Home from "./pages/home";
import Activate from "./pages/home/activate";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Reset from "./pages/reset";
import { useState, useReducer, useEffect } from "react";
import LoggedInRoutes from "./routes/LoggedInRoutes.js";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import { useSelector } from "react-redux";
import axios from "axios";
import { postReducer } from "./functions/reducer";
function App() {
  const [visibleCreatePost, setVisibleCreatePost] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  const [{ loading, posts, error }, dispatch] = useReducer(postReducer, {
    loading: false,
    posts: [],
    error: "",
  });

  useEffect(() => {
    getAllPost();
  }, []);

  const getAllPost = async () => {
    try {
      dispatch({ type: "POST_REQUEST" });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllPost`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({ type: "POST_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "POST_ERROR", payload: error.response.data.message });
    }
  };
  return (
    <div>
      {user && visibleCreatePost && (
        <CreatePostPopup
          user={user}
          setVisibleCreatePost={setVisibleCreatePost}
        />
      )}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route
            path="/"
            element={
              <Home setVisibleCreatePost={setVisibleCreatePost} posts={posts} />
            }
            exact
          />
          <Route
            path="/profile"
            element={<Profile setVisibleCreatePost={setVisibleCreatePost} />}
            exact
          />
          <Route
            path="/profile/:username"
            element={
              <Profile
                setVisibleCreatePost={setVisibleCreatePost}
                posts={posts}
              />
            }
            exact
          />
          <Route path="/activate/:token" element={<Activate />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        <Route path="/reset" element={<Reset />} exact />
      </Routes>
    </div>
  );
}

export default App;
