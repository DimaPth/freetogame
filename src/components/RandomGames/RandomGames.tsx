import { Col, Row } from "antd";
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
      {games?.length <= 3 ? (
        <Row align="middle" justify="space-between" className={style.games}>
          {games.map((game) => (
            <GameCard key={game.id} meta={meta} game={game} />
          ))}
        </Row>
      ) : (
        <Row align="middle" justify="space-between" className={style.games}>
          <GameCard meta={meta} game={games[getRandomInt(games?.length - 1)]} />
          <GameCard meta={meta} game={games[getRandomInt(games?.length - 1)]} />
          <GameCard meta={meta} game={games[getRandomInt(games?.length - 1)]} />
        </Row>
      )}
    </div>
  );
};

export default RandomGames;
