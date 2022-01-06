import sidebarReducer from "./sidebarToggle";
import mobileReducer from "./mobileReducer";
import errors from "./errors"
import { combineReducers } from "redux";

const allReducers = combineReducers({
    sidebarReducer,
    mobileReducer,
    errors
})

export default allReducers