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
import Customer from "./views/Customer";
import Supplier from "./views/Supplier";
import Settings from "./views/Settings";
import Category from "./views/Category";
import Expense from "./views/Expense";
import Stores from "./views/Stores";
import AddRole from "./views/AddRole";
import AddPermission from "./views/AddPermission";
import EditPermission from "./views/EditPermission";

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
    component: AddRole
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
    component: Employee
  },
  {
    path: "/customer",
    layout: DefaultLayout,
    component: Customer
  },
  {
    path: "/supplier",
    layout: DefaultLayout,
    component: Supplier
  },
  {
    path: "/settings",
    layout: DefaultLayout,
    component: Settings
  },
  {
    path: "/category",
    layout: DefaultLayout,
    component: Category
  },
  {
    path: "/expense",
    layout: DefaultLayout,
    component: Expense
  },
  {
    path: "/stores",
    layout: DefaultLayout,
    component: Stores
  }
  
];
