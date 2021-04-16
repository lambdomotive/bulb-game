import React, {
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import "./GamePage.css";
import SingleBulb from "../components/SingleBulb";
import { UserDataContext } from "../providers/UserDataProvider";

const colors = ["orange", "gray", "green", "black", "red", "yellow"];

function GamePage() {
  const [level, setLevel] = useState(1);

  const [correctClicks, setCorrectClicks] = useState(0);

  const [currentScore, setCurrentScore] = useState(0);

  const [isError, setError] = useState(false);

  const [currentHighlightedElement, setCurrentHightlightedElement] = useState(
    null
  );

  const [{ userName, bestScore }, dispatch] = useContext(UserDataContext);

  const levelSequence = useMemo(() => {
    const sequence = [];
    let bulbs = 1;
    while (bulbs <= level) {
      sequence.push(Math.floor(Math.random() * colors.length));
      bulbs++;
    }
    return sequence;
  }, [level]);

  useEffect(() => {
    const step = 1000;
    const turnOffAfter = 400;
    let currentTimeout = 1000;
    for (let el of levelSequence) {
      setTimeout(() => {
        setCurrentHightlightedElement(el);
      }, currentTimeout);
      currentTimeout += turnOffAfter;
      setTimeout(() => {
        setCurrentHightlightedElement(null);
      }, currentTimeout);
      currentTimeout += step;
    }
  }, [levelSequence]);

  const handleBulbClick = useCallback(
    (bulbIndex) => {
      if (levelSequence[correctClicks] === bulbIndex) {
        setCorrectClicks((prev) => prev + 1);
        setCurrentScore((prev) => prev + 10);
        if (correctClicks + 1 >= level) {
          setLevel((prev) => prev + 1);
          setCorrectClicks(0);
        }
      } else {
        setCorrectClicks(0);
        setCurrentScore(0);
        setLevel(0);
        dispatch({ type: "SUBMIT_RESULT", result: currentScore });
        setError(true);
        setTimeout(() => {
          setError(false);
          setLevel(1);
        }, 820);
      }
    },
    [correctClicks, currentScore, dispatch, level, levelSequence]
  );

  return (
    <div className={`game-container ${isError ? "error" : ""}`}>
      <div
        onClick={() => {
          setLevel((prev) => prev + 1);
        }}
      >
        Welcome, {userName}!
      </div>
      <div>Your best score: {bestScore.toString()}</div>
      <div>Your current score: {currentScore}</div>
      <div className="bulbs">
        {colors.map((color, index) => {
          console.log("currentHighlightedElement: ", currentHighlightedElement);
          return (
            <SingleBulb
              color={color}
              onClick={handleBulbClick.bind(this, index)}
              key={color}
              highlight={index === currentHighlightedElement}
            />
          );
        })}
      </div>
    </div>
  );
}

export default GamePage;