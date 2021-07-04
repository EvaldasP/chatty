import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import SignOut from "../pages/SignOut";

const NavBar = () => {
  const auth = firebase.auth();
  const [user] = useAuthState(auth);

  return (
    <>
      <Navbar style={{ backgroundColor: "#C490E4" }} variant="dark">
        <Container>
          <Navbar.Brand href="#home">CHATTY</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">About</Nav.Link>
          </Nav>
        </Container>
        <Container
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <h5 style={{ color: "white" }}>
            Hello,{" "}
            <img
              style={{
                verticalAlign: "middle",
                width: 40,
                height: 40,
                borderRadius: "50%",
              }}
              src={user.photoURL}
              alt="userphoto"
            ></img>{" "}
            {user.displayName}
          </h5>
          <SignOut />
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
