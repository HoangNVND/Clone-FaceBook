import { Link } from "react-router-dom";
import { useState } from "react";
import Moment from "react-moment";
import "./style.css";
import { Dots, Public } from "../../svg";
import ReactPopup from "./ReactPopup";
import CreateComment from "./CreateComment";
import PostMenu from "./PostMenu";
export default function Post({ post, user, profile }) {
  const infoUser = post.user;
  const [visible, setVisible] = useState(false);
  const [visiblePostMenu, setVisiblePostMenu] = useState(false);
  console.log(post);
  return (
    <div className="post" style={{ width: `${profile && "100%"}` }}>
      <div className="post_header">
        <Link to={`profile/${infoUser.username}`} className="post_header_left">
          <img src={infoUser.picture} alt="profile" />
          <div className="header_col">
            <div className="post_profile_name">
              {infoUser.username}
              <div className="updated_p">
                {post.type == "profilePicture" &&
                  `update ${
                    infoUser.gender === "male" ? "his" : "her"
                  } profile picture `}
                {post.type == "cover" &&
                  `update ${
                    infoUser.gender === "male" ? "his" : "her"
                  } cover picture `}
              </div>
            </div>
            <div className="post_profile_privacy_date">
              <Moment fromNow interval={30}>
                {post.createdAt}
              </Moment>
              <Public color="#828387" />
            </div>
          </div>
        </Link>
        <div
          className="post_header_right hover1"
          onClick={() => {
            setVisiblePostMenu((prev) => !prev);
          }}
        >
          <Dots color="#828387" />
        </div>
      </div>

      {post.background ? (
        <div
          className="post_bg"
          style={{ backgroundImage: `url(${post.background})` }}
        >
          <div className="post_bg_text">{post.text}</div>
        </div>
      ) : post.type === null ? (
        <>
          <div className="post_text">{post.text}</div>
          {post.images && post.images.length && (
            <div
              className={
                post.images.length === 1
                  ? "grid_1"
                  : post.images.length === 2
                  ? "grid_2"
                  : post.images.length === 3
                  ? "grid_3"
                  : post.images.length === 4
                  ? "grid_4"
                  : post.images.length >= 5 && "grid_5"
              }
            >
              {post.images.slice(0, 5).map((image, i) => (
                <img
                  src={image.url}
                  alt="post"
                  key={i}
                  className={`img-${i}`}
                />
              ))}
              {post.images.length > 5 && (
                <div className="more_pics_shadow">
                  +{post.images.length - 5}
                </div>
              )}
            </div>
          )}
        </>
      ) : post.type === "profilePicture" ? (
        <div className="post_profile_wrap">
          <img
            src={post.images[0].url}
            className="post_updated_picture"
            alt=""
          ></img>
        </div>
      ) : (
        <div className="post_cover_wrap">
          <div className="post_updated_cover">
            <img
              src={post.images[0].url}
              className="post_updated_cover"
              alt=""
            ></img>
          </div>
        </div>
      )}
      <div className="post_info">
        <div className="react_count">
          <div className="react_count_imgs">1</div>
          <div className="react_count_num">1</div>
        </div>
        <div className="to_right">
          <div className="comments_count">13 comments</div>
          <div className="share_count">1 share</div>
        </div>
      </div>
      <div className="post_actions">
        <ReactPopup visible={visible} setVisible={setVisible} />
        <div
          className="post_action hover1"
          onMouseOver={() => {
            setTimeout(() => {
              setVisible(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}
        >
          <i className="like_icon" />
          <span>Like</span>
        </div>
        <div className="post_action hover1">
          <i className="comment_icon" />
          <span>Comment</span>
        </div>
        <div className="post_action hover1">
          <i className="share_icon" />
          <span>Share</span>
        </div>
      </div>
      <div className="comments_wrap">
        <div className="comment_order">
          <CreateComment user={user} />
        </div>
      </div>
      {visiblePostMenu && (
        <PostMenu
          userId={user.id}
          postUserId={post.user._id}
          imageLength={post.images?.length}
          setVisiblePostMenu={setVisiblePostMenu}
        />
      )}
    </div>
  );
}
