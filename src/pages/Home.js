import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faExternalLinkAlt, faTimesCircle, faCheckCircle, faCalendarAlt, faCodeBranch, faShoppingCart, faFolder, faMapMarkedAlt, faPager, faFileCode, faDownload } from "@fortawesome/free-solid-svg-icons";
import { faBootstrap, faGithub, faJs, faReact, faSass } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Card, Image, Button, Container, ListGroup, Tooltip, OverlayTrigger, Form, Navbar, Nav, Badge } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Code from "../components/CodeEditor";
import GitHubButton from 'react-github-btn';

import { Routes } from "../routes";
import ThemesbergLogoIcon from "../assets/img/themesberg.svg";
import ThemesbergLogo from "../assets/img/themesberg-logo.svg";
import MockupPresentation from "../assets/img/mockup-presentation.png";
import ReactHero from "../assets/img/technologies/react-hero-logo.svg";
import Logo from "../assets/img/logo.png";
import Hero from "../assets/img/hero.png";
import S1 from "../assets/img/s1.png";
import S2 from "../assets/img/s2.png";
import S3 from "../assets/img/s3.png";
import S4 from "../assets/img/s4.png";
import LinkedInIcon from "../assets/img/social/LinkedIn.png";
import InstagramIcon from "../assets/img/social/Instagram.png";
import FacebookIcon from "../assets/img/social/Facebook.png";
import TwitterIcon from "../assets/img/social/Twitter.png"; 

import pages from "../data/pages";
import features from "../data/features";

export default () => {
  const PagePreview = (props) => {
    const { name, image, link, content } = props;
    return (
      <Col xs={12} lg={4} className="mb-5">
        <Card.Link as={Link} to={link} className="page-preview page-preview-lg scale-up-hover-2">
          <Image src={image} className="shadow-lg rounded scale" alt="Dashboard page preview" style={{ width: '100%' }} />
          <h3 className="mt-3">{name}</h3>
          <div>{content}</div> 
          <div className="text-center show-on-hover">
            <h6 className="m-0 text-center text-white">
              {name} <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-2" />
            </h6>
          </div>
        </Card.Link>
      </Col>
    );
  };

  const Feature = (props) => {
    const { title, description, icon } = props;

    return (
      <Col xs={12} sm={6} lg={3}>
        <Card className="bg-white shadow-soft text-primary rounded mb-4">
          <div className="px-3 px-lg-4 py-5 text-center">
            <span className="icon icon-lg mb-4">
              <FontAwesomeIcon icon={icon} />
            </span>
            <h5 className="fw-bold text-primary">{title}</h5>
            <p>{description}</p>
          </div>
        </Card>
      </Col>
    );
  };

  const FolderItem = (props) => {
    const { name, icon, tooltip, iconColor } = props;
    const color = iconColor ? `text-${iconColor}` : "";

    return (
      <OverlayTrigger
        trigger={['hover', 'focus']}
        placement="left"
        overlay={<Tooltip>{tooltip}</Tooltip>}
      >
        <li data-toggle="tooltip" data-placement="left" title="Main folder that you will be working with">
          <FontAwesomeIcon icon={icon ? icon : faFolder} className={`${color} me-2`} /> {name}
        </li>
      </OverlayTrigger>
    );
  };

  return (
    <>
      <Navbar variant="dark" expand="lg" bg="dark" className="navbar-transparent navbar-theme-primary sticky-top">
        <Container className="position-relative justify-content-between px-3">
          <Navbar.Brand as={HashLink} to="#home" className="me-lg-3 d-flex align-items-center">
            <Image src={Logo} width={200} height={100} />
          </Navbar.Brand>

          <div className="d-flex align-items-center">
            <Navbar.Collapse id="navbar-default-primary">
              <Nav className="navbar-nav-hover align-items-lg-center">
                <Nav.Link as={HashLink} to="#features">Home</Nav.Link>
                <Nav.Link as={HashLink} to="#pages">Services</Nav.Link>
                <Nav.Link as={HashLink} to="#folder" className="d-sm-none d-xl-inline">Materials</Nav.Link>
                <Nav.Link as={HashLink} to="#getting-started">About Us</Nav.Link>
                <Nav.Link as={HashLink} to="#download">FAQ</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Button as={HashLink} to="/sign-in" variant="outline-white" className="ms-3">Sign In</Button>
          </div>
        </Container>
      </Navbar>
      <section className="section-header overflow-hidden pt-2 pt-lg-2 pb-4 pb-lg-6 bg-primary text-white" id="home">
        <Container>
          <Row className="justify-content-center mt-5 mt-lg-6">
            <Col xs={12} md={6} className="text-left mt-2 mt-lg-6">
              <h1 className="fw-bolder">Your Single Digital Manufacturing Resource</h1>
              <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
              <Row className="mt-4 mt-lg-4">
                <Col xs={6}>
                  <Button as={Link} to={Routes.DashboardOverview.path} className="text-dark me-3" style={{ backgroundColor: '#FCD980', borderRadius: '41px', padding: "16px 60px 16px 56px" }}>
                    Upload a part
                  </Button>
                </Col>
                <Col xs={6} style={{ marginTop: 16 }}>
                  <a as={Link} to={Routes.DashboardOverview.path} className="text-white" style={{ padding: "16px 20px 16px 0px" }}>
                    Sample Design Analysis
                  </a>
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={6} className="text-center mb-4">
              <Image src={Hero} width={800} height={400} className="mb-3" alt="Themesberg Logo" />
            </Col>
          </Row>

          <figure className="position-absolute bottom-0 left-0 w-100 d-none d-md-block mb-n2">
            <svg className="fill-soft" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3000 185.4">
              <path d="M3000,0v185.4H0V0c496.4,115.6,996.4,173.4,1500,173.4S2503.6,115.6,3000,0z" />
            </svg>
          </figure>
        </Container>
      </section>

      <section className="section section-md bg-soft pt-lg-6" id="features">
        <Container>
          <Row className="justify-content-between align-items-center mb-5 mb-lg-7">
            <Col xs={7} lg={7} className="order-lg-2 mb-5 mb-lg-0">
              <Row>
                <Col xs={6} className="mt-4">
                  <Image src={S1} />
                  <h4 className="mt-2">Laser Cutting</h4>
                  <p className="text-dark mt-2">Euismod faucibus turpis eu gravida mi. Pellentesque et velit aliquam.</p>
                </Col>
                <Col xs={6} className="mt-4">
                  <Image src={S2} />
                  <h4 className="mt-2">Injection Molding</h4>
                  <p className="text-dark mt-2">Euismod faucibus turpis eu gravida mi. Pellentesque et velit aliquam.</p>
                </Col>
                <Col xs={6} className="mt-4">
                  <Image src={S3} />
                  <h4 className="mt-2">CNC Machine</h4>
                  <p className="text-dark mt-2">Euismod faucibus turpis eu gravida mi. Pellentesque et velit aliquam.</p>
                </Col>
                <Col xs={6} className="mt-4">
                  <Image src={S4} />
                  <h4 className="mt-2">3D Printing</h4>
                  <p className="text-dark mt-2">Euismod faucibus turpis eu gravida mi. Pellentesque et velit aliquam.</p>
                </Col>
              </Row>
            </Col>

            <Col xs={4} lg={4} className="order-lg-1">
              <h1>Our Services</h1>
              <p className="text-dark">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
              <a as={Link} to={Routes.DashboardOverview.path} className="text-dark h5" style={{ fontWeight: 700 }}>
                Learn More
              </a>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section section-sm pt-6" id="pages" style={{ backgroundColor: 'white' }}>
        <Container>
          <Row className="justify-content-center mb-5 mb-lg-6">
            <Col xs={12} className="text-center">
              <h2 className="px-lg-5">
                What's New at Cost Plus Parts?
              </h2>
            </Col>
          </Row>
          <Row className="mb-5">
            {pages.map(page => <PagePreview key={`page-${page.id}`} {...page} />)}
          </Row>
        </Container>
      </section>
      <footer className="footer pt-5 bg-dark text-white">
        <Container>
          <Row>
            <Col xs={12} md={5}>
              <Navbar.Brand as={HashLink} to="#home" className="me-lg-3 mb-3 d-flex align-items-center">
                <Image src={Logo} />
              </Navbar.Brand>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
              <Row style={{ backgroundColor: '#FCD980' }} className="text-dark p-3 mt-6">
                <Col xs={12} md={6}>
                  <h5>Email me at</h5>
                  <h6>contact@website.com</h6>
                </Col>
                <Col xs={12} md={6}>
                  <h5>Call Us</h5>
                  <h6>+123456789</h6>
                </Col>
              </Row>
            </Col>
            <Col xs={0} md={2}>
            </Col>
            <Col xs={12} md={5} className="mb-5 mb-lg-0 mt-6" >
              <div style={{maxWidth: '400px'}}>
                <span className="h1 mb-3 d-block">Lets Talk!</span>
                <div className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur.</div>
                <div className="mt-4">
                  <span style={{marginRight:'20px'}}><Image src={FacebookIcon}/></span>
                  <span style={{marginRight:'20px'}}><Image src={TwitterIcon}/></span>
                  <span style={{marginRight:'20px'}}><Image src={InstagramIcon}/></span>
                  <span style={{marginRight:'20px'}}><Image src={LinkedInIcon}/></span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
      <footer className="footer py-2 text-white">
        <Container>
          <Row>
            <Col>
              <div className="d-flex text-center justify-content-center align-items-center" role="contentinfo">
                <p className="font-weight-normal font-small mb-0 text-dark">Copyright 2023, costplusparts.com</p>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};
