import React from "react";
import { Link } from "react-router-dom";

function Clever(item) {
  return (
    <div className="col-4 my-3">
      <Link to="/products">
        <img src={item.image} alt="clever" width="100%" height="100%" />
      </Link>
    </div>
  );
}

export default Clever;
