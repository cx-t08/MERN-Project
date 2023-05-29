import "../App.css";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import Clever from "./clever";
import Slide from "./slide-image";
import { ArrowRight } from "react-bootstrap-icons";

export default function Home() {
  const clever = [
    { image: "./images/clever1.webp" },
    { image: "./images/clever2.webp" },
    { image: "./images/clever3.webp" },
    { image: "./images/clever4.webp" },
    { image: "./images/clever5.webp" },
    { image: "./images/clever6.webp" },
  ];
  const unique = [
    { image: "./images/explore1.webp" },
    { image: "./images/explore2.webp" },
    { image: "./images/explore3.webp" },
    { image: "./images/explore4.webp" },
  ];
  const spaces = [
    { image: "./images/spaces1.webp", content: "Range Fabric Sectional" },
    { image: "./images/spaces2.webp", content: "Kettle Side Table" },
    { image: "./images/spaces3.webp", content: "Nomad Velvet Sofa" },
    { image: "./images/spaces4.webp", content: "Nomad Leather Sofa" },
    { image: "./images/spaces5.webp", content: "Serif Credenza" },
    { image: "./images/spaces6.webp", content: "Serif Side Table" },
    { image: "./images/spaces7.webp", content: "Range Fabric Sectional" },
    { image: "./images/spaces8.webp", content: "Prospect Nightstand" },
    { image: "./images/spaces9.webp", content: "Nomad Leather Sectional" },
  ];
  const curated = [
    { image: "./images/curated1.webp" },
    { image: "./images/curated2.webp" },
    { image: "./images/curated3.webp" },
    { image: "./images/curated4.webp" },
    { image: "./images/curated5.webp" },
    { image: "./images/curated6.webp" },
    { image: "./images/curated7.webp" },
    { image: "./images/curated8.webp" },
    { image: "./images/curated9.webp" },
    { image: "./images/curated10.webp" },
    { image: "./images/curated11.webp" },
  ];

  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/home1.webp"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>
              Award-winning sofas and
              <br /> sectionals, customizable by you
            </h3>
            <button className="shop-hover">
              <Link to="./products" className="shop-seating">
                SHOP SEATING
              </Link>
            </button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/home2.webp"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>
              Modular outdoor furniture,
              <br /> engineered for the elements
            </h3>
            <button className="shop-hover">
              <Link to="./products" className="shop-seating">
                SHOP OUTDOOR
              </Link>
            </button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/home3.webp"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>
              A better suite of bedroom furniture,
              <br /> starting with a solid frame
            </h3>
            <button className="shop-hover">
              <Link to="./products" className="shop-seating">
                SHOP BEDROOM
              </Link>
            </button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <section style={{ padding: "1.25rem 3.5rem" }}>
        <p
          className="d-flex justify-content-center my-4"
          style={{
            fontSize: "1.875rem",
            lineHeight: "3rem",
          }}
        >
          Clever designs, delivered free
        </p>
        <div className="row d-flex">
          {clever &&
            clever.map((item) => {
              return <Clever image={item.image} />;
            })}
        </div>
      </section>
      <section
        className="container-fluid bg-content py-4 my-4"
        style={{ backgroundColor: "#f7eee3" }}
      >
        <p
          className="text-center my-3"
          style={{
            fontSize: "1.875rem",
            lineHeight: "3rem",
          }}
        >
          We’re solving the biggest problems in furniture
        </p>
        <div className="container-lg mt-5">
          <div className="row ">
            <div className="col-lg-1 col-3">
              <img src="./images/solving1.webp" className="img-fluid" alt="" />
            </div>
            <div className="col-lg-3 col-9">
              <div className="fw-semibold">Fast &amp; free shipping</div>
              <p className="text-normal">
                Every single order ships for free. No minimums, no tiers, no
                fine print whatsoever.
              </p>
            </div>
            <div className="col-lg-1 col-3">
              <img src="./images/solving2.webp" className="img-fluid" alt="" />
            </div>
            <div className="col-lg-3 col-9 ">
              <div className="fw-semibold">Modular, easy-to-move design</div>
              <p className="text-normal">
                {" "}
                Our innovative modular design is driven by the belief that
                furniture should fit this home, and the next one.
              </p>
            </div>
            <div className="col-lg-1 col-3">
              <img src="./images/solving2.webp" className="img-fluid" alt="" />
            </div>
            <div className="col-lg-3 col-9">
              <div className="fw-semibold">Durable, premium materials</div>
              <p className="text-normal">
                We use materials like sustainably-forested wood, strengthened
                steel hardware, and top-grain Italian leather.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container my-5">
          <p
            className="text-center"
            style={{
              fontSize: "1.875rem",
              lineHeight: "3rem",
            }}
          >
            Explore each unique collection
          </p>
        </div>
        <div className="scrolling d-flex overflow-scroll">
          {unique &&
            unique.map((item) => {
              return <Slide image={item.image} width={315} height={360} />;
            })}
        </div>
      </section>
      <section className="module mt-5" style={{ backgroundColor: "#f7eee3" }}>
        <Carousel>
          <Carousel.Item>
            <div className="col-6">
              <Carousel.Caption style={{ color: "black" }}>
                <b>NOMAD SOFA</b>
                <h3 style={{ width: "30rem" }}>
                  "The Burrow system works beautifully. It's comfortable,
                  absolutely solid, and looks great."
                </h3>
                <Link to="./products" className="shop-now">
                  Shop Now <ArrowRight />
                </Link>
              </Carousel.Caption>
            </div>
            <div className="col-6">
              <img
                className="d-block w-100"
                src="./images/module1.webp"
                alt="First slide"
              />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="col-6">
              <Carousel.Caption style={{ color: "black" }}>
                <b>SERIF COFFEE TABLE</b>
                <h3 style={{ width: "30rem" }}>
                  "Not a just superficial beauty, the table is well-made and
                  substantial, a nascent heirloom."
                </h3>
                <Link to="./products" className="shop-now">
                  Shop Now <ArrowRight />
                </Link>
              </Carousel.Caption>
            </div>
            <div className="col-6">
              <img
                className="d-block w-100"
                src="./images/module2.webp"
                alt="First slide"
              />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="col-6">
              <Carousel.Caption style={{ color: "black" }}>
                <b>INDEX WALL SHELF</b>
                <h3 style={{ width: "30rem" }}>
                  "The bookshelves are amazing... Everyone is asking where we
                  got them."
                </h3>
                <Link to="./products" className="shop-now">
                  Shop Now <ArrowRight />
                </Link>
              </Carousel.Caption>
            </div>
            <div className="col-6">
              <img
                className="d-block w-100"
                src="./images/module3.webp"
                alt="First slide"
              />
            </div>
          </Carousel.Item>
        </Carousel>
      </section>
      <section>
        <div className="container my-5">
          <p
            className="text-center"
            style={{
              fontSize: "1.875rem",
              lineHeight: "3rem",
            }}
          >
            Shop these real-life spaces
          </p>
        </div>
        <div className="scrolling d-flex overflow-scroll">
          {spaces &&
            spaces.map((item) => {
              return (
                <div>
                  <Slide
                    image={item.image}
                    width={370}
                    height={370}
                    content={item.content}
                  />
                </div>
              );
            })}
        </div>
      </section>
      <div className="container my-5">
        <p
          className="text-center"
          style={{
            fontSize: "1.875rem",
            lineHeight: "3rem",
          }}
        >
          Modular, easy-to-move design
        </p>
      </div>
      <section className="modular container-fluid pb-4">
        <div className="row">
          <object>
            <video autoPlay loop muted width="100%" height="100%">
              <source src="./images/modular.mp4" />
            </video>
          </object>
        </div>
      </section>
      <div className="shop-seat container my-1">
        <p className="text-center">
          <button className="shop-hover">
            <Link
              to="/products"
              style={{ textDecoration: "none", color: "#484543" }}
            >
              SHOP SEATING
            </Link>
          </button>
        </p>
      </div>
      <section className="mb-5 pb-5">
        <div className="container my-4">
          <p
            className="text-center"
            style={{
              fontSize: "1.875rem",
              lineHeight: "3rem",
            }}
          >
            Start with these curated spaces
          </p>
        </div>
        <div className="scrolling d-flex overflow-scroll">
          {curated &&
            curated.map((item) => {
              return <Slide image={item.image} width={830} height={420} />;
            })}
        </div>
      </section>
      <section className="awards" style={{ backgroundColor: "#f7eee3" }}>
        <Carousel>
          <Carousel.Item>
            <div className="col-6">
              <img
                className="d-block w-100"
                src="./images/awards1.webp"
                alt="First slide"
              />
            </div>
            <div className="col-6">
              <Carousel.Caption style={{ color: "black" }}>
                <h3 style={{ width: "30rem" }}>
                  "It’s helped me be a little more organized, and is just so
                  beautiful to stare at."
                </h3>
                <b>AD Cleverest Awards</b>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="col-6">
              <img
                className="d-block w-100"
                src="./images/awards2.webp"
                alt="First slide"
              />
            </div>
            <div className="col-6">
              <Carousel.Caption style={{ color: "black" }}>
                <h3 style={{ width: "30rem" }}>
                  "A convention-busting enticing, extremely nappable softness"
                </h3>
                <b>GQ Home Awards</b>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
        </Carousel>
      </section>
    </div>
  );
}
