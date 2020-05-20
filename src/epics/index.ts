import { combineEpics } from "redux-observable";

import pointEpic from "./point.epic";

const epics = combineEpics(...pointEpic);

export default epics;
