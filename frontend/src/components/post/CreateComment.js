import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./style.css";
import Picker from "emoji-picker-react";
export default function CreateComment({ user }) {
  const [picker, setPicker] = useState(false);
  const [error, setError] = useState("");
  const [cursorPosition, setCursorPosition] = useState();
  const [commentImage, setCommentImage] = useState();
  const [comment, setComment] = useState("");
  const commentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    commentRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handleEmoji = (e, { emoji }) => {
    const ref = commentRef.current;
    ref.focus();
    const start = comment.substring(0, ref.selectionStart);
    const end = comment.substring(ref.selectionEnd);
    const newText = start + emoji + end;
    setComment(newText);
    setCursorPosition(start.length + emoji.length);
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (file.size > 1024 * 1024 * 5) {
      setError("File size should be less than 5MB");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setCommentImage(e.target.result);
    };
  };
  return (
    <div className="create_comment_wrap">
      <div className="create_comment">
        <img src={user?.picture} alt="profile" />
        <div className="comment_input_wrap">
          {picker && (
            <div className="comment_emoji ">
              <Picker onEmojiClick={handleEmoji} />
            </div>
          )}
          <input
            type="file"
            hidden
            ref={imageRef}
            accept="image/*"
            onChange={handleImage}
          />
          {error && (
            <div className="postError comment_error">
              <div className="postError_error">
                {error}
                <button className="blue_btn" onClick={() => setError("")}>
                  Try Again
                </button>
              </div>
            </div>
          )}
          <input
            type="text"
            ref={commentRef}
            value={comment}
            placeholder="Write a comment..."
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <div
            className="comment_circle_icon hover2"
            onClick={() => {
              setPicker((prev) => !prev);
            }}
          >
            <i className="emoji_icon" />
          </div>
          <div
            className="comment_circle_icon hover2"
            onClick={() => {
              imageRef.current.click();
            }}
          >
            <i className="camera_icon" />
          </div>
          <div className="comment_circle_icon hover2">
            <i className="gif_icon" />
          </div>
          <div className="comment_circle_icon hover2">
            <i className="sticker_icon" />
          </div>
        </div>
      </div>
      {commentImage && (
        <div className="comment_image_preview">
          <img src={commentImage} alt="commentImage" />
          <div className="small_white_circle">
            <i
              className="exit_icon"
              onClick={() => {
                setCommentImage("");
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
