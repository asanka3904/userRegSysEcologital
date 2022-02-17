import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card, Button } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../actions/authAction";
import { deleteUser } from "../actions/userAction";
const Profile = () => {
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const authred = useSelector((state) => state.auth);
  const alluserdata = useSelector((state) => state.userAlldata);

  const [users, setusers] = useState();

  //check auth first load
  useEffect(() => {
    if (!authred.isAuthenticated) {
      navigate("./login");
    } else {
      dispatch(getAllUser());

      if (alluserdata.data) {
        setusers(alluserdata.data);
        console.log(alluserdata.data);
      }
    }
  }, [alluserdata.loading]);

  const deleteusers = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <>
      <Container style={{ paddingTop: "5%" }}>
        <Row className="justify-content-md-center">
          <Col xs={12} md={5}>
            <h1>users detail</h1>
            {users !== undefined && users !== null && users.length > 0
              ? users.map((user) => (
                  <div className="mt-2" key={user._id}>
                    <Card>
                      <Card.Header>{user.name}</Card.Header>
                      <Card.Body>
                        <Card.Text>{user.email}</Card.Text>

                        <IconButton
                          size="large"
                          edge="start"
                          color="inherit"
                          aria-label="menu"
                          sx={{ mr: 2 }}
                          disabled={
                            authred.user.role == "admin" ||
                            authred.user.id == user._id
                              ? false
                              : true
                          }
                        >
                          <EditIcon />
                        </IconButton>

                        <IconButton
                          size="large"
                          edge="start"
                          color="inherit"
                          aria-label="menu"
                          disabled={
                            authred.user.role == "admin" ||
                            authred.user.id == user._id
                              ? false
                              : true
                          }
                          sx={{ mr: 2 }}
                          onClick={deleteusers(user._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Card.Body>
                    </Card>
                  </div>
                ))
              : ""}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
