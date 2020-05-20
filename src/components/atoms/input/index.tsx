import React from "react";
import { Input } from "@progress/kendo-react-inputs";
import styled from "styled-components";

/* Styled components */

const StyledInput = styled(Input)`
  margin: ${(props: IProps2) =>
    props["has-margin"] === "true" ? "20px" : "0"};
`;

type IProps2 = {
  "has-margin": string;
};

type IProps = {
  value: string;
  label?: string;
  onChange: (el: any) => any;
  hasMargin?: boolean;
  placeholder?: string;
};

const InputComponent = ({
  value,
  onChange,
  label,
  hasMargin = false,
  placeholder = "",
}: IProps) => (
  <div>
    <StyledInput
      label={label}
      has-margin={String(hasMargin)}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

export default InputComponent;
