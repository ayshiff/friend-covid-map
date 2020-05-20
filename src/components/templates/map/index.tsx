import React, { useState } from "react";
import { Sidebar } from "../../organisms/sidebar/index";
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import { connect } from "react-redux";
import "./index.css";
import { IPoint, pointActions } from "../../../actions/point.action";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import InputComponent from "../../atoms/input";
import ColorPickerComponent from "../../atoms/color-picker";
import { InfoPanelComponent } from "../../molecules/info-panel";
import styled from "styled-components";
import {
  metersToPixelsAtMaxZoom,
  generateRandomId,
} from "../../../utils/calculation";

/* Map config */

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN as string
});

const mapContainerStyle = {
  height: "calc(100vh - 40px)",
  width: "100vw",
};

/* Styled components */

const StyledSidebarContainer = styled.div`
  width: 300px;
  height: 70px;
  margin: 20px;
  border-radius: 13px;
  position: absolute;
  z-index: 99;
  left: 0;
  top: 80px;
  background-color: rgb(255, 255, 255);
`;

const StyledPopUp = styled(Popup)`
  color: #656565;
  height: 40px;
`;

const StyledInfoContainer = styled.div`
  width: 300px;
  height: 70px;
  margin: 20px;
  border-radius: 13px;
  position: absolute;
  align-items: center;
  justify-content: center;
  z-index: 99;
  display: flex;
  color: #656565;
  left: 0;
  top: 0;
  background-color: rgb(255,255,255);
`;

const StyledMapContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 40px);
  display: block;
  position: relative;
  position: block;
`;

const StyledModalContent = styled.p`
  margin: 20px;
  text-align: center;
  color: #656565;
`;

const StyledModalInputs = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Mapboxgl = ({
  points,
  addPoint,
}: {
  points: any;
  addPoint: (point: IPoint) => any;
}) => {
  const [isVisible, toggleModal] = useState(false);
  const [pointName, setPointName] = useState("");
  const [pointColor, setPointColor] = useState("rgba(212,51,31,1)" as string);
  const [mapState, setMapState] = useState({ ev: null } as any);

  // Search bar
  const [searchCoordinates, setSearchCoordinates] = useState([0, 0]);

  const handleClick = () => {
    const { ev } = mapState;

    addPoint({
      id: generateRandomId(),
      position: !ev
        ? [
            String(searchCoordinates[0].toFixed(3)),
            String(searchCoordinates[1].toFixed(3)),
          ]
        : [String(ev.lngLat.lng.toFixed(3)), String(ev.lngLat.lat.toFixed(3))],
      color: pointColor,
      name: pointName,
      adress: "",
      isShown: true,
    });
    setPointName("");
    setPointColor("rgba(128, 0, 45, 1)");
    setSearchCoordinates([0, 0]);
  };

  const openModal = (ev: any) => {
    toggleModal(true);
    setMapState({ ev });
  };

  return (
    <StyledMapContainer>
      <StyledSidebarContainer>
        <Sidebar
          onAddSearchLocation={(coordinates: any[]) => {
            toggleModal(true);
            setSearchCoordinates(coordinates as any);
          }}
        />
      </StyledSidebarContainer>
      <InfoPanelComponent />
      <StyledInfoContainer>
          <p>Add a point by <b>clicking on the map</b></p>
      </StyledInfoContainer>
      <Map
        style={"mapbox://styles/mapbox/streets-v8" as string}
        containerStyle={mapContainerStyle}
        zoom={[5]}
        center={[2, 46]}
        onClick={(map, ev) => openModal(ev)}
      >
        <Layer
          type="symbol"
          id="marker3"
          layout={{ "icon-image": "marker-15" }}
        >
          {points.map((point: any, i: any) => (
            <Feature
              key={`marker_key_${point.position}`}
              coordinates={point.position}
            />
          ))}
        </Layer>

        {/* Circle */}
        {points.map(
          (point: any, i: any) =>
            point.isShown && (
              <Layer
                type="circle"
                id={`circle_id_${i}`}
                key={`circle_key_${i}`}
                paint={{
                  "circle-opacity": 0.3,
                  "circle-color": point.color,
                  "circle-radius": {
                    stops: [
                      [0, 0],
                      [20, metersToPixelsAtMaxZoom(100000, point.position[1])],
                    ],
                    base: 2,
                  },
                }}
              >
                <Feature key={point.position} coordinates={point.position} />
              </Layer>
            )
        )}

        {/* PopUp */}
        {points.map(
          (point: any, i: any) =>
            point.isShown && (
              <StyledPopUp
                key={`popup_key_${i}`}
                coordinates={point.position}
                offset={10}
              >
                <p>
                  <b>{point.name}</b>
                </p>
              </StyledPopUp>
            )
        )}

        {/* Modal */}
        {isVisible && (
          <Dialog
            title={"Create your point"}
            onClose={() => {
              toggleModal(false);
              setMapState({ ev: null });
            }}
          >
            <StyledModalContent>
              Please choose a <b>name</b> and a <b>color</b> for your point
            </StyledModalContent>
            <StyledModalInputs>
              <InputComponent
                value={pointName}
                onChange={(e: any) => setPointName(e.value)}
                placeholder="Add your home name"
              />
              <ColorPickerComponent
                defaultValue={pointColor}
                onChange={(e: any) => setPointColor(e.value)}
              />
            </StyledModalInputs>
            <DialogActionsBar>
              <button
                className="k-button"
                onClick={() => {
                  toggleModal(false);
                  handleClick();
                }}
              >
                Confirm
              </button>
            </DialogActionsBar>
          </Dialog>
        )}
      </Map>
    </StyledMapContainer>
  );
};

const mapStateToProps = (state: any) => ({
  points: state.points.list,
});

const mapDispatchToProps = (dispatch: any) => ({
  addPoint: (point: IPoint) => dispatch(pointActions.addPoint(point)),
});

export const MapComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Mapboxgl);
