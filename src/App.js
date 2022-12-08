import { useEffect, React, useState } from "react";
import "./App.css";
import conimage from "./assets/conimage.png";
import Navbar from "./components/Navbar";
import CharSelect from "./components/CharSelect";
import { db } from "./firebase.config";
import { getDoc, doc, updateDoc } from "firebase/firestore";

function App() {
  const [point, setPoint] = useState({ x: null, y: null });
  // const [characters, setCharacters] = useState(null);

  const onClick = (e) => {
    const selectMenu = document.querySelector(".char-select");
    if (e.target.className === "conimage") {
      setPoint({
        x: e.pageX,
        y: e.pageY,
      });
      selectMenu.classList.remove("hidden");
    }

    if (e.target.closest(".char-select")) {
      validate(e.target.dataset.ref);
      selectMenu.classList.add("hidden");
    }
  };

  const getPositions = async (ref) => {
    const docRef = doc(db, "characters", ref);
    const docSnap = await getDoc(docRef);
    let char;
    if (docSnap.exists()) {
      char = docSnap.data();
    } else {
      console.log("error");
    }

    const target = document.querySelector(".targetbox");
    target.setAttribute(
      "style",
      `
      height: ${char.positions.height}%;
      width: ${char.positions.width}%;
      margin-top: ${char.positions.margin[0]}%;
      margin-bottom: ${char.positions.margin[0]}%;
      margin-left: ${char.positions.margin[1]}%;
      margin-right: ${char.positions.margin[1]}%;
      `
    );

    const coords = target.getBoundingClientRect();

    await updateDoc(docRef, {
      field: {
        startX: coords.x,
        startY: coords.y,
        endX: coords.right,
        endY: coords.bottom,
      },
    });

    target.removeAttribute("style");
  };

  const validate = async (ref) => {
    const docRef = doc(db, "characters", ref);
    const docSnap = await getDoc(docRef);
    let field;
    if (docSnap.exists()) {
      field = docSnap.data().field;
    }

    const { startX, startY, endX, endY } = field;
    if (
      point.x > startX &&
      point.x < endX &&
      point.y > startY &&
      point.y < endY
    ) {
      console.log(docSnap.data().name);
    } else {
      console.log("wrong");
    }
  };

  useEffect(() => {
    function handleLoad() {
      let charlist = document.querySelectorAll("span[data-ref]");
      charlist.forEach((s) => getPositions(s.dataset.ref));
    }

    window.addEventListener("load", handleLoad);

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  useEffect(() => {
    const handleResizeTimed = debounce(function handleResize() {
      let charlist = document.querySelectorAll("span[data-ref]");
      charlist.forEach((s) => getPositions(s.dataset.ref));
    }, 1500);

    window.addEventListener("resize", handleResizeTimed);

    return () => window.removeEventListener("resize", handleResizeTimed);
  }, []);

  return (
    <div className="App" onClick={onClick}>
      <Navbar />
      <div className="targetbox"></div>
      <CharSelect x={point.x} y={point.y} />

      <img src={`${conimage}`} alt="con" className="conimage" />
    </div>
  );
}

// not my function
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
