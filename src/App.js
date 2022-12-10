import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, React, useState } from "react";
import conimage from "./assets/conimage.png";
import Navbar from "./components/Navbar";
import CharSelect from "./components/CharSelect";
import { db } from "./firebase.config";
import { getDoc, doc, updateDoc } from "firebase/firestore";

function App() {
  const [point, setPoint] = useState({ x: null, y: null });
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState();
  const [start, setStart] = useState(false);
  const [found, setFound] = useState(0);
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
      opacity: 0;
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
      toast.success(`You've found ${docSnap.data().name}!!!`);
      setFound((prevState) => prevState + 1);
      document.getElementById(ref).style.opacity = 0.5;

      if (found === 3) {
        clearInterval(timer);
      }
    } else {
      toast.error("Please try again");
    }
  };

  useEffect(() => {
    const handleResizeTimed = debounce(function handleResize() {
      let charlist = document.querySelectorAll("span[data-ref]");
      charlist.forEach((s) => getPositions(s.dataset.ref));
    }, 1500);

    window.addEventListener("resize", handleResizeTimed);

    return () => window.removeEventListener("resize", handleResizeTimed);
  }, []);

  function clockTimer() {
    setTime((prevState) => prevState + 1);
    console.log(time);
  }

  function Start() {
    let charlist = document.querySelectorAll("span[data-ref]");
    charlist.forEach((s) => getPositions(s.dataset.ref));
    const timer = setInterval(clockTimer, 1000);
    setTimer(timer);
    setStart(true);
  }

  return (
    <div className="App" onClick={onClick}>
      <Navbar time={time} />
      {!start && (
        <div className="startmenu">
          <button onClick={Start}>CLICK TO START</button>
        </div>
      )}
      <div className="targetbox"></div>
      <CharSelect x={point.x} y={point.y} />
      <img src={`${conimage}`} alt="con" className="conimage" />
      <ToastContainer />
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
