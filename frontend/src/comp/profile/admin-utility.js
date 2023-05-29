import "../App.css";
import React, { useRef } from "react";
import UtilityCategory from "./utility-category";
import UtilitySubCategory from "./utility-subcategory";
import UtilityColor from "./utility-color";
import UtilityMaterial from "./utility-material";
import $ from "jquery";
import { Link } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";

export default function AdminUtility() {
  const divcategories = useRef(null);
  const divsubcategories = useRef(null);
  const divcolors = useRef(null);
  const divmaterial = useRef(null);

  function categorieshandleclick() {
    $(divsubcategories.current).hide();
    $(divcolors.current).hide();
    $(divmaterial.current).hide();
    $(divcategories.current).toggle();
  }
  function subcategorieshandleclick() {
    $(divcategories.current).hide();
    $(divcolors.current).hide();
    $(divmaterial.current).hide();
    $(divsubcategories.current).toggle();
  }
  function colorshandleclick() {
    $(divcategories.current).hide();
    $(divsubcategories.current).hide();
    $(divmaterial.current).hide();
    $(divcolors.current).toggle();
  }
  function materialshandleclick() {
    $(divcategories.current).hide();
    $(divsubcategories.current).hide();
    $(divcolors.current).hide();
    $(divmaterial.current).toggle();
  }

  return (
    <div>
      <div
        className="row d-flex align-items-start justify-content-around gx-0 h-100"
        style={{ backgroundColor: "#faf4ed" }}
      >
        <div className="p-2">
          <Link to="/admin-management">
            <button
              type="submit"
              style={{
                border: "1px solid #d1d0d0",
                backgroundColor: "#514f4d",
                color: "#fff",
                height: "2rem",
                padding: "0 1.25rem",
                width: "10rem",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#383633")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#514f4d")}
            >
              <ArrowLeft /> Admin Home
            </button>
          </Link>
        </div>
        <div className="admin-utility h-auto">
          <div
            className="admin-box d-flex flex-start justify-content-center"
            style={{ padding: "1.5rem", minHeight: "auto" }}
          >
            <div
              className="admin-content w-100 m-auto"
              style={{ maxWidth: "50rem", height: "auto", minHeight: "100vh" }}
            >
              <div className="admin-manage h-auto position-relative">
                <div className="p-3">
                  <legend className="w-100">
                    <h2 className="text-center">Utility Management</h2>
                  </legend>
                  <div className="d-flex justify-content-between">
                    <div className="category">
                      <button
                        type="submit"
                        style={{
                          border: "1px solid #d1d0d0",
                          backgroundColor: "#514f4d",
                          color: "#fff",
                          padding: "1rem 3rem",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#383633")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#514f4d")
                        }
                        onClick={categorieshandleclick}
                      >
                        Category
                      </button>
                    </div>
                    <div className="sub-category">
                      <button
                        type="submit"
                        style={{
                          border: "1px solid #d1d0d0",
                          backgroundColor: "#514f4d",
                          color: "#fff",
                          padding: "1rem 3rem",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#383633")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#514f4d")
                        }
                        onClick={subcategorieshandleclick}
                      >
                        Sub Category
                      </button>
                    </div>
                    <div className="color">
                      <button
                        type="submit"
                        style={{
                          border: "1px solid #d1d0d0",
                          backgroundColor: "#514f4d",
                          color: "#fff",
                          padding: "1rem 3rem",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#383633")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#514f4d")
                        }
                        onClick={colorshandleclick}
                      >
                        Color
                      </button>
                    </div>
                    <div className="color">
                      <button
                        type="submit"
                        style={{
                          border: "1px solid #d1d0d0",
                          backgroundColor: "#514f4d",
                          color: "#fff",
                          padding: "1rem 3rem",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#383633")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#514f4d")
                        }
                        onClick={materialshandleclick}
                      >
                        Size
                      </button>
                    </div>
                  </div>
                  <div ref={divcategories} style={{ display: "block" }}>
                    <UtilityCategory />
                  </div>
                  <div ref={divsubcategories} style={{ display: "none" }}>
                    <UtilitySubCategory />
                  </div>
                  <div ref={divcolors} style={{ display: "none" }}>
                    <UtilityColor />
                  </div>
                  <div ref={divmaterial} style={{ display: "none" }}>
                    <UtilityMaterial />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
