import EmojiPickerBackground from "./EmojiPickerBackground";
import { useRef } from "react";
export default function ImagePreview({
  user,
  text,
  setText,
  image,
  setImage,
  setShowPrev,
  error,
  setError,
}) {
  const imageInputRef = useRef();
  const handleImage = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img) => {
      if (!img.type.match("image.*")) {
        setError("Only images are allowed");
        files = files.filter((item) => item.name !== img.name);
        return;
      } else if (img.size > 1024 * 1024 * 5) {
        setError("Image size should be less than 5MB");
        files = files.filter((item) => item.name !== img.name);
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (readerEvent) => {
        setImage((images) => [...images, readerEvent.target.result]);
      };
    });
  };

  return (
    <div className="overflow_a scrollbar">
      <EmojiPickerBackground text={text} setText={setText} user={user} type2 />
      <div className="add_pics_wrap">
        <input
          type="file"
          accept="image/*"
          multiple
          hidden
          ref={imageInputRef}
          onChange={handleImage}
        />
        {image && image.length > 0 ? (
          <div className="add_pics_inside1 p0">
            <div className="prev_actions">
              <button className="hover1">
                <i className="edit_icon" />
                Edit
              </button>
              <button
                className="hover1"
                onClick={() => {
                  imageInputRef.current.click();
                }}
              >
                <i className="addPhoto_icon" />
                Add Photos/Videos
              </button>
            </div>
            <div
              className="small_white_circle"
              onClick={() => {
                setImage([]);
              }}
            >
              <i className="exit_icon" />
            </div>
            <div
              className={
                image.length === 1
                  ? "preview1"
                  : image.length === 2
                  ? "preview2"
                  : image.length === 3
                  ? "preview3"
                  : image.length === 4
                  ? "preview4"
                  : image.length === 5
                  ? "preview5"
                  : image.length % 2 === 0
                  ? "preview6"
                  : "preview6 singular_grid"
              }
            >
              {image.map((img, index) => (
                <img src={img} alt="preview" key={index} />
              ))}
            </div>
          </div>
        ) : (
          <div className="add_pics_inside1">
            <div
              className="small_white_circle"
              onClick={() => {
                setShowPrev(false);
              }}
            >
              <i className="exit_icon" />
            </div>
            <div
              className="add_col"
              onClick={() => {
                imageInputRef.current.click();
              }}
            >
              <div className="add_circle">
                <i className="addPhoto_icon" />
              </div>
              <span>Add Photos/Videos</span>
              <span>or drag and drop</span>
            </div>
          </div>
        )}
        <div className="add_pics_inside2">
          <div className="add_circle">
            <i className="phone_icon"></i>
          </div>
          <div className="mobile_text">Add Photos from your mobile device.</div>
          <span className="addPhone_btn">Add</span>
        </div>
      </div>
    </div>
  );
}
