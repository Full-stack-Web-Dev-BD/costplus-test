
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faPhone, faUnlockAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter, faXbox } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, Image, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import Logo from "../../assets/img/logo.svg";
import { connect } from 'react-redux';
import { login } from '../../store/actions/authActions';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import GoogleLoginButton from "../../components/Oauth/GoogleAuth";
import GithubLoginButton from "../../components/Oauth/GithubAuth";
const Signin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.auth.error);

  const [loginError, setloginError] = useState({})

  const handleSubmit = async(e) => { 
    e.preventDefault();
    dispatch(login(email, password)); 
      // try {
      //   const response = await axios.post(`${BASE_URL}/api/auth`, { email, password });
      // } catch (error) {
      //   console.log("login error", error)
      //   setloginError(error.response?.data)
      // } 
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
            </div>
            {
              loginError?.errors?.map(err=>(
                <p className="text-danger"> {err.msg} </p>
              ))
            }
            <Form className="mt-4" onSubmit={handleSubmit}>
              <Form.Group id="Email" className="mb-4">
                <Form.Label>Email</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </InputGroup.Text>
                  <Form.Control autoFocus required type="email" placeholder="contact@gmail.com" onChange={(e) => setEmail(e.target.value)} />
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
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <Form.Check type="checkbox">
                    <FormCheck.Input id="defaultCheck5" className="me-2" />
                    <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember me</FormCheck.Label>
                  </Form.Check>
                  <Card.Link className="small text-end">Lost password?</Card.Link>
                </div>
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Sign In
              </Button>
            </Form>

            <div className="mt-3 mb-4 text-center">
              <span className="fw-normal">or sign up with</span>
            </div>
            <div className="d-flex justify-content-center my-4">
              <Button variant="outline-light" className="btn-icon-only btn-pill text-facebook me-2">
                <GoogleLoginButton/>
              </Button>
              <Button variant="outline-light" className="btn-icon-only btn-pill text-twitter me-2">
                <GithubLoginButton/>
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

export default Signin;