import React from "react";

function testFuncts() {
  const getCharacters = async () => {
    try {
      const docRef = collection(db, "characters");
      const charSnaps = await getDocs(docRef);
      let chars = [];
      charSnaps.forEach((doc) => {
        console.log(
          `${doc.data().positions.margin[0]}%`,
          `${doc.data().positions.margin[1]}%`
        );
        chars.push({ ...doc.data(), id: doc.id });
      });

      chars = chars.map((char) => (
        <div
          key={char.name}
          className="targetbox"
          id={char.id}
          style={{
            height: `${char.positions.height}%`,
            width: `${char.positions.width}%`,
            marginTop: `${char.positions.margin[0]}%`,
            marginBottom: `${char.positions.margin[0]}%`,
            marginLeft: `${char.positions.margin[1]}%`,
            marginRight: `${char.positions.margin[1]}%`,
          }}
        ></div>
      ));

      setCharacters(chars);
    } catch (error) {
      console.log(error);
    }
  };

  async function getCoordsAndUpdate() {
    const targets = document.querySelectorAll(".targetbox");
    targets && targets.forEach((t) => console.log(t.id));
  }
  const onClick = (e) => {
    console.log(e.pageX, e.pageY);
    setPoint({
      x: e.pageX,
      y: e.pageY,
    });
  };

  function rev(e) {
    console.log(e.target.id);
  }

  useEffect(() => {
    function foo() {
      getCharacters();
      getCoordsAndUpdate();
    }
  });

  useEffect(() => {
    const handleResizeTimed = debounce(function handleResize() {
      document
        .querySelectorAll(".targetbox")
        .forEach((box) => console.log(box.id, box.getBoundingClientRect()));
    }, 1500);

    window.addEventListener("resize", handleResizeTimed);

    return () => window.removeEventListener("resize", handleResizeTimed);
  }, []);

  return <div>testFuncts</div>;
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

export default testFuncts;
