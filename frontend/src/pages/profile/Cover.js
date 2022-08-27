import { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../helpers/getCroppedImg";
import useClickOutside from "../../helpers/clickOutside";
import { uploadImages } from "../../functions/uploadImages";
import { updateCoverPicture } from "../../functions/user";
import { createPost } from "../../functions/post";
import PulseLoader from "react-spinners/PulseLoader";
import AOS from "aos";
import "aos/dist/aos.css";
import "./style.css";
AOS.init();

export default function Cover({ cover, visiter }) {
  const { user } = useSelector((state) => ({ ...state }));

  const [showCoverMenu, setShowCoverMenu] = useState(false);

  const [coverPicture, setCoverPicture] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const menuRef = useRef(null);
  const slider = useRef(null);
  const cRef = useRef(null);
  useClickOutside(menuRef, () => setShowCoverMenu(false));
  const inputRef = useRef(null);
  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (file.size > 1024 * 1024 * 4.4) {
      setError("File size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setCoverPicture(e.target.result);
    };
  };
  // Crooper
  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
  });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const zoomOut = () => {
    slider.current.stepDown();
    setZoom(slider.current.value);
  };

  const zoomIn = () => {
    slider.current.stepUp();
    setZoom(slider.current.value);
  };

  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(coverPicture, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({
            x: 0,
            y: 0,
          });
          setCoverPicture(img);
        } else {
          return img;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );

  const coverRef = useRef(null);
  const [width, setWidth] = useState();

  useEffect(() => {
    setWidth(coverRef.current.clientWidth);
  }, [window.innerWidth]);

  const updateCoverImage = async () => {
    try {
      setLoading(true);
      let img = await getCroppedImage();
      let blob = await fetch(img).then((b) => b.blob());
      const path = `${user.username}/cover_pictures`;
      let formData = new FormData();
      formData.append("file", blob);
      formData.append("path", path);

      const res = await uploadImages(formData, path, user.token);
      const update_profilePicture = await updateCoverPicture(
        res[0].url,
        user.token
      );
      if (update_profilePicture === "ok") {
        const new_post = await createPost(
          "cover",
          null,
          null,
          res,
          user.id,
          user.token
        );
        if (new_post === "ok") {
          setLoading(false);
          setCoverPicture("");
          cRef.current.src = res[0].url;
        } else {
          setError(new_post);
        }
      } else {
        setLoading(false);
        setError(update_profilePicture);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="profile_cover" ref={coverRef}>
      {coverPicture && (
        <div className="save_changes_cover">
          <div className="save_changes_left">
            <i className="info_icon"></i>
            Your Cover Photo is public
          </div>
          <div className="save_changes_right">
            <button
              className="blue_btn opacity_btn"
              onClick={() => setCoverPicture("")}
            >
              Cancel
            </button>
            <button
              className="blue_btn"
              onClick={() => {
                updateCoverImage();
              }}
            >
              {loading ? (
                <PulseLoader color={"#fff"} size={5} />
              ) : (
                "Save Change"
              )}
            </button>
          </div>
        </div>
      )}
      <input
        type="file"
        ref={inputRef}
        hidden
        accept="image/*"
        onChange={handleImage}
      />
      {error && (
        <div
          className="postError comment_error"
          data-aos="fade-left"
          data-aos-duration="1000"
        >
          <div className="postError_error">
            {error}
            <button className="blue_btn" onClick={() => setError("")}>
              Try Again
            </button>
          </div>
        </div>
      )}
      {coverPicture && (
        <div className="cover_crooper">
          <Cropper
            image={coverPicture}
            crop={crop}
            zoom={zoom}
            aspect={width / 350}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={true}
            objectFit="horizontal-cover"
          />
        </div>
      )}
      {cover && !coverPicture && (
        <img src={cover} alt="cover" className="cover" ref={cRef} />
      )}
      {!visiter && (
        <div className="update_cover_wrapper">
          <div
            className="open_cover_update"
            onClick={() => {
              setShowCoverMenu((prev) => !prev);
            }}
          >
            <i className="camera_filled_icon" />
            Add Cover Photo
          </div>
          {showCoverMenu && (
            <div className="open_cover_menu" ref={menuRef}>
              <div className="open_cover_menu_item hover1">
                <i className="photo_icon"></i>
                Select Photo
              </div>
              <div
                className="open_cover_menu_item hover1"
                onClick={() => {
                  inputRef.current.click();
                }}
              >
                <i className="upload_icon"></i>
                Upload Photo
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
