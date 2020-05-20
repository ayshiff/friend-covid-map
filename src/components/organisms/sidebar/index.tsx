import React from "react";
import { AddPanelComponent } from "../../molecules/add-panel/index";
import styled from "styled-components";

/* Styled components */

const StyledSideBar = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Sidebar = ({
  onAddSearchLocation,
}: {
  onAddSearchLocation: any;
}) => {
  return (
    <StyledSideBar>
      <AddPanelComponent onAddSearchLocation={onAddSearchLocation} />
    </StyledSideBar>
  );
};
