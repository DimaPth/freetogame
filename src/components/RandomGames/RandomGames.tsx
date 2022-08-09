import { Card, Row } from "antd";
import React, { FC } from "react";
import { useGetAllGamesQuery } from "../../redux/freeToGameApi";
import { IGames } from "../../types/IGames";
import style from "./RandomGames.module.scss";

interface RandomGamesProps {
  games: IGames[];
}

const RandomGames = ({ games }: RandomGamesProps) => {
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  return (
    <div>
      <Row align="middle" justify="space-between">
        <Card
          className={style.card}
          hoverable
          bodyStyle={{ display: "none" }}
          cover={
            <div className={style.card__cover}>
              <img src={games[getRandomInt(games?.length - 1)].thumbnail} />
              <div className={style.card__cover_badge}>FREE</div>
            </div>
          }
        />
        <Card
          className={style.card}
          hoverable
          bodyStyle={{ display: "none" }}
          cover={
            <div className={style.card__cover}>
              <img src={games[getRandomInt(games?.length - 1)].thumbnail} />
              <div className={style.card__cover_badge}>FREE</div>
            </div>
          }
        />
        <Card
          className={style.card}
          hoverable
          bodyStyle={{ display: "none" }}
          cover={
            <div className={style.card__cover}>
              <img src={games[getRandomInt(games?.length - 1)].thumbnail} />
              <div className={style.card__cover_badge}>FREE</div>
            </div>
          }
        />
      </Row>
    </div>
  );
};

export default RandomGames;
