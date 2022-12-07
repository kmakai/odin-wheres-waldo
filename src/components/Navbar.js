import naruto from "../assets/naruto.png";
import zoidberg from "../assets/Zoidberg.webp";
import aang from "../assets/aang.png";

function Navbar() {
  return (
    <nav>
      <h1 className="title">Find The Character</h1>
      <div className="character-images">
        <div className="character">
          <img src={naruto} alt="naruto" />
        </div>
        <div className="character">
          <img src={zoidberg} alt="zoidberg" />
        </div>
        <div className="character">
          <img src={aang} alt="aang" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
