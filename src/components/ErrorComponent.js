
import React from "react";
import styled from "styled-components";

const ErrorText = styled.div`
  color: red;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  margin: 20px;
`;

const ErrorComponent = ({ error, clearError }) => {
  return (
    error && (
      <ErrorText>
        {error}
        <button onClick={clearError}>Clear</button>
      </ErrorText>
    )
  );
};

export default ErrorComponent;
