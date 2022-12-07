import { useEffect, React, useState } from "react";
import "./App.css";
import conimage from "./assets/conimage.png";
import Navbar from "./components/Navbar";
import CharSelect from "./components/CharSelect";

function App() {
  const [point, setPoint] = useState({ x: null, y: null });
  const onClick = (e) => {
    console.log(e.pageX, e.pageY);
    setPoint({
      x: e.pageX,
      y: e.pageY,
    });

    document.querySelector(".char-select").classList.toggle("hidden");
    setTimeout(() => {
      document.querySelector(".char-select").classList.toggle("hidden");
    }, 3000);

    console.log(document.querySelector(".targetbox1").getBoundingClientRect());
    document.querySelector(".targetbox2").remove();
    // const startX = 345;
    // const startY = 240;
    // const endX = 395;
    // const endY = 320;
    // if (
    //   e.pageX > startX &&
    //   e.pageX < endX &&
    //   e.pageY > startY &&
    //   e.pageY < endY
    // ) {
    //   console.log("inside");
    // } else {
    //   console.log("outside");
    // }
  };

  function rev(e) {
    console.log(e.target.id);
  }

  useEffect(() => {
    const handleResizeTimed = debounce(function handleResize() {
      console.log(window.innerHeight, window.innerWidth);
      console.log("some");
      document
        .querySelectorAll(".targetbox")
        .forEach((box) => console.log(box.id, box.getBoundingClientRect()));
    }, 1500);

    window.addEventListener("resize", handleResizeTimed);

    return () => window.removeEventListener("resize", handleResizeTimed);
  }, []);

  return (
    <div className="App" onClick={onClick}>
      <Navbar />
      <CharSelect x={point.x} y={point.y} />
      <div className="targetbox1 targetbox" id="naruto" onClick={rev}></div>
      <div className="targetbox2 targetbox" id="zoidberg" onClick={rev}></div>
      <div className="targetbox3 targetbox" id="aang" onClick={rev}></div>
      <img src={`${conimage}`} alt="con" className="conimage" />
    </div>
  );
}

function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

export default App;
