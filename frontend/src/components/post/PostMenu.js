import { useState, useRef } from "react";
import MenuItem from "./MenuItem";
import useClickOutside from "../../helpers/clickOutside";

export default function PostMenu({
  postUserId,
  userId,
  imageLength,
  setVisiblePostMenu,
}) {
  const [test, setTest] = useState(postUserId === userId ? true : false);
  const menuRef = useRef();
  useClickOutside(menuRef, () => {
    setVisiblePostMenu(false);
  });
  return (
    <ul className="post_menu" ref={menuRef}>
      {test && <MenuItem icon="pin_icon" title="Pin Post" />}
      <MenuItem
        icon="save_icon"
        title="Save Post"
        subtitle="Add this to your saved items."
      />
      <div className="line" />
      {test && <MenuItem icon="edit_icon" title="Edit Post" />}
      {!test && (
        <MenuItem
          icon="turnOnNotification_icon"
          title="Turn on Notifications "
        />
      )}
      {imageLength && <MenuItem icon="download_icon" title="Download " />}
      {imageLength && (
        <MenuItem icon="fullscreen_icon" title="Enter Fullscreen" />
      )}
      {test && <MenuItem img="../../../icons/lock.png" title="Edit audience" />}
      {test && (
        <MenuItem
          icon="turnOffNotifications_icon"
          title="Turn off notifications for this post"
        />
      )}
      {test && <MenuItem icon="delete_icon" title="Turn off translation " />}
      {test && <MenuItem icon="date_icon" title="Edit date " />}
      {test && (
        <MenuItem icon="refresh_icon" title="Refresh share attachment " />
      )}
      {test && <MenuItem icon="archive_icon" title="Move to archive " />}
      {test && (
        <MenuItem
          icon="trash_icon"
          title="Move to trash "
          subtitle="Items in your trash are deleted after 30 days"
        />
      )}

      {!test && <div className="line"></div>}
      {!test && (
        <MenuItem
          img="../../../icons/report.png"
          title="Report Post "
          subtitle="I'm concerned about this post."
        />
      )}
    </ul>
  );
}
