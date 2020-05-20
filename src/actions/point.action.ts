import { ActionTypes } from "./core/action.type";

export enum PointTypes {
  AddPoint = "[POINT] ADD_POINT",
  RemovePoint = "[POINT] REMOVE_POINT",
  EditPoint = "[POINT] EDIT_POINT",
}

export type IPoint = {
  id: string;
  position: string[];
  color: string;
  name: string;
  adress: string;
  isShown: boolean;
};

// Our object that produce our action creators
export const pointActions = {
  addPoint: (point: IPoint) => ({ type: PointTypes.AddPoint, point } as const),
  removePointById: (id: string) =>
    ({ type: PointTypes.RemovePoint, id } as const),
  editPointById: (id: string, point: IPoint) =>
    ({ type: PointTypes.EditPoint, payload: { id, point } } as const),
};

// We can then type all of our actions with a single line
export type PointActions = ActionTypes<typeof pointActions>;
