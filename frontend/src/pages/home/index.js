import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import CreatePost from "../../components/createPost";
import Header from "../../components/header";
import SendVerification from "../../components/header/sendVerification";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import Post from "../../components/post";
import "./style.css";

export default function Home({ setVisibleCreatePost, posts }) {
  const { user } = useSelector((state) => ({ ...state }));
  const middle = useRef(null);
  const [height, setHeight] = useState();
  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, []);

  return (
    <div className="home" style={{ height: `${height + 150}px` }}>
      <Header page="home" />
      <LeftHome user={user} />
      <div className="home_middle" ref={middle}>
        <Stories />
        {user.verified === false && <SendVerification user={user} />}

        <CreatePost user={user} setVisibleCreatePost={setVisibleCreatePost} />
        <div className="posts">
          {posts?.map((post) => (
            <Post post={post} key={post._id} user={user} />
          ))}
        </div>
      </div>
      <RightHome user={user} />
    </div>
  );
}
