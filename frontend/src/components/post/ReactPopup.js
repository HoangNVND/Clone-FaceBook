import "./style.css";
const reactArray = [
  { name: "like", image: "../../../reacts/like.gif" },
  { name: "love", image: "../../../reacts/love.gif" },
  { name: "haha", image: "../../../reacts/haha.gif" },
  { name: "wow", image: "../../../reacts/wow.gif" },
  { name: "sad", image: "../../../reacts/sad.gif" },
  { name: "angry", image: "../../../reacts/angry.gif" },
];
export default function ReactPopup({ visible, setVisible }) {
  return (
    <>
      {visible && (
        <div
          className="reacts_popup"
          onMouseOVer={() => {
            setTimeout(() => {
              setVisible(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}
        >
          {reactArray.map((react, index) => (
            <div className="react" key={index}>
              <img src={react.image} alt="react" />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
