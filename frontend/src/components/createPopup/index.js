import "./style.css";
import { useState, useRef } from "react";
import EmojiPickerBackground from "./EmojiPickerBackground";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";
import useClickOutside from "../../helpers/clickOutside";
import { createPost } from "../../functions/post";
import { uploadImages } from "../../functions/uploadImages";
import PulseLoader from "react-spinners/PulseLoader";
import PostError from "./PostError";
import dataURItoBlob from "../../helpers/dataURItoBlob";

export default function CreatePostPopup({ user, setVisibleCreatePost }) {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState([]);
  const [background, setBackground] = useState("");
  const popup = useRef(null);
  useClickOutside(popup, () => {
    setVisibleCreatePost(false);
  });
  console.log(user);
  const postSubmitHandler = async () => {
    if (background) {
      setLoading(true);
      const response = await createPost(
        null,
        background,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);

      if (response === "ok") {
        setBackground("");
        setText("");
        setVisibleCreatePost(false);
      } else {
        setError(response);
      }
    } else if (image && image.length > 0) {
      setLoading(true);
      const postImage = image.map((img) => {
        return dataURItoBlob(img);
      });
      const path = `${user.username}/post_images`;
      let formData = new FormData();
      formData.append("path", path);
      postImage.forEach((img) => {
        formData.append("images", img);
      });
      const response = await uploadImages(formData, path, user.token);
      const res = await createPost(
        null,
        null,
        text,
        response,
        user.id,
        user.token
      );
      setLoading(false);
      if (res === "ok") {
        setImage([]);
        setText("");
        setVisibleCreatePost(false);
      } else {
        setError(res);
      }
    } else if (text) {
      setLoading(true);
      const response = await createPost(
        null,
        null,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);

      if (response === "ok") {
        setBackground("");
        setText("");
        setVisibleCreatePost(false);
      } else {
        setError(response);
      }
    } else {
    }
  };
  return (
    <div className="blur">
      <div className="postBox" ref={popup}>
        {error && <PostError error={error} setError={setError} />}
        <div className="box_header">
          <div
            className="small_circle"
            onClick={() => {
              setVisibleCreatePost(false);
            }}
          >
            <i className="exit_icon" />
          </div>
          <span>Create Post</span>
        </div>
        <div className="box_profile">
          <img
            src={user?.picture || ""}
            alt="profile_picture"
            className="box_profile_img"
          />
          <div className="box_col">
            <div className="box_profile_name">
              {user.first_name} {user.last_name}
            </div>
            <div className="box_privacy">
              <img src="../../../icons/public.png" alt="public" />
              <span>Public</span>
              <i className="arrowDown_icon" />
            </div>
          </div>
        </div>
        {!showPrev ? (
          <>
            <EmojiPickerBackground
              text={text}
              setText={setText}
              user={user}
              setBackground={setBackground}
              background={background}
            />
          </>
        ) : (
          <ImagePreview
            text={text}
            setText={setText}
            user={user}
            image={image}
            setImage={setImage}
            setShowPrev={setShowPrev}
            error={error}
            setError={setError}
          />
        )}
        <AddToYourPost setShowPrev={setShowPrev} />

        <button
          className="post_submit"
          type="submit"
          onClick={() => {
            postSubmitHandler();
          }}
          disabled={loading}
        >
          {!loading ? (
            "Post"
          ) : (
            <PulseLoader color={"#fff"} loading={loading} size={5} />
          )}
        </button>
      </div>
    </div>
  );
}
