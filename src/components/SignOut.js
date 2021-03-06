import React from "react";
import styled from "styled-components";
import { AiOutlineLogout } from "react-icons/ai";

const SignOut = ({ auth }) => {
  return (
    auth.currentUser && (
      <SingnOutButton onClick={() => auth.signOut()}>
        <AiOutlineLogout size={30} />
      </SingnOutButton>
    )
  );
};

const SingnOutButton = styled.button`
  background-color: rgba(231, 76, 60, 0.2);
  border: none;
  color: #e74c3c;
  border: 1px solid #e74c3c;
  border-radius: 10px;
  padding: 8px;
  transition: 0.3s;
  :hover {
    background-color: #e74c3c;
    color: white;
  }
`;

export default SignOut;
