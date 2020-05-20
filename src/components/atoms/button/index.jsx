import React from "react";
import { Button } from "@progress/kendo-react-buttons";
import styled from "styled-components";

const StyledIconButton = styled(Button)`
  margin: 20px;
`;

const IconButtonComponent = (props) => (
  <div>
    <StyledIconButton onClick={props.onClick} icon={props.icon}>
      {props.children}
    </StyledIconButton>
  </div>
);

export default IconButtonComponent;
