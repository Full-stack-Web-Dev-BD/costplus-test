import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faCog,
  faEnvelopeOpen,
  faSearch,
  faSignOutAlt,
  faUserShield,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { GrUpgrade } from "react-icons/gr";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import {
  Row,
  Col,
  Nav,
  Form,
  Image,
  Navbar,
  Dropdown,
  Container,
  ListGroup,
  InputGroup,
} from "@themesberg/react-bootstrap";

import NOTIFICATIONS_DATA from "../data/notifications";
import Profile6 from "../assets/img/team/profile-picture-6.jpg";
import ModeSwitch from "./ModeSwitch/ModeSwitch";
import { logout } from "../store/actions/authActions";
import { connect, useDispatch } from "react-redux";

const CustomNavbar = ({ auth }) => {
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
  const [isDark, setisDark] = useState(false);
  const dispatch = useDispatch();
  const logoutFrom = () => {
    dispatch(logout());
  };

  const areNotificationsRead = notifications.reduce(
    (acc, notif) => acc && notif.read,
    true
  );

  const markNotificationsAsRead = () => {
    setTimeout(() => {
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
    }, 300);
  };

  const Notification = (props) => {
    const { link, sender, image, time, message, read = false } = props;
    const readClassName = read ? "" : "text-danger";

    return (
      <ListGroup.Item action href={link} className="border-bottom border-light">
        <Row className="align-items-center">
          <Col className="col-auto">
            <Image
              src={image}
              className="user-avatar lg-avatar rounded-circle"
            />
          </Col>
          <Col className="ps-0 ms--2">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="h6 mb-0 text-small">{sender}</h4>
              </div>
              <div className="text-end">
                <small className={readClassName}>{time}</small>
              </div>
            </div>
            <p className="font-small mt-1 mb-0">{message}</p>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  };

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0 ">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100 pl_15">
          <div className="d-flex align-items-center">
            <Form className="navbar-search">
              <Form.Group id="topbarSearch">
                <InputGroup className="input-group-merge search-bar custom_search_input">
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faSearch} />
                  </InputGroup.Text>
                  <Form.Control type="text" placeholder="Type to search ..." />
                </InputGroup>
              </Form.Group>
            </Form>
          </div>
          <Nav className="align-items-center">
            <div style={{ marginRight: "45px" }}>
              <ModeSwitch />
            </div>
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div
                  className="media d-flex align-items-center"
                  style={{ gap: "10px" }}
                >
                  <div className="media-body ms-2  align-items-center d-none d-lg-block">
                    <span style={{color:'#161842'}}>
                      {auth.user?.firstname + " " + auth.user?.lastname}
                    </span>
                    <br />
                    <span className="mb-0 font-small fw-bold badge badge-info">
                      <b style={{ textTransform: "capitalize" }}>
                        {auth.user?.subscription?.plan}
                      </b>
                    </span>
                    <br />
                  </div>
                  <Image
                    src={Profile6}
                    className="user-avatar md-avatar rounded-circle"
                  />
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                <Dropdown.Item className="fw-bold">
                  <p className="m-0">
                    Current Plan:
                    <b style={{ textTransform: "capitalize" }}>
                      {auth.user?.subscription?.plan}
                    </b>
                  </p>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="fw-bold">
                  <Link to={"/myprofile"}>
                    <FontAwesomeIcon icon={faUserCircle} className="me-2" /> My
                    Profile
                  </Link>
                </Dropdown.Item>
                {auth.user.isAdmin && (
                  <Dropdown.Item className="fw-bold">
                    <Link to={"/app-management"}>
                      <FontAwesomeIcon icon={faRocket} className="me-2" />{" "}
                      Manage App
                    </Link>
                  </Dropdown.Item>
                )}
                <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faCog} className="me-2" /> Settings
                </Dropdown.Item>

                <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faEnvelopeOpen} className="me-2" />
                  Messages
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faUserShield} className="me-2" />
                  Support
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="fw-bold">
                  <div onClick={(e) => logoutFrom()}>
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      className="text-danger me-2"
                    />
                    Logout
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div>
              <IoIosArrowDown />
            </div>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps, null)(CustomNavbar);
