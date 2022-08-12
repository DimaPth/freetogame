import React, { FC } from "react";
import style from "./GameCard.module.scss";
import cn from "classnames";
import { Card, Space, Typography } from "antd";
import { IGames } from "../../types/IGames";
import {
  AppstoreAddOutlined,
  ChromeFilled,
  WindowsFilled,
} from "@ant-design/icons";

interface GameCardProps {
  game: IGames;
  meta?: "title" | "full";
  small?: boolean;
}

const GameCard: FC<GameCardProps> = ({ game, meta, small }) => {
  if (meta) {
    return (
      <Card
        className={cn(style.card, { [style.small]: small })}
        bodyStyle={{ padding: "20px" }}
        hoverable
        cover={
          <div className={style.card__cover}>
            <img
              src={game.thumbnail}
              width="356px"
              className={cn({ [style.small]: small })}
            />
          </div>
        }
      >
        <div className={style.card__title}>
          <h3 className={style.card__title_heading}>{game.title}</h3>
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
              <div className={style.addBtn}>
                <AppstoreAddOutlined />
              </div>
              <Space>
                <div className={cn(style.badge, style.dark)}>{game.genre}</div>
                <div>
                  {game.platform === "Browser" ? (
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
    );
  } else {
    return (
      <Card
        className={style.card}
        bodyStyle={{ display: "none" }}
        hoverable
        cover={
          <div className={style.card__cover}>
            <img src={game.thumbnail} />
            <div className={cn(style.badge, style.bottom_right)}>FREE</div>
          </div>
        }
      />
    );
  }
};

export { GameCard };
