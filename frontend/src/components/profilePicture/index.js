import React, { useRef, useState } from "react";
import "./style.css";
import UpdateProfilePicture from "./UpdateProfilePicture";
import useClickOutside from "../../helpers/clickOutside";
import { useSelector } from "react-redux";

export default function ProfilePicture({ setShow, pRef, photos }) {
  const refInput = useRef(null);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  const uploadRef = useRef(null);

  // useClickOutside(uploadRef, () => {
  //   setShow(false);
  // });

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (file.size > 1024 * 1024 * 4.4) {
      setError("File size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImage(e.target.result);
    };
  };

  return (
    <div className="blur">
      <input
        type="file"
        ref={refInput}
        hidden
        onChange={handleImage}
        accept="image/*"
      />
      <div className="postBox pictureBox" ref={uploadRef}>
        <div className="box_header">
          <div
            className="small_circle"
            onClick={() => {
              setShow(false);
            }}
          >
            <i className="exit_icon"></i>
          </div>
          <span>Update Profile Picture</span>
        </div>
        <div className="update_picture_wrap">
          <div className="update_picture_buttons">
            <button
              className="light_blue_btn"
              onClick={() => {
                refInput.current.click();
              }}
            >
              <i className="plus_icon filter_blue" />
              Upload Photo
            </button>
            <button className="gray_btn">
              <i className="frame_icon" />
              Add Frame
            </button>
          </div>
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
          <div className="old_pictures_wrap scrollbar">
            <h4>Your Profile Picture</h4>
            <div className="old_pictures">
              {photos
                .filter(
                  (img) => img.folder === `${user.username}/profile_pictures`
                )
                .map((photo) => (
                  <img
                    src={photo.secure_url}
                    alt=""
                    key={photo.public_id}
                    style={{ width: "100px" }}
                    onClick={() => setImage(photo.secure_url)}
                  />
                ))}
            </div>
            <h4>Other Picture</h4>
            <div className="old_pictures">
              {photos
                .filter(
                  (img) => img.folder === `${user.username}/profile_pictures`
                )
                .map((photo) => (
                  <img
                    src={photo.secure_url}
                    alt=""
                    key={photo.public_id}
                    style={{ width: "100px" }}
                    onClick={() => setImage(photo.secure_url)}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      {image && (
        <UpdateProfilePicture
          setImage={setImage}
          image={image}
          setShow={setShow}
          setError={setError}
          pRef={pRef}
        />
      )}
    </div>
  );
}
