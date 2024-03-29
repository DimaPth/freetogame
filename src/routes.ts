import React from "react";
import Game from "./pages/Game/Game";
import Games from "./pages/Games/Games";
import Home from "./pages/Home/Home";
import Library from "./pages/Library/Library";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search/Search";
import Top from "./pages/Top/Top";

interface IRoutes {
  path: string,
  element: React.ComponentType,
}

export enum RouteNames {
  Home = '/',
  Games = '/games/:platform',
  GamesWithGenre = '/games/:platform/:genre',
  GameByID = '/game/:id',
  Top = '/top',
  Search = '/search',
  Login = '/login',
  Register = '/register',
  Library = '/library',
}

export const publicRoutes: IRoutes[] = [
  {path: RouteNames.Home, element: Home},
  {path: RouteNames.Games, element: Games},
  {path: RouteNames.GamesWithGenre, element: Games},
  {path: RouteNames.GameByID, element: Game},
  {path: RouteNames.Top, element: Top},
  {path: RouteNames.Search, element: Search},
  {path: RouteNames.Login, element: Login},
  {path: RouteNames.Register, element: Register},
]

export const privateRoutes: IRoutes[] = [
  {path: RouteNames.Home, element: Home},
  {path: RouteNames.Games, element: Games},
  {path: RouteNames.GamesWithGenre, element: Games},
  {path: RouteNames.GameByID, element: Game},
  {path: RouteNames.Top, element: Top},
  {path: RouteNames.Search, element: Search},
  {path: RouteNames.Library, element: Library},
]