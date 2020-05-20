import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardSubtitle,
} from "@progress/kendo-react-layout";
import { IPoint } from "../../../actions/point.action";
import styled from "styled-components";
import InputComponent from "../../atoms/input";
import SwitchComponent from "../../atoms/switch";
import IconButtonComponent from "../../atoms/button";
import ColorPickerComponent from "../../atoms/color-picker";

/* Styled components */

const StyledCardComponent = styled(Card)`
  width: 260px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  margin: 15px;
`;

const StyledCardActions = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: transparent;
  flex-direction: row;
`;

const StyledColorPicker = styled(ColorPickerComponent)`
  margin: 10px;
`;

type IProps = {
  point: IPoint;
  editPoint: ({ id, point }: { id: string; point: IPoint }) => any;
  removePoint: (id: string) => any;
};

export const CardComponent = (props: IProps) => {
  const updateLatitude = (el: string) => {
    props.editPoint({
      id: props.point.id,
      point: { ...props.point, position: [el, props.point.position[1]] },
    });
  };
  const updateLongitude = (el: string) => {
    props.editPoint({
      id: props.point.id,
      point: { ...props.point, position: [props.point.position[0], el] },
    });
  };
  return (
    <StyledCardComponent orientation="vertical" {...props}>
      <div className="k-vbox">
        <CardHeader>
          <CardTitle style={{ fontWeight: "bold" }}>
            {props.point.name}
          </CardTitle>
          <CardSubtitle>
          {props.point.address}
          </CardSubtitle>
        </CardHeader>
        <CardBody>
          <InputComponent
            label="Lat"
            onChange={(el: any) => updateLatitude(el.value)}
            value={props.point.position[0]}
          />
          <InputComponent
            label="Lng"
            onChange={(el: any) => updateLongitude(el.value)}
            value={props.point.position[1]}
          />
          <StyledColorPicker
            defaultValue={props.point.color}
            onChange={(e: any) => {
              props.editPoint({
                id: props.point.id,
                point: { ...props.point, color: e.value },
              });
            }}
          />
        </CardBody>
        <StyledCardActions>
          <SwitchComponent
            onChange={() =>
              props.editPoint({
                id: props.point.id,
                point: { ...props.point, isShown: !props.point.isShown },
              })
            }
            checked={props.point.isShown}
          />
          <IconButtonComponent
            icon="delete"
            onClick={() => props.removePoint(props.point.id)}
          />
        </StyledCardActions>
      </div>
    </StyledCardComponent>
  );
};
