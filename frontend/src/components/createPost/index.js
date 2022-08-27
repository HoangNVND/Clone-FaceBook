import React from "react";
import "./style.css";
import { Feeling, LiveVideo, Photo } from "../../svg";
export default function CreatePost({ user, setVisibleCreatePost, profile }) {
  return (
    <div className="createPost">
      <div className="createPost_header">
        <img src={user?.picture} alt="profile" />
        <div
          className="open_post hover2"
          onClick={() => {
            setVisibleCreatePost(true);
          }}
        >
          What's on your mind, {user?.first_name}
        </div>
      </div>
      <div className="create_splitter"></div>
      <div className="createPost_body">
        <div className="createPost_icon hover1">
          <LiveVideo color="#f3425f" />
          Live Video
        </div>
        <div className="createPost_icon hover1">
          <Photo color="#4bbf67" />
          Photo/video
        </div>
        {profile ? (
          <div className="createPost_icon hover1">
            <i className="lifeEvent_icon" />
            Life Event
          </div>
        ) : (
          <div className="createPost_icon hover1">
            <Feeling color="#f7b298" />
            Feeling/Activity
          </div>
        )}
      </div>
    </div>
  );
}
