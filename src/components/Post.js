import React, { useState } from "react";
import styled from "styled-components";
import Moment from "react-moment";

const Post = ({ owner, ownerPhoto, description, postURL, createdAt }) => {
  console.log(createdAt);
  const [isClicked, setIsClicked] = useState(false);

  setTimeout(() => {
    setIsClicked(true);
  }, [500]);

  return (
    <PostWrapper>
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
      <Description>{description}</Description>
    </PostWrapper>
  );
};

const PostWrapper = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px solid #bbe1fa;
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
  color: #bbe1fa;
`;
const Header = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #bbe1fa;
`;

const Description = styled.p`
  margin: 5px 0px;
  color: #bbe1fa;
`;

export default Post;
