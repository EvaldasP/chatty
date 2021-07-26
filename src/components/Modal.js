import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import firebase from "firebase";

const Modal = ({ isModal, setModal, id }) => {
  const onDelete = async () => {
    const db = firebase.firestore();
    await db.collection("posts").doc(id).delete();
  };

  return (
    <ModalContainer isModal={isModal}>
      <ModalContent>
        <p style={{ color: "white" }}>
          Are you sure you want to delete this Post?
        </p>
        <BtnContainer>
          <DeleteBtn onClick={onDelete}>
            <FaCheck size={20} />
          </DeleteBtn>
          <CancelBtn onClick={() => setModal(false)}>
            <GiCancel size={20} />
          </CancelBtn>
        </BtnContainer>
      </ModalContent>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  display: block;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;
const ModalContent = styled.div`
  text-align: center;
  background-color: #1b262c;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #bbe1fa;
  width: 60%; /* Could be more or less, depending on screen size */
`;

const DeleteBtn = styled.div`
  color: #458c7f;
  border: 1px #458c7f solid;
  margin-right: 10px;
  padding: 10px;
  border-radius: 10px;
  transition: 0.3s;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: rgba(69, 140, 127, 0.3);
  }
`;

const CancelBtn = styled.div`
  color: #f62510;
  border: 1px #f62510 solid;
  padding: 10px;
  border-radius: 10px;
  transition: 0.3s;
  &:hover {
    cursor: pointer;
    color: white;

    background-color: rgba(246, 37, 16, 0.3);
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Modal;
