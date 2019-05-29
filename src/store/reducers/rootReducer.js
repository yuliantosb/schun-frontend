import { combineReducers } from "redux";
import authReducer from "./authReducer";
import stockInReducer from "./stockInReducer";
import roleReducer from "./roleReducer";
import permissionReducer from "./permissionReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    stockIn: stockInReducer,
    role: roleReducer,
    permission: permissionReducer
});

export default rootReducer;