import { legacy_createStore } from "redux"
import reducer from "../Reducer/Reducer";
export let myStore=legacy_createStore(reducer);
