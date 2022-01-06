import { createStore } from "redux";
import allReducers from './reducers'

let store = createStore(allReducers)

export default store