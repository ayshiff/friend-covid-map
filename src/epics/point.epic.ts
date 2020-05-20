// import { ajax } from "rxjs/ajax";
// import { map, mergeMap, catchError } from "rxjs/operators";
// import { of } from "rxjs";

// import {
//   StudentActions,
//   AGetStudentsSucess,
//   AAddStudentSucess,
//   AEditStudnetSucess,
//   ADeleteStudentSucess,
//   AGetAllStudentsSucess
// } from "../actions/user.action";
// import { ofType } from "redux-observable";

const fetchAdressEpic = (action$: any) => {
  return "ok";
  // return action$.pipe(
  //   ofType(StudentActions.GET_STUDENT),
  //   mergeMap((action: any) =>
  //     ajax({
  //       url: `${API_URL}/${action.payload.id}`,
  //       method: "GET",
  //       headers: {
  //         accept: "application/json",
  //         "Content-type": "application/json"
  //       }
  //     }).pipe(
  //       map(data => AGetStudentsSucess(data.response)),
  //       catchError(error =>
  //         of({
  //           type: StudentActions.GET_STUDENT_FAIL,
  //           payload: error.xhr.response,
  //           error: true
  //         })
  //       )
  //     )
  //   )
  // );
};

export default [fetchAdressEpic];
