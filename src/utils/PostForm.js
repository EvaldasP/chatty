import React from "react";
import styled from "styled-components";

const PostForm = () => {
  return (
    <PostFormWrapper>
      <Form>
        <input type="text" />
        <input type="file" />
        <button type="submit">Upload</button>
      </Form>
    </PostFormWrapper>
  );
};

const PostFormWrapper = styled.div``;

const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default PostForm;
