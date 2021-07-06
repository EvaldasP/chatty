import React from "react";
import firebase from "../firebase/base";
import styled from "styled-components";

const SignIn = () => {
  const auth = firebase.auth();
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <SignInDiv className="sign-in">
      <LoginFormDiv>
        <div style={{ width: "100%" }}>
          <h1
            style={{
              marginBottom: 20,
              color: "white",
              textAlign: "center",
            }}
          >
            CHATTY
          </h1>
          <Underline />
          <Description>Simple Social Media App :)</Description>
        </div>

        <Button onClick={signInWithGoogle}>
          <img
            alt="no"
            style={{ width: 30, marginRight: 10 }}
            src="\Google__G__Logo.svg.png"
          ></img>
          Sign in with Google
        </Button>
      </LoginFormDiv>
    </SignInDiv>
  );
};

export default SignIn;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  border: 2px solid #b5cda3;
  border-radius: 10px;
  transition: ease 0.3s;
  :hover {
    background-color: #b5cda3;
  }
  color: white;
`;

const SignInDiv = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #faebe0;
`;

const LoginFormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 300px;
  padding: 0 50px;
  border-radius: 10px;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  background: rgba(93, 96, 90, 0.2);
  backdrop-filter: blur(1px);
`;

const Underline = styled.div`
  background-color: white;
  height: 1px;
  width: 100%;
`;

const Description = styled.p`
  color: white;
  margin-top: 10px;
  font-size: 0.8rem;
  text-align: center;
`;
