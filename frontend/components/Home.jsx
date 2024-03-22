import React, { useState } from "react";
import "./home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import navbar from "../src/assets/img/banknav.png";
import Login from "./Login";
import Register from "./Register";
import { Link } from "react-router-dom";
// import pic from "../src/assets/img/Profilepic.webp";
// import ap from "../src/assets/img/ap.webp";
// import savings from "../src/assets/img/savings-12.png";
// import auto from "../src/assets/img/auto.webp";
// import home from "../src/assets/img/home.png";
// import investment from "../src/assets/img/investment.png";
import { Carousel } from "react-bootstrap";
import imgone from "../src/assets/img/about/1.jpg";
import imgtwo from "../src/assets/img/about/2.jpg";
import imgthree from "../src/assets/img/about/3.jpg";
import imgfour from "../src/assets/img/about/4.jpg";
import port1 from "../src/assets/img/portfolio/1.jpg"
import port2 from "../src/assets/img/portfolio/2.jpg"
import port3 from "../src/assets/img/portfolio/3.jpg"
import port4 from "../src/assets/img/portfolio/4.jpg"
import port5 from "../src/assets/img/portfolio/5.jpg"
import port6 from "../src/assets/img/portfolio/6.jpg"
// import "bootstrap-icons/font/bootstrap-icons.css";

export default function Home() {
  const [login, setLogin] = useState(true);
  return (
    <>
      <nav
        style={{ backgroundColor: "black" }}
        className="navbar navbar-expand-lg navbar-dark fixed-top"
        id="mainNav"
      >
        <div className="container">
          <a className="navbar-brand" href="#page-top">
            <img style={{ height: "50px" }} src={navbar} alt="..." />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i className="fas fa-bars ms-1"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#services">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#portfolio">
                  Portfolio
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  Process
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#team">
                  Team
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <header className="masthead">
        <div className="container" style={{ margin: "auto" }}>
          <h1 className="display-2" >
            Welcome!
          </h1>
          <div className="masthead">
            {(login && (
              <div >
                <Login></Login>
                <p className="below lead">
                  No Account?{" "}
                  <Link onClick={() => setLogin(false)}>Register</Link>
                </p>
              </div>
            )) || (
              <div >
                <Register></Register>
                <p className=" below lead">
                  Have an account?{" "}
                  <Link onClick={() => setLogin(true)}>Login</Link>
                </p>
              </div>
            )}
          </div>
          <a
            className="btn btn-primary btn-xl text-uppercase mt-4"
            href="#services"
          >
            Tell Me More
          </a>
        </div>
      </header>
      <div style={{ margin: "auto !important", backgroundColor: "" }}>
        <Carousel
          style={{
            color: "black",
            margin: "auto",
            color: "black",
            textAlign: "center",
            height: "200px",
          }}
        >
          <Carousel.Item interval={3000} style={{ marginTop: "15px" }}>
            <Link>
            <i class="fa-solid fa-plane" style={{ height: "100px", color: "#2a69df" }}></i>
            </Link>
            <p className="lead" style={{ textAlign: "center" }}>
              Travel
            </p>
          </Carousel.Item>
          <Carousel.Item interval={3000} style={{ marginTop: "15px" }}>
            <Link>
            <i class="fa-solid fa-piggy-bank" style={{ height: "100px", color: "#2a69df" }}></i>
            </Link>
            <p className="lead" style={{ textAlign: "center" }}>
              Savings
            </p>
          </Carousel.Item>
          <Carousel.Item interval={3000} style={{ marginTop: "15px" }}>
            <Link>
              <i
                className="fa-solid fa-car fs-1"
                style={{ height: "100px", color: "#2a69df" }}
              ></i>
            </Link>
            <p className="lead" style={{ textAlign: "center" }}>
              Auto
            </p>
          </Carousel.Item>
          <Carousel.Item interval={3000} style={{ marginTop: "15px" }}>
            <Link>
            <i class="fa-solid fa-house" style={{ height: "100px", color: "#2a69df" }}></i>
            </Link>
            <p className="lead" style={{ textAlign: "center" }}>
              Home loans
            </p>
          </Carousel.Item>
          <Carousel.Item interval={3000} style={{ marginTop: "15px" }}>
            <Link>
              <i
                class="fa-solid fa-arrow-trend-up"
                style={{ height: "100px", color: "#2a69df" }}
              ></i>
            </Link>
            <p className="lead" style={{ textAlign: "center" }}>
              Investments
            </p>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Services */}
      <section className="page-section" id="services">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">Services</h2>
            <h3 className="section-subheading text-muted">
              Read up on any of our services below!
            </h3>
          </div>
          <div className="row text-center">
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                <i className="fas fa-wallet fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="my-3">Business Consulting</h4>
              <p className="text-muted">
                Business consulting offers expert advice to improve
                organizational performance through tailored solutions and
                strategic insights across diverse industries.
              </p>
            </div>
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                <i className="fas fa-credit-card fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="my-3">Credit Card</h4>
              <p className="text-muted">
                Credit cards enable users to make purchases on credit with
                benefits like rewards, functioning as a line of credit issued by
                financial institutions.
              </p>
            </div>
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                <i className="fas fa-sack-dollar fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="my-3">Income Monitoring</h4>
              <p className="text-muted">
                Income monitoring involves tracking and analyzing an
                individual's or organization's earnings over time to understand
                financial trends, manage expenses, and make informed financial
                decisions.
              </p>
            </div>

            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                <i className="fas fa-money-bill fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="my-3">Insurance Consulting</h4>
              <p className="text-muted">
                Insurance consulting offers expert guidance on coverage options,
                risk assessment, and claims management to individuals and
                businesses, ensuring optimal protection against unforeseen
                events.
              </p>
            </div>

            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                <i className="fas fa-cart-shopping fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="my-3">Financial Investment</h4>
              <p className="text-muted">
                Financial investment is the allocation of funds into assets like
                stocks or real estate with the goal of generating returns over
                time.
              </p>
            </div>

            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                <i className="fas fa-bullhorn fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="my-3">Financial Management</h4>
              <p className="text-muted">
                Financial management entails optimizing an organization's
                resources through activities like budgeting, forecasting, and
                investment decision-making.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section bg-light" id="portfolio">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">Portfolio</h2>
            <h3 className="section-subheading text-muted">

            </h3>
          </div>
          <div className="row">
            <div className="col-lg-4 col-sm-6 mb-4">
              <div className="portfolio-item">
                <a
                  className="portfolio-link"
                  data-bs-toggle="modal"
                  href="#portfolioModal1"
                >
                  <div className="portfolio-hover">
                    <div className="portfolio-hover-content">
                      <i className="fas fa-plus fa-3x"></i>
                    </div>
                  </div>
                  <img
                    className="img-fluid"
                    src={port1}
                    alt="..."
                  />
                </a>
                <div className="portfolio-caption">
                  <div className="portfolio-caption-heading">
                    Wealth Management
                  </div>
                  <div className="portfolio-caption-subheading text-muted">
                    Tools
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mb-4">
              <div className="portfolio-item">
                <a
                  className="portfolio-link"
                  data-bs-toggle="modal"
                  href="#portfolioModal2"
                >
                  <div className="portfolio-hover">
                    <div className="portfolio-hover-content">
                      <i className="fas fa-plus fa-3x"></i>
                    </div>
                  </div>
                  <img
                    className="img-fluid"
                    src={port2}
                    alt="..."
                  />
                </a>
                <div className="portfolio-caption">
                  <div className="portfolio-caption-heading">Offical</div>
                  <div className="portfolio-caption-subheading text-muted">
                    Performance
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mb-4">
              <div className="portfolio-item">
                <a
                  className="portfolio-link"
                  data-bs-toggle="modal"
                  href="#portfolioModal3"
                >
                  <div className="portfolio-hover">
                    <div className="portfolio-hover-content">
                      <i className="fas fa-plus fa-3x"></i>
                    </div>
                  </div>
                  <img
                    className="img-fluid"
                    src={port3}
                    alt="..."
                  />
                </a>
                <div className="portfolio-caption">
                  <div className="portfolio-caption-heading">Investment</div>
                  <div className="portfolio-caption-subheading text-muted">
                    Accounting
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mb-4 mb-lg-0">
              <div className="portfolio-item">
                <a
                  className="portfolio-link"
                  data-bs-toggle="modal"
                  href="#portfolioModal4"
                >
                  <div className="portfolio-hover">
                    <div className="portfolio-hover-content">
                      <i className="fas fa-plus fa-3x"></i>
                    </div>
                  </div>
                  <img
                    className="img-fluid"
                    src={port4}
                    alt="..."
                  />
                </a>
                <div className="portfolio-caption">
                  <div className="portfolio-caption-heading">Lines</div>
                  <div className="portfolio-caption-subheading text-muted">
                    Branding
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mb-4 mb-sm-0">
              <div className="portfolio-item">
                <a
                  className="portfolio-link"
                  data-bs-toggle="modal"
                  href="#portfolioModal5"
                >
                  <div className="portfolio-hover">
                    <div className="portfolio-hover-content">
                      <i className="fas fa-plus fa-3x"></i>
                    </div>
                  </div>
                  <img
                    className="img-fluid"
                    src={port5}
                    alt="..."
                  />
                </a>
                <div className="portfolio-caption">
                  <div className="portfolio-caption-heading">Portfolio</div>
                  <div className="portfolio-caption-subheading text-muted">
                    Risk and Attribution
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="portfolio-item">
                <a
                  className="portfolio-link"
                  data-bs-toggle="modal"
                  href="#portfolioModal6"
                >
                  <div className="portfolio-hover">
                    <div className="portfolio-hover-content">
                      <i className="fas fa-plus fa-3x"></i>
                    </div>
                  </div>
                  <img
                    className="img-fluid"
                    src={port6}
                    alt="..."
                  />
                </a>
                <div className="portfolio-caption">
                  <div className="portfolio-caption-heading">
                    Private Market
                  </div>
                  <div className="portfolio-caption-subheading text-muted">
                    Capabilities
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section" id="about">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">Process</h2>
            <h3 className="section-subheading text-muted">How it all began!</h3>
          </div>
          <ul className="timeline">
            <li>
              <div className="timeline-image">
                <img
                  className="rounded-circle img-fluid"
                  src={imgone}
                  alt="..."
                />
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4>Feburary 24 2024</h4>
                  <h4 className="subheading">Rough Sketch</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted">
                    I designed and constructed tables, visualized the process,
                    and established connections between various elements. I
                    systematically assessed the requirements to ensure
                    everything is interconnected effectively, enhancing the
                    overall understanding and organization.
                  </p>
                </div>
              </div>
            </li>
            <li className="timeline-inverted">
              <div className="timeline-image">
                <img
                  className="rounded-circle img-fluid"
                  src={imgtwo}
                  alt="..."
                />
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4>Feburary 28 2024</h4>
                  <h4 className="subheading">Started on Backend</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted">
                    I initiated backend development using Prisma and Express,
                    crafting routes and implementing essential functions to
                    facilitate seamless operation. While testing, I ensured the
                    functionality of all routes using Postman to guarantee
                    smooth operation and optimal performance.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="timeline-image">
                <img
                  className="rounded-circle img-fluid"
                  src={imgthree}
                  alt="..."
                />
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4>March 6 2024</h4>
                  <h4 className="subheading">Transition to Frontend</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted">
                    I focused on frontend development using React and Redux,
                    leveraging session storage to minimize unnecessary API
                    calls. Additionally, I established a store to enable
                    seamless API integration and CRUD operations with my
                    backend.
                  </p>
                </div>
              </div>
            </li>
            <li className="timeline-inverted">
              <div className="timeline-image">
                <img
                  className="rounded-circle img-fluid"
                  src={imgfour}
                  alt="..."
                />
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4>March 12 2024</h4>
                  <h4 className="subheading">Final Parts</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted">
                    I utilized React and React Bootstrap to design the UI/UX,
                    ensuring a seamless and visually appealing experience. After
                    final testing, I deployed the frontend to Netlify and the
                    backend and database to Render for production-ready use.
                  </p>
                </div>
              </div>
            </li>
            <li className="timeline-inverted">
              <div className="timeline-image">
                <h4>
                  Be Part
                  <br />
                  Of My
                  <br />
                  Journey!
                </h4>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="page-section bg-light" id="team">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">The Team</h2>
            {/* <h3 className="section-subheading text-muted"></h3> */}
          </div>
          <div className="row">
            <div className="col-lg-4">
              {/* <div className="team-member">
                <img
                  className="mx-auto rounded-circle"
                  src="assets/img/team/1.jpg"
                  alt="..."
                />
                <h4>Parveen Anand</h4>
                <p className="text-muted">Lead Designer</p>
                <a
                  className="btn btn-dark btn-social mx-2"
                  href="#!"
                  aria-label="Parveen Anand Twitter Profile"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  className="btn btn-dark btn-social mx-2"
                  href="#!"
                  aria-label="Parveen Anand Facebook Profile"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  className="btn btn-dark btn-social mx-2"
                  href="#!"
                  aria-label="Parveen Anand LinkedIn Profile"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div> */}
            </div>
            <div className="col-lg-4">
              <div className="team-member">
                {/* <img
                  className="mx-auto rounded-circle"
                  src="assets/img/team/2.jpg"
                  alt="..."
                /> */}
                <h4>Qiao Gan Chen</h4>
                <p className="text-muted">Lead Software Engineer</p>
                <a
                  className="btn btn-dark btn-social mx-2"
                  href={"https://github.com/qiaoganchen22"}
                  aria-label=""
                >
                  <i className="fab fa-github"></i>
                </a>
                <a
                  className="btn btn-dark btn-social mx-2"
                  href={"https://" + "www.linkedin.com/in/qiao-gan-chen"}
                  aria-label="LinkedIn Profile"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-4">
              {/* <div className="team-member">
                <img
                  className="mx-auto rounded-circle"
                  src="assets/img/team/3.jpg"
                  alt="..."
                />
                <h4>Larry Parker</h4>
                <p className="text-muted">Lead Developer</p>
                <a
                  className="btn btn-dark btn-social mx-2"
                  href="#!"
                  aria-label="Larry Parker Twitter Profile"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  className="btn btn-dark btn-social mx-2"
                  href="#!"
                  aria-label="Larry Parker Facebook Profile"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  className="btn btn-dark btn-social mx-2"
                  href="#!"
                  aria-label="Larry Parker LinkedIn Profile"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div> */}
            </div>
          </div>
          {/* <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <p className="large text-muted"></p>
            </div>
          </div> */}
        </div>
      </section>

      {/* <div className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-3 col-sm-6 my-3">
              <a href="#!">
                <img
                  className="img-fluid img-brand d-block mx-auto"
                  src="assets/img/logos/microsoft.svg"
                  alt="..."
                  aria-label="Microsoft Logo"
                />
              </a>
            </div>
            <div className="col-md-3 col-sm-6 my-3">
              <a href="#!">
                <img
                  className="img-fluid img-brand d-block mx-auto"
                  src="assets/img/logos/google.svg"
                  alt="..."
                  aria-label="Google Logo"
                />
              </a>
            </div>
            <div className="col-md-3 col-sm-6 my-3">
              <a href="#!">
                <img
                  className="img-fluid img-brand d-block mx-auto"
                  src="assets/img/logos/facebook.svg"
                  alt="..."
                  aria-label="Facebook Logo"
                />
              </a>
            </div>
            <div className="col-md-3 col-sm-6 my-3">
              <a href="#!">
                <img
                  className="img-fluid img-brand d-block mx-auto"
                  src="assets/img/logos/ibm.svg"
                  alt="..."
                  aria-label="IBM Logo"
                />
              </a>
            </div>
          </div>
        </div>
      </div> */}

      <section className="page-section" id="contact">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">Contact Me</h2>
            <h3 className="section-subheading text-muted"></h3>
          </div>

          <form id="contactForm" data-sb-form-api-token="API_TOKEN">
            <div className="row align-items-stretch mb-5">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    className="form-control"
                    id="name"
                    type="text"
                    placeholder="Your Name *"
                    data-sb-validations="required"
                  />
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="name:required"
                  >
                    A name is required.
                  </div>
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    id="email"
                    type="email"
                    placeholder="Your Email *"
                    data-sb-validations="required,email"
                  />
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="email:required"
                  >
                    An email is required.
                  </div>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="email:email"
                  >
                    Email is not valid.
                  </div>
                </div>
                <div className="form-group mb-md-0">
                  <input
                    className="form-control"
                    id="phone"
                    type="tel"
                    placeholder="Your Phone *"
                    data-sb-validations="required"
                  />
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="phone:required"
                  >
                    A phone number is required.
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group form-group-textarea mb-md-0">
                  <textarea
                    className="form-control"
                    id="message"
                    placeholder="Your Message *"
                    data-sb-validations="required"
                  ></textarea>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="message:required"
                  >
                    A message is required.
                  </div>
                </div>
              </div>
            </div>
            <div className="d-none" id="submitSuccessMessage">
              <div className="text-center text-white mb-3">
                <div className="fw-bolder">Form submission successful!</div>
                To activate this form, sign up at
                <br />
                <a href="https://startbootstrap.com/solution/contact-forms">
                  https://startbootstrap.com/solution/contact-forms
                </a>
              </div>
            </div>

            <div className="d-none" id="submitErrorMessage">
              <div className="text-center text-danger mb-3">
                Error sending message!
              </div>
            </div>

            <div className="text-center">
              <button
                className="btn btn-primary btn-xl text-uppercase disabled"
                id="submitButton"
                type="submit"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      <footer className="footer py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 text-lg-start">
              Copyright &copy; Qiao Banking 2024
            </div>
            <div className="col-lg-4 my-3 my-lg-0">
              {/* <a
                className="btn btn-dark btn-social mx-2"
                href="#!"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                className="btn btn-dark btn-social mx-2"
                href="#!"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a> */}
              <a
                className="btn btn-dark btn-social mx-2"
                href={"https://github.com/qiaoganchen22"}
                aria-label=""
              >
                <i className="fab fa-github"></i>
              </a>

              <a
                className="btn btn-dark btn-social mx-2"
                href={"https://" + "www.linkedin.com/in/qiao-gan-chen"}
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <div className="col-lg-4 text-lg-end">
              <a className="link-dark text-decoration-none me-3" href="#!">
                Privacy Policy
              </a>
              <a className="link-dark text-decoration-none" href="#!">
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* <div
        className="portfolio-modal modal fade"
        id="portfolioModal1"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="close-modal" data-bs-dismiss="modal">
              <img src="assets/img/close-icon.svg" alt="Close modal" />
            </div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="modal-body">
                    <h2 className="text-uppercase">Project Name</h2>
                    <p className="item-intro text-muted">
                      Lorem ipsum dolor sit amet consectetur.
                    </p>
                    <img
                      className="img-fluid d-block mx-auto"
                      src="assets/img/portfolio/1.jpg"
                      alt="..."
                    />
                    <p>
                      Use this area to describe your project. Lorem ipsum dolor
                      sit amet, consectetur adipisicing elit. Est blanditiis
                      dolorem culpa incidunt minus dignissimos deserunt repellat
                      aperiam quasi sunt officia expedita beatae cupiditate,
                      maiores repudiandae, nostrum, reiciendis facere nemo!
                    </p>
                    <ul className="list-inline">
                      <li>
                        <strong>Client:</strong>
                        Threads
                      </li>
                      <li>
                        <strong>Category:</strong>
                        Illustration
                      </li>
                    </ul>
                    <button
                      className="btn btn-primary btn-xl text-uppercase"
                      data-bs-dismiss="modal"
                      type="button"
                    >
                      <i className="fas fa-xmark me-1"></i>
                      Close Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div
        className="portfolio-modal modal fade"
        id="portfolioModal2"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="close-modal" data-bs-dismiss="modal">
              <img src="assets/img/close-icon.svg" alt="Close modal" />
            </div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="modal-body">
                    <h2 className="text-uppercase">Project Name</h2>
                    <p className="item-intro text-muted">
                      Lorem ipsum dolor sit amet consectetur.
                    </p>
                    <img
                      className="img-fluid d-block mx-auto"
                      src="assets/img/portfolio/2.jpg"
                      alt="..."
                    />
                    <p>
                      Use this area to describe your project. Lorem ipsum dolor
                      sit amet, consectetur adipisicing elit. Est blanditiis
                      dolorem culpa incidunt minus dignissimos deserunt repellat
                      aperiam quasi sunt officia expedita beatae cupiditate,
                      maiores repudiandae, nostrum, reiciendis facere nemo!
                    </p>
                    <ul className="list-inline">
                      <li>
                        <strong>Client:</strong>
                        Explore
                      </li>
                      <li>
                        <strong>Category:</strong>
                        Graphic Design
                      </li>
                    </ul>
                    <button
                      className="btn btn-primary btn-xl text-uppercase"
                      data-bs-dismiss="modal"
                      type="button"
                    >
                      <i className="fas fa-xmark me-1"></i>
                      Close Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div
        className="portfolio-modal modal fade"
        id="portfolioModal3"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        {/* <div className="modal-dialog">
          <div className="modal-content">
            <div className="close-modal" data-bs-dismiss="modal">
              <img src="assets/img/close-icon.svg" alt="Close modal" />
            </div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="modal-body">
                    <h2 className="text-uppercase">Project Name</h2>
                    <p className="item-intro text-muted">
                      Lorem ipsum dolor sit amet consectetur.
                    </p>
                    <img
                      className="img-fluid d-block mx-auto"
                      src="assets/img/portfolio/3.jpg"
                      alt="..."
                    />
                    <p>
                      Use this area to describe your project. Lorem ipsum dolor
                      sit amet, consectetur adipisicing elit. Est blanditiis
                      dolorem culpa incidunt minus dignissimos deserunt repellat
                      aperiam quasi sunt officia expedita beatae cupiditate,
                      maiores repudiandae, nostrum, reiciendis facere nemo!
                    </p>
                    <ul className="list-inline">
                      <li>
                        <strong>Client:</strong>
                        Finish
                      </li>
                      <li>
                        <strong>Category:</strong>
                        Identity
                      </li>
                    </ul>
                    <button
                      className="btn btn-primary btn-xl text-uppercase"
                      data-bs-dismiss="modal"
                      type="button"
                    >
                      <i className="fas fa-xmark me-1"></i>
                      Close Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="portfolio-modal modal fade"
        id="portfolioModal4"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      > */}
        {/* <div className="modal-dialog">
          <div className="modal-content">
            <div className="close-modal" data-bs-dismiss="modal">
              <img src="assets/img/close-icon.svg" alt="Close modal" />
            </div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="modal-body">
                    <h2 className="text-uppercase">Project Name</h2>
                    <p className="item-intro text-muted">
                      Lorem ipsum dolor sit amet consectetur.
                    </p>
                    <img
                      className="img-fluid d-block mx-auto"
                      src="assets/img/portfolio/4.jpg"
                      alt="..."
                    />
                    <p>
                      Use this area to describe your project. Lorem ipsum dolor
                      sit amet, consectetur adipisicing elit. Est blanditiis
                      dolorem culpa incidunt minus dignissimos deserunt repellat
                      aperiam quasi sunt officia expedita beatae cupiditate,
                      maiores repudiandae, nostrum, reiciendis facere nemo!
                    </p>
                    <ul className="list-inline">
                      <li>
                        <strong>Client:</strong>
                        Lines
                      </li>
                      <li>
                        <strong>Category:</strong>
                        Branding
                      </li>
                    </ul>
                    <button
                      className="btn btn-primary btn-xl text-uppercase"
                      data-bs-dismiss="modal"
                      type="button"
                    >
                      <i className="fas fa-xmark me-1"></i>
                      Close Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="portfolio-modal modal fade"
        id="portfolioModal5"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      > */}
        {/* <div className="modal-dialog">
          <div className="modal-content">
            <div className="close-modal" data-bs-dismiss="modal">
              <img src="assets/img/close-icon.svg" alt="Close modal" />
            </div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="modal-body">
                    <h2 className="text-uppercase">Project Name</h2>
                    <p className="item-intro text-muted">
                      Lorem ipsum dolor sit amet consectetur.
                    </p>
                    <img
                      className="img-fluid d-block mx-auto"
                      src="assets/img/portfolio/5.jpg"
                      alt="..."
                    />
                    <p>
                      Use this area to describe your project. Lorem ipsum dolor
                      sit amet, consectetur adipisicing elit. Est blanditiis
                      dolorem culpa incidunt minus dignissimos deserunt repellat
                      aperiam quasi sunt officia expedita beatae cupiditate,
                      maiores repudiandae, nostrum, reiciendis facere nemo!
                    </p>
                    <ul className="list-inline">
                      <li>
                        <strong>Client:</strong>
                        Southwest
                      </li>
                      <li>
                        <strong>Category:</strong>
                        Website Design
                      </li>
                    </ul>
                    <button
                      className="btn btn-primary btn-xl text-uppercase"
                      data-bs-dismiss="modal"
                      type="button"
                    >
                      <i className="fas fa-xmark me-1"></i>
                      Close Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="portfolio-modal modal fade"
        id="portfolioModal6"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="close-modal" data-bs-dismiss="modal">
              <img src="assets/img/close-icon.svg" alt="Close modal" />
            </div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="modal-body">
                    <h2 className="text-uppercase">Project Name</h2>
                    <p className="item-intro text-muted">
                      Lorem ipsum dolor sit amet consectetur.
                    </p>
                    <img
                      className="img-fluid d-block mx-auto"
                      src="assets/img/portfolio/6.jpg"
                      alt="..."
                    />
                    <p>
                      Use this area to describe your project. Lorem ipsum dolor
                      sit amet, consectetur adipisicing elit. Est blanditiis
                      dolorem culpa incidunt minus dignissimos deserunt repellat
                      aperiam quasi sunt officia expedita beatae cupiditate,
                      maiores repudiandae, nostrum, reiciendis facere nemo!
                    </p>
                    <ul className="list-inline">
                      <li>
                        <strong>Client:</strong>
                        Window
                      </li>
                      <li>
                        <strong>Category:</strong>
                        Photography
                      </li>
                    </ul>
                    <button
                      className="btn btn-primary btn-xl text-uppercase"
                      data-bs-dismiss="modal"
                      type="button"
                    >
                      <i className="fas fa-xmark me-1"></i>
                      Close Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
