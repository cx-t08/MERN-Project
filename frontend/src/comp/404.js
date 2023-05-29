import React, { useEffect } from "react";

function PageNotFound() {
  useEffect(() => {
    const timerId = setTimeout(() => {
      window.location.href = "/";
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#faf4ed",
      }}
    >
      <div className="d-block">
        <div>
          <img src="./images/404" alt="" width="100%" height="100%" />
        </div>
        <p className="text-center">Redirecting to home page in 3 seconds...</p>
      </div>
    </div>
  );
}

export default PageNotFound;
