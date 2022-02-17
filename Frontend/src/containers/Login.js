import React, { useState, useEffect } from "react";

import Header from "../components/header";
import Inputelement from "../components/ui/input";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Alert from "@mui/material/Alert";
import moment from "moment";
import LoginIcon from "@mui/icons-material/Login";
import { Form } from "react-bootstrap";
import Button from "@mui/material/Button";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import { loginUser, logoutUser } from "../actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const authred = useSelector((state) => state.auth);

  const date = new Date();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [userdata, setuserdata] = useState({
    email: "",
    password: "",
  });

  //chcek auth first load
  useEffect(() => {
    if (authred.isAuthenticated) {
      navigate("/");
    }
  }, [authred.isAuthenticated]);

  const login = (e) => {
    e.preventDefault();
    dispatch(loginUser(userdata));
    console.log(userdata);
  };

  const onChange = (name) => (e) => {
    setuserdata({ ...userdata, [name]: e.target.value });
  };

  return (
    <>
      <Container style={{ paddingTop: "5%" }}>
        <Row className="justify-content-md-center">
          <Col xs={12} md={5}>
            <Card>
              <CardContent>
                <Row>
                  <Col>
                    <h2>
                      {" "}
                      <LoginIcon fontSize="large" /> Sign In
                    </h2>
                    <Alert severity="info">
                      <div>
                        {" "}
                        <h4>{moment(date).format("LL")} </h4>
                      </div>
                    </Alert>
                  </Col>
                </Row>
                <Card>
                  <CardContent>
                    <Form>
                      <Row className="mb-3">
                        <Inputelement
                          name="email"
                          Label="User Name"
                          type="text"
                          placeholder="Enter User Name"
                          value={userdata.email}
                          onChange={onChange("email")}
                        />
                      </Row>
                      <Row className="mb-3">
                        <Inputelement
                          name="password"
                          Label="Password"
                          type="password"
                          placeholder="Enter Password"
                          value={userdata.password}
                          onChange={onChange("password")}
                        />
                      </Row>
                      <Row className="mb-3">
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicCheckbox"
                        >
                          <Form.Check type="checkbox" label="Remember Me" />
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Button variant="contained" onClick={login}>
                          <h5>
                            {" "}
                            <LockOpenIcon /> Sign In
                          </h5>
                        </Button>
                      </Row>
                    </Form>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
