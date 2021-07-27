import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import SignOut from "../components/SignOut";
import { Link } from "react-router-dom";

const NavBar = ({ user, auth }) => {
  return (
    <>
      <Navbar
        style={{
          backgroundColor: "#17181F",
          width: "100%",
          borderBottom: "1px solid #cb69c1",
          marginBottom: "20px",
        }}
        variant="dark"
      >
        <Container>
          <Navbar.Brand>CHATTY</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/chatroom">ChatRoom</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/posts">Posts</Link>
            </Nav.Link>
          </Nav>
        </Container>
        <Container
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <h6
            style={{
              color: "#eeedf0",
              display: "flex",
              alignItems: "center",
              marginRight: 20,
              marginBottom: 0,
            }}
          >
            <img
              style={{
                verticalAlign: "middle",
                width: 40,
                height: 40,
                borderRadius: "50%",
                marginRight: 10,
              }}
              src={user.photoURL}
              alt="userphoto"
            ></img>
            {user.displayName}
          </h6>
          <SignOut auth={auth} />
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
