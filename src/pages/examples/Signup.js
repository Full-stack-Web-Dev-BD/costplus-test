
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faPhone, faUnlockAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter, faXbox } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, Image, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

import { Routes } from "../../routes";
import Logo from "../../assets/img/logo.svg";
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signup } from '../../store/actions/authActions';
import toast from "react-hot-toast";

const Signup = () => {

  const [country, setCountry] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (confirmpassword != password) { 
      toast.error('Password does not match.');
      return;
    }
    dispatch(signup(firstname, lastname, company, country, phone, email, password));
  };

  // Monitor changes to isAuthenticated, and redirect on successful signup
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard'); // Replace '/dashboard' with your desired redirect path
    }
  }, [isAuthenticated, history]);

  return (
    <main style={{ 'height': '100vh' }}>
      <Row className="justify-content-center form-bg-image" style={{ 'height': '100vh' }}>
        <Col className="align-items-center justify-content-center sign-in-sidebar" style={{
          'display': 'flex',
          'alignItems': 'center',
          'backgroundColor': '#1C1E53',
          'textAlign': 'center',
        }}>
          <div>
            <Image src={Logo} width={250} height={120} />
            <h5 className="text-white p-4">Rapid prototyping and on-demand production in as fast as 1 day.</h5>
          </div>
        </Col>
        <Col className="d-flex justify-content-center">
          <div className="p-4 p-lg-5 pl-0 pr-0 w-100 fmxw-500">
            <div className="mb-4 mt-md-0">
              <h3 className="mb-0">Start Here to Get a Quote!</h3>
              <p className="text-dark">We need some basic info about you. Learn why we ask.</p>
              {error && <div>{error}</div>}
              {isAuthenticated && <div>{isAuthenticated}authenticated</div>}
            </div>
            <Form className="mt-4" onSubmit={handleSubmit}>
              <Row>
                <Col xs={6}>
                  <Form.Group id="fistname" className="mb-4">
                    <Form.Label>First Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="John" onChange={(e) => setFirstname(e.target.value)} />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group id="lastname" className="mb-4">
                    <Form.Label>Last Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="Doe" onChange={(e) => setLastname(e.target.value)} />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group id="company" className="mb-4">
                <Form.Label>Company</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faXbox} />
                  </InputGroup.Text>
                  <Form.Control autoFocus required type="text" placeholder="Apple" onChange={(e) => setCompany(e.target.value)} />
                </InputGroup>
              </Form.Group>
              <Form.Group id="country" className="mb-4">
                <Form.Label>Country</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </InputGroup.Text>
                  <CountryDropdown
                    value={country}
                    onChange={(val) => setCountry(val)} />
                  {/* <Form.Control autoFocus required type="email" placeholder="example@company.com" /> */}
                </InputGroup>
              </Form.Group>
              <Form.Group id="Email" className="mb-4">
                <Form.Label>Email</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </InputGroup.Text>
                  <Form.Control autoFocus required name="email" type="email" placeholder="contact@gmail.com" onChange={(e) => setEmail(e.target.value)} />
                </InputGroup>
              </Form.Group>
              <Form.Group id="phone" className="mb-4">
                <Form.Label>Phone</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faPhone} />
                  </InputGroup.Text>
                  <Form.Control required type="number" placeholder="Enter Phone Number" onChange={(e) => setPhone(e.target.value)} />
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <Form.Group id="password" className="mb-4">
                  <Form.Label>Your Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faUnlockAlt} />
                    </InputGroup.Text>
                    <Form.Control required type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                  </InputGroup>
                </Form.Group>
              </Form.Group>
              <Form.Group id="confirmPassword" className="mb-4">
                <Form.Label>Confirm Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faUnlockAlt} />
                  </InputGroup.Text>
                  <Form.Control required type="password" placeholder="Confirm Password" onChange={(e) => setConfirmpassword(e.target.value)} />
                </InputGroup>
              </Form.Group>
              <FormCheck type="checkbox" className="d-flex mb-4">
                <FormCheck.Input required id="terms" className="me-2" />
                <FormCheck.Label htmlFor="terms">
                  I agree to the <Card.Link>terms and conditions</Card.Link>
                </FormCheck.Label>
              </FormCheck>
              <Button variant="primary" type="submit" className="w-100">
                Sign Up
              </Button>
            </Form>

            <div className="mt-3 mb-4 text-center">
              <span className="fw-normal">or sign up with</span>
            </div>
            <div className="d-flex justify-content-center my-4">
              <Button variant="outline-light" className="btn-icon-only btn-pill text-facebook me-2">
                <FontAwesomeIcon icon={faFacebookF} />
              </Button>
              <Button variant="outline-light" className="btn-icon-only btn-pill text-twitter me-2">
                <FontAwesomeIcon icon={faTwitter} />
              </Button>
              <Button variant="outline-light" className="btn-icon-only btn-pil text-dark">
                <FontAwesomeIcon icon={faGithub} />
              </Button>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-4">
              <span className="fw-normal">
                Not registered?
                <Card.Link as={Link} to={Routes.Signup.path} className="fw-bold">
                  {` Create account `}
                </Card.Link>
              </span>
            </div>
          </div>
        </Col>
      </Row>
    </main >
  );
};

export default Signup;