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
      <Row align="middle">
        {games?.length <= 3 ? (
          <>
            {games.map((game) => (
              <div className={style.card}>
                <GameCard meta={meta} game={game} />
              </div>
            ))}
          </>
        ) : (
          <>
            <Col span={8} className={style.card}>
              <GameCard
                meta={meta}
                game={games[getRandomInt(games?.length - 1)]}
              />
            </Col>
            <Col span={8} className={style.card}>
              <GameCard
                meta={meta}
                game={games[getRandomInt(games?.length - 1)]}
              />
            </Col>
            <Col span={8} className={style.card}>
              <GameCard
                meta={meta}
                game={games[getRandomInt(games?.length - 1)]}
              />
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default RandomGames;
