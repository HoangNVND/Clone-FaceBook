import React from "react";

export default function Shortcut({ link, img, name }) {
  return (
    <a href={link} className="shortcut_item hover1">
      <img src={img} alt={name} />
      <span>{name}</span>
    </a>
  );
}
