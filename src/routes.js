import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, BlankLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import ResumeMaterial from "./views/ResumeMaterial";
import Login from "./views/Login";
import ForgotPassword from "./views/ForgotPassword";
import Register from "./views/Register";
import Delivery from "./views/Delivery";
import StockIn from "./views/StockIn";
import AddStockIn from "./views/AddStockIn";
import StockOut from "./views/StockOut";
import AddStockOut from "./views/AddStockOut";
import User from "./views/User";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/dashboard" />
  },
  {
    path: '/resume-material',
    layout: DefaultLayout,
    component: ResumeMaterial
  },
  {
    path: "/dashboard",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
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
    path: "/delivery",
    layout: DefaultLayout,
    component: Delivery
  },
  {
    path: "/stockin",
    exact: true,
    layout: DefaultLayout,
    component: StockIn
  },
  {
    path: "/stockin/create",
    exact: true,
    layout: DefaultLayout,
    component: AddStockIn
  },
  {
    path: "/stockout",
    exact: true,
    layout: DefaultLayout,
    component: StockOut
  },
  {
    path: "/stockout/create",
    layout: DefaultLayout,
    component: AddStockOut
  },
  {
    path: "/user",
    layout: DefaultLayout,
    component: User
  }
];
