import React, { useState } from "react";
import styled from "styled-components";
import Moment from "react-moment";
import { RiDeleteBin2Line } from "react-icons/ri";
import firebase from "../firebase/base";
import Modal from "../components/Modal";

const Post = ({
  owner,
  ownerPhoto,
  description,
  postURL,
  createdAt,
  loggedInUser,
  postOwnerId,
  id,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isModal, setModal] = useState(false);
  console.log(isModal);

  setTimeout(() => {
    setIsClicked(true);
  }, [500]);

  return (
    <PostWrapper>
      <div style={{ padding: 20 }}>
        {isModal ? (
          <Modal isModal={isModal} id={id} setModal={setModal}></Modal>
        ) : null}
        <Header>
          <PostCreator>
            <img
              style={{
                verticalAlign: "middle",
                width: 40,
                height: 40,
                borderRadius: "50%",
                marginRight: 10,
              }}
              src={ownerPhoto}
              alt="userphoto"
            ></img>
            <h6 style={{ marginBottom: 0 }}>{owner}</h6>
          </PostCreator>
          {isClicked ? (
            <Moment fromNow>{new Date(createdAt.seconds * 1000)}</Moment>
          ) : null}
        </Header>
        <Image imageURL={postURL} />
        <DescriptionWrapper>
          <Description>{description}</Description>
          {loggedInUser.uid === postOwnerId ? (
            <ButtonWrapper>
              <DeleteBtn>
                <RiDeleteBin2Line
                  onClick={() => setModal(!isModal)}
                  size="30"
                />
              </DeleteBtn>
            </ButtonWrapper>
          ) : null}
        </DescriptionWrapper>
      </div>
    </PostWrapper>
  );
};

const PostWrapper = styled.div`
  margin-bottom: 20px;
  border: 2px solid #cb69c1;
  border-radius: 15px;
  margin: 0 30px;
`;

const Image = styled.div`
  background: url(${(props) => props.imageURL}) no-repeat;
  background-position: center;
  background-size: cover;
  height: 400px;
  width: 400px;
`;

const PostCreator = styled.div`
  display: flex;
  align-items: center;
  color: #6c72cb;
`;
const Header = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #eeedf0;
`;

const Description = styled.p`
  margin: 5px 0px;
  color: #eeedf0;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ButtonWrapper = styled.div``;

const DeleteBtn = styled.div`
  :first-child {
    color: white;
    transition: 0.3s;
  }
  &:hover {
    :first-child {
      color: red;
      cursor: pointer;
    }
  }
`;

export default Post;
