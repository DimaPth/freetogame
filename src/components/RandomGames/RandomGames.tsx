import { Row } from "antd";
import React, { FC } from "react";
import { IGames } from "../../types/IGames";
import { GameCard } from "../GameCard/GameCard";
import style from "./RandomGames.module.scss";

interface RandomGamesProps {
  games: IGames[];
  meta?: "title" | "full";
}

const RandomGames: FC<RandomGamesProps> = ({ games, meta }) => {
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  return (
    <div>
      <Row align="middle" justify="space-between">
        <div>
          <GameCard meta={meta} game={games[getRandomInt(games?.length - 1)]} />
        </div>
        <div className={style.card}>
          <GameCard meta={meta} game={games[getRandomInt(games?.length - 1)]} />
        </div>
        <div>
          <GameCard meta={meta} game={games[getRandomInt(games?.length - 1)]} />
        </div>
      </Row>
    </div>
  );
};

export default RandomGames;
