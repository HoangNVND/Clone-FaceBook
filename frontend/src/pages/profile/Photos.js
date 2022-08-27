import { useNavigate } from "react-router-dom";

export default function Photos({ userName, user, photos }) {
  const navigate = useNavigate();

  return (
    <div className="profile_card">
      <div className="profile_card_header">
        Photos
        <div className="profile_header_link">See all Photos</div>
      </div>
      <div className="profile_card_count">
        {photos.total_count === 0
          ? ""
          : photos.total_count === 1
          ? "1 Photo"
          : `${photos.total_count} Photos`}
      </div>
      <div className="profile_card_grid">
        {photos.resources &&
          photos.resources.slice(0, 9).map((img) => (
            <div className="profile_photo_card" key={img.asset_id}>
              <img src={img.secure_url} alt="Profile" />
            </div>
          ))}
      </div>
    </div>
  );
}
