import { combineReducers } from "redux";
import authReducer from "./authReducer";
import stockInReducer from "./stockInReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    stockIn: stockInReducer
});

export default rootReducer;