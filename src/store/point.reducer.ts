import { IPoint, PointTypes } from "../actions/point.action";

const initialState: any = {
  list: [] as IPoint[],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case PointTypes.AddPoint:
      return {
        list: [...state.list, action.point],
      };
    case PointTypes.RemovePoint:
      return {
        list: state.list.filter((point: IPoint) => point.id !== action.id),
      };
    case PointTypes.EditPoint:
      const { point } = action.payload;
      return {
        list: state.list.map((oldPoint: IPoint) => {
          if (oldPoint.id === point.id) {
            return point;
          }
          return oldPoint;
        }),
      };
    default:
      return state;
  }
};
