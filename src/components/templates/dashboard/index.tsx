import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { IPoint, pointActions } from "../../../actions/point.action";
import { CardComponent } from "../../organisms/card";
import styled from "styled-components";

import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import circle from "../../../utils/circle";

type IProps = {
  points: IPoint[];
  editPoint: ({ id, point }: { id: string; point: IPoint }) => any;
  removePoint: (id: string) => any;
};

/* Styled components */

const StyledDasahboard = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledGrid = styled(Grid)`
  margin: 50px;
`;

const Dashboardboxgl = ({ points, editPoint, removePoint }: IProps) => {
  const [isReady, setReady] = useState(false);
  const [calculatedData, setCalculatedData] = useState([]);

  useEffect(() => {
    const tt: any[] = [];
    for (let i = 0; i < points.length; i++) {
      for (let y = i + 1; y < points.length; y++) {

        const point1 = {
          x: Number(points[i].position[0]),
          y: Number(points[i].position[1]),
          r: 1,
        };
        const point2 = {
          x: Number(points[y].position[0]),
          y: Number(points[y].position[1]),
          r: 1,
        };
        const isIntersecting = circle.intersect(point1, point2);
        const intersectingArea = isIntersecting
          ? circle.intersectionArea(point1, point2) * 10**4
          : 0;

        tt.push({
          point1: points[i].name,
          point2: points[y].name,
          isIntersecting: isIntersecting ? "Yes" : "No",
          intersectingArea: intersectingArea.toFixed(3) + " km²",
        });
      }
    }
    setCalculatedData(tt as any);
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points]);

  return (
    <>
      <StyledDasahboard>
        {points.map((point: IPoint) => (
          <CardComponent
            key={point.id}
            editPoint={editPoint}
            removePoint={removePoint}
            point={point}
          />
        ))}
      </StyledDasahboard>

      {isReady && (
        <StyledGrid data={[...calculatedData]}>
          <Column field="point1" title="point A" />
          <Column field="point2" title="point B" />
          <Column field="isIntersecting" title="Are points intersecting ?" />
          <Column field="intersectingArea" title="Intersecting Area" />
        </StyledGrid>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  points: state.points.list,
});

const mapDispatchToProps = (dispatch: any) => ({
  editPoint: ({ id, point }: { id: string; point: IPoint }) =>
    dispatch(pointActions.editPointById(id, point)),
  removePoint: (id: string) => dispatch(pointActions.removePointById(id)),
});

export const DashboardComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboardboxgl);
