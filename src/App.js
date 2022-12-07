import { useEffect } from "react";
import "./App.css";
import conimage from "./assets/conimage.png";

function App() {
  const onClick = (e) => {
    console.log(e.pageX, e.pageY);

    const startX = 345;
    const startY = 240;
    const endX = 395;
    const endY = 320;
    if (
      e.pageX > startX &&
      e.pageX < endX &&
      e.pageY > startY &&
      e.pageY < endY
    ) {
      console.log("inside");
    } else {
      console.log("outside");
    }
  };

  function rev(e) {
    console.log(e.target.id);
  }

  useEffect(() => {
    function handleResize() {
      console.log(window.innerHeight, window.innerWidth);
      console.log("some");
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <div className="App" onClick={onClick}>
      <div className="targetbox1" id="naruto" onClick={rev}></div>
      <div className="targetbox2" id="zoid" onClick={rev}></div>
      <div className="targetbox3" id="aang" onClick={rev}></div>
      <img src={`${conimage}`} alt="con" />
    </div>
  );
}

export default App;
