import React, { useState } from "react";
import Header from "../components/header";
import Inputelement from "../components/ui/input";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import LoginIcon from "@mui/icons-material/Login";
import { Form } from "react-bootstrap";
import Button from "@mui/material/Button";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { registerUser } from "../actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Register() {
  const date = new Date();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [userdata, setuserdata] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const register = (e) => {
    e.preventDefault();
    dispatch(registerUser(userdata, navigate));
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
                      <AddCircleOutlineIcon fontSize="large" /> Register
                    </h2>
                  </Col>
                </Row>
                <Card>
                  <CardContent>
                    <Form>
                      <Row className="mb-3">
                        <Inputelement
                          name="name"
                          Label="User Name"
                          type="text"
                          placeholder="Enter User Name"
                          value={userdata.name}
                          onChange={onChange("name")}
                        />
                      </Row>
                      <Row className="mb-3">
                        <Inputelement
                          name="email"
                          Label="Email Address"
                          type="email"
                          placeholder="Enter Email "
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
                        <Inputelement
                          name="password"
                          Label="confirm Password"
                          type="password"
                          placeholder="Enter Password"
                          value={userdata.password2}
                          onChange={onChange("password2")}
                        />
                      </Row>

                      <Row className="mb-3">
                        <Button variant="contained" onClick={register}>
                          <h5>
                            {" "}
                            <AddCircleOutlineIcon /> Register
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
}

export default Register;
