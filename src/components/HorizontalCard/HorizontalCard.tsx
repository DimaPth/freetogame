import {
  ChromeFilled,
  DeleteFilled,
  EnvironmentFilled,
  PlaySquareOutlined,
  WindowsFilled,
} from "@ant-design/icons";
import { Card, Space, Typography } from "antd";
import classNames from "classnames";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { IGames } from "../../types/IGames";
import CustomBtn from "../CustomBtn/CustomBtn";
import style from "./HorizontalCard.module.scss";

interface HorizontalCardProps {
  game: IGames;
  type?: "default" | "top" | "library";
  number?: number;
  removeGame?: (e: React.MouseEvent) => void;
}

const { Title } = Typography;

const HorizontalCard: FC<HorizontalCardProps> = ({
  game,
  type = "default",
  number,
  removeGame,
}) => {
  if (type === "library")
    return (
      <Card
        key={game.id}
        className={style.card}
        hoverable
        bodyStyle={{
          padding: "0.5rem",
        }}
      >
        <div className={classNames(style.card__body, style.card__body_library)}>
          <Link to={`/game/${game.id}`}>
            <div className={style.img_wrap}>
              <img src={game.thumbnail} alt={game.title} width={"160px"} />
            </div>
          </Link>
          <div className={classNames(style.description, style.flex)}>
            <Link to={`/game/${game.id}`}>
              <Card.Meta title={game.title} />
            </Link>
            <div className={style.btns}>
              <a href={game?.game_url} target="_blank" rel="noreferrer">
                <CustomBtn type="link">
                  <strong className={style.playBtn}>
                    PLAY NOW <PlaySquareOutlined />
                  </strong>
                </CustomBtn>
              </a>
              <div className={style.deleteBtn} onClick={removeGame}>
                <DeleteFilled />
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  return (
    <Link to={`/game/${game.id}`}>
      <Card
        key={game.id}
        className={style.card}
        hoverable
        bodyStyle={{ padding: "0.5rem" }}
      >
        <div
          className={classNames(style.card__body, {
            [style.card__body_top]: type === "top",
          })}
        >
          <div
            className={classNames(style.img__wrap, {
              [style.top__img]: type === "top",
            })}
          >
            {type === "top" && (
              <Title level={2} className={style.number}>
                {number}
              </Title>
            )}
            <img src={game.thumbnail} alt={game.title} />
          </div>
          <div className={style.description}>
            <Card.Meta title={game.title} />
            <>
              <div className={style.meta}>{game.short_description}</div>
              <div>
                {type === "top" ? (
                  <span className={style.description__top}>
                    <EnvironmentFilled /> {game.title} is currenty one of the
                    most-played Free To Play games in {new Date().getFullYear()}
                  </span>
                ) : (
                  <span className={classNames(style.badge, style.dark)}>
                    {game.genre}
                  </span>
                )}
              </div>
            </>
          </div>
          {type === "default" && (
            <div className={style.icons}>
              {game.platform === "Web Browser" ? (
                <ChromeFilled />
              ) : (
                <WindowsFilled />
              )}
              <span className={style.badge}>FREE</span>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default HorizontalCard;
