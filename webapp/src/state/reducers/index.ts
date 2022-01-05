import { combineReducers } from "redux";
import user from "../redux/ducks/user";
import bill from "../redux/ducks/bill";
import customer from "../redux/ducks/customer";

const rootReducer = combineReducers({
  bill,
  user,
  customer
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;