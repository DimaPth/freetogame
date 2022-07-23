import React from "react";
import "./App.css";
import {
  useGetAllGamesQuery,
  useGetFilteredGamesQuery,
  useGetGameByIDQuery,
  useGetGamesByGenreQuery,
  useGetGamesByPlatformQuery,
  useGetMultipleSortedGamesQuery,
  useGetSortedGamesQuery,
} from "./redux/freeToGameApi";

function App() {
  const { data, isLoading, error } = useGetGameByIDQuery("521");
  isLoading && <h1>loading...</h1>;
  error && <h1>something gone wrong</h1>;
  console.log(data);
  return <div>works</div>;
}

export default App;
