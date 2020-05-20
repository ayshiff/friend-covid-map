import { AjaxResponse, AjaxError, ajax } from "rxjs/ajax";
import { mergeMap, catchError, concatMap, debounceTime, switchMap } from "rxjs/operators";
import { of, Observable } from "rxjs";

import { ofType, Epic } from "redux-observable";
import { PointTypes, pointActions } from "../actions/point.action";

export const fetchAddressFromAddEpic: Epic = (
  action$: Observable<any>,
  state$: Observable<any>,
): Observable<any> => {
  return action$.pipe(
    ofType(
      PointTypes.AddPoint
    ),
    concatMap((action: any) => {
      return ajax({
        url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${action.point.position[0]},${action.point.position[1]}.json?access_token=${process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN}`,
        method: "GET",
      }).pipe(
        mergeMap((data: AjaxResponse) => {
          return of(pointActions.addPointAddressSuccess(action.point.id, data.response.features[0].place_name));
        }),
        catchError((err: AjaxError) => {
          return of(pointActions.addPointAddressFail(err));
        })
      );
    })
  );
};

export const fetchAddressFromEditEpic: Epic = (
  action$: Observable<any>,
  state$: Observable<any>,
): Observable<any> => {
  return action$.pipe(
    ofType(
      PointTypes.AddPointAddress
    ),
    concatMap((action: any) => {
      return ajax({
        url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${action.point.position[0]},${action.point.position[1]}.json?access_token=${process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN}`,
        method: "GET",
      }).pipe(
        mergeMap((data: AjaxResponse) => {
          return of(pointActions.addPointAddressSuccess(action.point.id, data.response.features[0].place_name));
        }),
        catchError((err: AjaxError) => {
          return of(pointActions.addPointAddressFail(err));
        })
      );
    })
  );
};

export const triggerOnAdressChangeEpic: Epic = (
  action$: Observable<any>,
  state$: Observable<any>,
): Observable<any> => {
  return action$.pipe(
    ofType(PointTypes.EditPoint),
    debounceTime(1000),
    switchMap((action: any) => of(pointActions.addPointAddress(action.payload.point)))
  );
};


export default [fetchAddressFromAddEpic, fetchAddressFromEditEpic, triggerOnAdressChangeEpic ];
