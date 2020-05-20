import React, { useState } from "react";
import IconButtonComponent from "../../atoms/button";
import styled from "styled-components";

import Geocoder from "../../atoms/geocoder";

/* Styled components */

const StyledAddPanelComponent = styled.div`
  display: flex;
  flex-direction: row;
`;

const mapAccess = {
  mapboxApiAccessToken: process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN
};

const queryParams = {
  country: "fr",
};

export const AddPanelComponent = ({
  onAddSearchLocation,
}: {
  onAddSearchLocation: (position: any[]) => void;
}) => {
  const [position, setPosition] = useState([]);

  return (
    <StyledAddPanelComponent>
      <Geocoder
        {...mapAccess}
        limit={6}
        queryParams={queryParams}
        onComplete={(e: any) => setPosition(e.geometry.coordinates)}
      />
      <IconButtonComponent
        icon="add"
        onClick={() => {
          onAddSearchLocation(position);
        }}
      />
    </StyledAddPanelComponent>
  );
};
