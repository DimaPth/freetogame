import React, { FC } from "react";
import style from "./GameCard.module.scss";
import cn from "classnames";
import { Card, Space } from "antd";
import { IGame, IGames } from "../../types/IGames";
import {
  AppstoreAddOutlined,
  ChromeFilled,
  WindowsFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

interface GameCardProps {
  game: IGames;
  meta?: "title" | "full";
  small?: boolean;
  addGame?: (e: any) => void;
}

const GameCard: FC<GameCardProps> = ({ game, meta, small, addGame }) => {
  if (!game) return null;
  if (meta) {
    return (
      <Link
        to={`/games/${game.id}`}
        className={cn(style.cardLink, { [style.small]: small })}
      >
        <Card
          className={style.card}
          bodyStyle={{ padding: "20px" }}
          hoverable
          cover={
            <div className={style.card__cover}>
              <img
                src={game?.thumbnail}
                alt={game?.title}
                width={356}
                className={cn({ [style.small]: small })}
              />
            </div>
          }
        >
          <div className={style.card__title}>
            <h3 className={style.card__title_heading}>{game?.title}</h3>
            <div
              className={cn(style.badge, {
                [style.small_badge]: meta === "full",
              })}
            >
              FREE
            </div>
          </div>
          {meta === "full" && (
            <div className={style.card__descr}>
              <div className={style.card__descr_text}>
                {game.short_description}
              </div>
              <div className={style.card__descr_else}>
                <div className={style.addBtn} onClick={addGame}>
                  <AppstoreAddOutlined />
                </div>
                <Space>
                  <div className={cn(style.badge, style.dark)}>
                    {game?.genre}
                  </div>
                  <div>
                    {game?.platform === "Browser" ? (
                      <ChromeFilled />
                    ) : (
                      <WindowsFilled />
                    )}
                  </div>
                </Space>
              </div>
            </div>
          )}
        </Card>
      </Link>
    );
  } else {
    return (
      <Link to={`/games/${game.id}`} className={style.cardLink}>
        <Card
          className={style.card}
          bodyStyle={{ display: "none" }}
          hoverable
          cover={
            <div className={style.card__cover}>
              <img src={game?.thumbnail} alt={game?.title} width={356} />
              <div className={cn(style.badge, style.bottom_right)}>FREE</div>
            </div>
          }
        />
      </Link>
    );
  }
};

export { GameCard };
