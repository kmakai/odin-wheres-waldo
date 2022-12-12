import naruto from "../assets/naruto.png";
import zoidberg from "../assets/Zoidberg.webp";
import aang from "../assets/aang.png";
import Timer from "./Timer";

function Navbar({ time, togglescores }) {
  return (
    <nav>
      <h1 className="title">Find The Character</h1>
      <div className="character-images">
        <div className="character">
          <img src={naruto} alt="naruto" id="faYyCeTaHAe1wTtos9p1" />
        </div>
        <div className="character">
          <img src={zoidberg} alt="zoidberg" id="3WGrquFBeOfTwUCAQdlY" />
        </div>
        <div className="character">
          <img src={aang} alt="aang" id="zp7z5kxCZjzD5TDn8Wol" />
        </div>
      </div>
      <Timer time={time} />
      <button onClick={() => togglescores((prevState) => !prevState)}>
        SCORES
      </button>
    </nav>
  );
}

export default Navbar;
