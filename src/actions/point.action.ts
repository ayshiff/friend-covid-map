import { ActionTypes } from "./core/action.type";
import { AjaxError } from "rxjs/ajax";

export enum PointTypes {
  AddPoint = "[POINT] ADD_POINT",
  RemovePoint = "[POINT] REMOVE_POINT",
  EditPoint = "[POINT] EDIT_POINT",
  AddPointAddress = "[POINT] ADD_POINT_ADDRESS",
  AddPointAddressSuccess = "[POINT] ADD_POINT_ADDRESS_SUCCESS",
  AddPointAddressFail = "[POINT] ADD_POINT_ADDRESS_FAIL",
}

export type IPoint = {
  id: string;
  position: string[];
  color: string;
  name: string;
  address: string;
  isShown: boolean;
};

// Our object that produce our action creators
export const pointActions = {
  addPoint: (point: IPoint) => ({ type: PointTypes.AddPoint, point } as const),
  removePointById: (id: string) =>
    ({ type: PointTypes.RemovePoint, id } as const),
  editPointById: (id: string, point: IPoint) =>
    ({ type: PointTypes.EditPoint, payload: { id, point } } as const),
  addPointAddress: (point: IPoint) => ({ type: PointTypes.AddPointAddress, point } as const),
  addPointAddressSuccess: (id: string, address: string) => ({ type: PointTypes.AddPointAddressSuccess, payload: { id, address } } as const),
  addPointAddressFail: (err: AjaxError) => ({ type: PointTypes.AddPointAddressFail } as const),
};

// We can then type all of our actions with a single line
export type PointActions = ActionTypes<typeof pointActions>;
