import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import { profileReducer } from "../../functions/reducer";
import axios from "axios";
import Header from "../../components/header";
import Cover from "./Cover";
import "./style.css";
import ProfilePictureInfos from "./ProfilePictureInfos";
import ProfileMenu from "./ProfileMenu";
import PeopleYouMayKnow from "./PeopleYouMayKnow";
import CreatePost from "../../components/createPost";
import GridPost from "./GridPost";
import Post from "../../components/post";
import Photos from "./Photos";
import Friends from "./Friends";
import { Link } from "react-router-dom";

export default function Profile({ setVisibleCreatePost }) {
  const [photos, setPhotos] = useState({});
  const { username } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const userName = username === undefined ? user.username : username;
  const [{ loading, profile, error }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: "",
  });
  useEffect(() => {
    getProfile();
  }, [userName]);

  let visiter = userName === user.username ? false : true;
  const path = `${userName}/*`;
  const max = 30;
  const sort = "desc";

  const getProfile = async () => {
    try {
      dispatch({ type: "PROFILE_REQUEST" });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (data.ok === false) {
        navigate("/profile");
      } else {
        try {
          const images = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/listImages`,
            { path, sort, max },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setPhotos(images.data);
        } catch (error) {
          console.log(error);
        }
        dispatch({ type: "PROFILE_SUCCESS", payload: data });
      }
    } catch (error) {
      dispatch({ type: "PROFILE_ERROR", payload: error.response.data.message });
    }
  };
  return (
    <div>
      <Header page="profile" />
      <div className="profile_top">
        <div className="profile_container">
          <Cover cover={profile.cover} visiter={visiter} />
          <ProfilePictureInfos
            profile={profile}
            visiter={visiter}
            photos={photos.resources}
          />
          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <PeopleYouMayKnow />
            <div className="profile_grid">
              <div className="profile_left">
                <Photos userName={userName} user={user} photos={photos} />
                <Friends friends={profile.friends} />
                <div className="relative_fb_copyright">
                  <Link to="/">Privacy </Link>
                  <span>. </span>
                  <Link to="/">Terms </Link>
                  <span>. </span>
                  <Link to="/">Advertise </Link>
                  <span>. </span>
                  <Link to="/">
                    Ad Choices <i className="ad_choices_icon"></i>
                  </Link>
                  <span>. </span>
                  <Link to="/">Cookies </Link>
                  <span>. </span>
                  <Link to="/">More </Link>
                  <span>. </span>
                  <br />
                  <span>Meta © 2022</span>
                </div>
              </div>
              <div className="profile_right">
                {!visiter && (
                  <CreatePost
                    user={user}
                    profile
                    setVisibleCreatePost={setVisibleCreatePost}
                  />
                )}
                <GridPost />
                <div className="posts">
                  {profile.posts && profile.posts.length ? (
                    profile.posts.map((post, i) => (
                      <Post key={i} user={user} post={post} profile />
                    ))
                  ) : (
                    <div className="no_posts">No posts Available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
