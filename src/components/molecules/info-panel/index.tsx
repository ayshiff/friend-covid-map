import React from "react";
import styled from "styled-components";

/* Styled components */

const StyledInfoPanelComponent = styled.div`
  width: 400px;
  height: 140px;
  margin: 20px;
  border-radius: 13px;
  position: absolute;
  color: #656565;
  padding: 20px;
  z-index: 99;
  bottom: 10px;
  left: 10px;
  background-color: rgb(255, 255, 255);
`;

const StyledInfoPanelHeaderComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InfoPanelComponent = () => {
  return (
    <StyledInfoPanelComponent>
      <StyledInfoPanelHeaderComponent>
        <span className="k-icon k-i-info"></span>
        <p>Deconfinement - COVID-19</p>
      </StyledInfoPanelHeaderComponent>
      <p>
        As the french government said, you should be able to move within a
        radius of <b>100km radius</b> around your home. This app helps you find
        the <b>the best place to meet your family - friends</b>.
      </p>
    </StyledInfoPanelComponent>
  );
};
