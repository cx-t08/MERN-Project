import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Slide(item) {
  return (
    <div>
      <Link to="/products" className="link">
        <img
          className="p-2"
          alt="slides"
          width={item.width}
          height={item.height}
          src={item.image}
        />
        <p
          className="mx-3"
          style={{
            fontWeight: "600",
          }}
        >
          {item.content}
        </p>
      </Link>
    </div>
  );
}

export default Slide;
