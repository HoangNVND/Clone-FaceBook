import React from "react";
import { ArrowRight, Plus } from "../../../svg";
import "./style.css";
import { stories } from "../../../data/home";
import Story from "./Story";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";

export default function Stories() {
  const { user } = useSelector((state) => ({ ...state }));

  const query1175px = useMediaQuery({
    query: "(max-width: 1175px)",
  });

  const query1130px = useMediaQuery({
    query: "(max-width: 1130px)",
  });

  const query960px = useMediaQuery({
    query: "(max-width: 960px)",
  });

  const query885px = useMediaQuery({
    query: "(max-width: 885px)",
  });

  const max = query885px
    ? 5
    : query960px
    ? 4
    : query1130px
    ? 5
    : query1175px
    ? 4
    : stories.length;
  return (
    <div className="stories">
      <div className="create_story_card">
        <img
          src={user?.picture || "../../../images/default_pic.png"}
          className="create_story_img"
        />
        <div className="plus_story">
          <Plus color={"#fff"} />
        </div>
        <div className="story_create_text">Create Story</div>
      </div>
      {stories.slice(0, max).map((story, i) => (
        <Story key={i} story={story} />
      ))}
      <div className="white_circle">
        <ArrowRight color="#65676b" />
      </div>
    </div>
  );
}
