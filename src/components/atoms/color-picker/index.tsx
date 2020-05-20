import React from "react";
import { ColorPicker } from "@progress/kendo-react-inputs";
import styled from "styled-components";

/* Styled components */

const StyledColorPicker = styled(ColorPicker)``;

type IProps = {
  defaultValue: string;
  onChange: (el: any) => any;
};

const ColorPickerComponent = ({ defaultValue, onChange }: IProps) => (
  <StyledColorPicker
    view="gradient"
    defaultValue={defaultValue}
    onChange={onChange}
  />
);

export default ColorPickerComponent;
