import React, { useEffect, useState } from "react";
import { db } from "../firebase.config";
import { collection, getDocs } from "firebase/firestore";

function Scores({ togglescores }) {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      const arr = [];
      const docRef = collection(db, "scores");
      const scoresSnap = await getDocs(docRef);
      scoresSnap.forEach((doc) => {
        arr.push(doc.data());
      });

      arr.sort((a, b) => a.score - b.score);

      setScores(arr.slice(0, 20));
    };

    fetchScores();
  }, []);
  return (
    <div className="scores">
      <button onClick={() => togglescores((prevState) => !prevState)}>
        Exit
      </button>
      <h1>Top 20 Scores:</h1>
      <ol>
        {scores.map((score, ind) => (
          <li key={ind}>
            {score.name}:{score.score}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Scores;
