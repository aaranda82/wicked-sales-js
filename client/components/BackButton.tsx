import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colorScheme } from "../colorScheme";

const { green, text } = colorScheme;
const Back = styled(Link)`
  width: 100%;
  cursor: pointer;
  color: ${text};
  &:hover {
    color: ${green};
    text-decoration: none;
  }
`;

export const BackButton = ({ name }: { name: string }) => {
  return (
    <Back to="/">
      <i className="fas fa-arrow-left" style={{ marginRight: "5px" }} />
      {name}
    </Back>
  );
};
