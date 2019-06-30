import { combineReducers } from "redux";
import authReducer from "./authReducer";
import stockInReducer from "./stockInReducer";
import roleReducer from "./roleReducer";
import permissionReducer from "./permissionReducer";
import employeeReducer from "./employeeReducer";
import customerReducer from "./customerReducer";
import supplierReducer from "./supplierReducer";
import expenseReducer from "./expenseReducer";
import categoryReducer from "./categoryReducer";
import storeReducer from "./storeReducer";
import settingReducer from "./settingReducer";
import passwordReducer from "./passwordReducer";
import discountReducer from "./discountReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    stockIn: stockInReducer,
    role: roleReducer,
    permission: permissionReducer,
    employee: employeeReducer,
    customer: customerReducer,
    supplier: supplierReducer,
    expense: expenseReducer,
    category: categoryReducer,
    store: storeReducer,
    setting: settingReducer,
    password: passwordReducer,
    discount: discountReducer
});

export default rootReducer;