import React from "react";
import Browser from "./pages/Browser";
import Games from "./pages/Games";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Top from "./pages/Top";

interface IRoutes {
  path: string,
  element: React.ComponentType,
}

export enum RouteNames {
  Home = '/',
  Games = '/games',
  Browser = '/browser',
  Top = '/top',
  Search = '/search',
  Login = '/login',
  Register = '/register',
  Library = '/library',
}

export const publicRoutes: IRoutes[] = [
  {path: RouteNames.Home, element: Home},
  {path: RouteNames.Games, element: Games},
  {path: RouteNames.Browser, element: Browser},
  {path: RouteNames.Top, element: Top},
  {path: RouteNames.Search, element: Search},
  {path: RouteNames.Login, element: Login},
  {path: RouteNames.Register, element: Register},
]

export const privateRoutes: IRoutes[] = [
  {path: RouteNames.Home, element: Home},
  {path: RouteNames.Games, element: Games},
  {path: RouteNames.Browser, element: Browser},
  {path: RouteNames.Top, element: Top},
  {path: RouteNames.Search, element: Search},
  {path: RouteNames.Login, element: Login},
  {path: RouteNames.Register, element: Register},
  {path: RouteNames.Library, element: Library},
]