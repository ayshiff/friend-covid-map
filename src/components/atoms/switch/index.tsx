import React from "react";
import { Switch } from "@progress/kendo-react-inputs";
import styled from "styled-components";

/* Styled components */

const StyledSwitch = styled(Switch)``;

type IProps = {
  checked: boolean;
  onChange: () => void;
};

const SwitchComponent = ({ checked, onChange }: IProps) => (
  <div>
    <StyledSwitch checked={checked} onChange={onChange} />
  </div>
);

export default SwitchComponent;
