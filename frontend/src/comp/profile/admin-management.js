import React, { useEffect } from "react";
import { BoxArrowLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AdminManagement() {
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");
  const Admin = localStorage.getItem("adminemail");
  const navigate = useNavigate();
  useEffect(() => {
    if (Admin === null) {
      navigate("/admin-login");
    }
  }, [Admin, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("adminemail");
    // navigate("/user-profile");
    window.location.href = "/admin-login";
  };

  return (
    <div>
      <div className="row d-flex align-items-start justify-content-around gx-0 h-100">
        <div className="sign-in h-auto" style={{ backgroundColor: "#faf4ed" }}>
          <div className="text-end p-2">
            <button
              type="submit"
              onClick={handleLogout}
              style={{
                border: "1px solid #d1d0d0",
                backgroundColor: "#514f4d",
                color: "#fff",
                height: "3rem",
                padding: "0.5rem 1rem",
                width: "8rem",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#383633")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#514f4d")}
            >
              <BoxArrowLeft /> Logout
            </button>
          </div>
          <div
            className="admin-box d-flex flex-start justify-content-center"
            style={{ padding: "1.5rem", minHeight: "auto" }}
          >
            <div
              className="admin-content w-100 m-auto"
              style={{ maxWidth: "25rem", height: "100vh" }}
            >
              <div className="admin-manage h-100 position-relative mt-4">
                <legend className="w-100">
                  <h2 className="text-center">
                    Welcome {localStorage.getItem("adminemail")}!
                  </h2>
                </legend>
                <div className="d-flex gap-3 pt-5">
                  <Link to="/admin-product">
                    <button
                      type="submit"
                      style={{
                        border: "1px solid #d1d0d0",
                        backgroundColor: "#514f4d",
                        color: "#fff",
                        height: "5rem",
                        padding: "0 1.25rem",
                        width: "100%",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#383633")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "#514f4d")
                      }
                    >
                      PRODUCT MANAGEMENT
                    </button>
                  </Link>
                  <Link to="/admin-utility">
                    <button
                      type="submit"
                      style={{
                        border: "1px solid #d1d0d0",
                        backgroundColor: "#514f4d",
                        color: "#fff",
                        height: "5rem",
                        padding: "0 1.25rem",
                        width: "100%",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#383633")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "#514f4d")
                      }
                    >
                      UTILITY MANAGEMENT
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
