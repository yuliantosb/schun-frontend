import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, BlankLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import Login from "./views/Login";
import ForgotPassword from "./views/ForgotPassword";
import Register from "./views/Register";
import Role from "./views/Role";
import Permission from "./views/Permission";
import Employee from "./views/Employee";
import AddEmployee from "./views/AddEmployee";
import Customer from "./views/Customer";
import Supplier from "./views/Supplier";
import Settings from "./views/Settings";
import Category from "./views/Category";
import Expense from "./views/Expense";
import Stores from "./views/Stores";
import AddRole from "./views/AddRole";
import AddPermission from "./views/AddPermission";
import EditPermission from "./views/EditPermission";
import EditRole from "./views/EditRole";
import AddStockIn from './views/AddStockIn';
import EditEmployee from "./views/EditEmployee";
import ViewEmployee from "./views/ViewEmployee";
import AddCustomer from "./views/AddCustomer";
import EditCustomer from "./views/EditCustomer";
import AddSupplier from "./views/AddSupplier";
import EditSupplier from "./views/EditSupplier";
import AddExpense from "./views/AddExpense";
import EditExpense from "./views/EditExpense";
import AddCategory from "./views/AddCategory";
import EditCategory from "./views/EditCategory";
import AddStores from "./views/AddStores";
import EditStores from "./views/EditStores";
import ResetPassword from "./views/ResetPassword";
import Discount from "./views/Discount";
import AddDiscount from "./views/AddDiscount";
import EditDiscount from "./views/EditDiscount";
import Product from "./views/Product";
import AddProduct from "./views/AddProduct";
import ViewProduct from "./views/ViewProduct";
import EditProduct from "./views/EditProduct";
import Pos from "./views/Pos";
import Sales from "./views/Sales";
import ViewSales from "./views/ViewSales";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/dashboard" />
  },
  {
    path: "/dashboard",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/login",
    layout: BlankLayout,
    component: Login
  },
  {
    path: "/forgot-password",
    layout: BlankLayout,
    component: ForgotPassword
  },
  {
    path: "/password/reset/:token",
    layout: BlankLayout,
    component: ResetPassword,
    exact: true
  },
  {
    path: "/register",
    layout: BlankLayout,
    component: Register
  },
  {
    path: "/role",
    layout: DefaultLayout,
    component: Role,
    exact: true
  },
  {
    path: "/role/create",
    layout: DefaultLayout,
    component: AddRole,
    exact: true,
  },
  {
    path: "/role/edit/:id",
    layout: DefaultLayout,
    component: EditRole,
    exact: true
  },
  {
    path: "/permission",
    layout: DefaultLayout,
    component: Permission,
    exact: true
  },
  {
    path: "/permission/create",
    layout: DefaultLayout,
    component: AddPermission,
  },
  {
    path: "/permission/edit/:id",
    layout: DefaultLayout,
    component: EditPermission,
  },
  {
    path: "/employee",
    layout: DefaultLayout,
    component: Employee,
    exact: true
  },
  {
    path: "/employee/create",
    layout: DefaultLayout,
    component: AddEmployee
  },
  {
    path: "/employee/edit/:id",
    layout: DefaultLayout,
    component: EditEmployee
  },
  {
    path: "/employee/view/:id",
    layout: DefaultLayout,
    component: ViewEmployee
  },
  {
    path: "/customer",
    layout: DefaultLayout,
    component: Customer,
    exact: true
  },
  {
    path: "/customer/create",
    layout: DefaultLayout,
    component: AddCustomer,
  },
  {
    path: "/customer/edit/:id",
    layout: DefaultLayout,
    component: EditCustomer,
  },
  {
    path: "/supplier",
    layout: DefaultLayout,
    component: Supplier,
    exact: true
  },
  {
    path: "/supplier/create",
    layout: DefaultLayout,
    component: AddSupplier,
    exact: true
  },
  {
    path: "/supplier/edit/:id",
    layout: DefaultLayout,
    component: EditSupplier,
    exact: true
  },
  {
    path: "/settings",
    layout: DefaultLayout,
    component: Settings
  },
  {
    path: "/category",
    layout: DefaultLayout,
    component: Category,
    exact: true
  },
  {
    path: "/category/create",
    layout: DefaultLayout,
    component: AddCategory,
    exact: true
  },
  {
    path: "/category/edit/:id",
    layout: DefaultLayout,
    component: EditCategory,
    exact: true
  },
  {
    path: "/expense",
    layout: DefaultLayout,
    component: Expense,
    exact: true
  },
  {
    path: "/expense/create",
    layout: DefaultLayout,
    component: AddExpense,
  },
  {
    path: "/expense/edit/:id",
    layout: DefaultLayout,
    component: EditExpense
  },
  {
    path: "/stores",
    layout: DefaultLayout,
    component: Stores,
    exact: true
  },
  {
    path: "/stores/create",
    layout: DefaultLayout,
    component: AddStores
  },
  {
    path: "/stores/edit/:id",
    layout: DefaultLayout,
    component: EditStores
  },
  {
    path: "/stockin",
    layout: DefaultLayout,
    component: AddStockIn
  },
  {
    path: "/discount",
    layout: DefaultLayout,
    component: Discount,
    exact: true
  },
  {
    path: "/discount/create",
    layout: DefaultLayout,
    component: AddDiscount    
  },
  {
    path: "/discount/edit/:id",
    layout: DefaultLayout,
    component: EditDiscount    
  },
  {
    path: "/product",
    layout: DefaultLayout,
    component: Product,
    exact: true
  },
  {
    path: "/product/create",
    layout: DefaultLayout,
    component: AddProduct,
  },
  {
    path: "/product/view/:id",
    layout: DefaultLayout,
    component: ViewProduct,
  },
  {
    path: "/product/edit/:id",
    layout: DefaultLayout,
    component: EditProduct,
  },
  {
    path: "/pos",
    layout: BlankLayout,
    component: Pos,
    exact: true
  },
  {
    path: "/pos/:id",
    layout: BlankLayout,
    component: Pos
  },
  {
    path: "/sales",
    layout: DefaultLayout,
    component: Sales,
    exact: true
  },
  {
    path: "/sales/view/:id",
    layout: DefaultLayout,
    component: ViewSales,
    exact: true
  }
];
