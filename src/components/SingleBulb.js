import React, { useState, useCallback } from "react";
import "./SingleBulb.css";

function SingleBulb({ onClick, color, highlight }) {
  const [isHighlighted, setHighlighted] = useState(false);
  const handleClick = useCallback(() => {
    onClick && onClick();
    setHighlighted(true);
    setTimeout(() => {
      setHighlighted(false);
    }, 200);
  }, [onClick]);
  return (
    <div
      onClick={handleClick}
      style={{ backgroundColor: isHighlighted || highlight ? color : "" }}
      className="single-bulb"
    ></div>
  );
}

export default SingleBulb;
