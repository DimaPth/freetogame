import {
  ChromeFilled,
  EnvironmentFilled,
  WindowsFilled,
} from "@ant-design/icons";
import { Card, Space, Typography } from "antd";
import classNames from "classnames";
import React, { FC } from "react";
import { IGames } from "../../types/IGames";
import style from "./HorizontalCard.module.scss";

interface HorizontalCardProps {
  game: IGames;
  type?: "default" | "top";
  number?: number;
}

const { Title } = Typography;

const HorizontalCard: FC<HorizontalCardProps> = ({
  game,
  type = "default",
  number,
}) => {
  return (
    <Card
      key={game.id}
      className={style.card}
      hoverable
      bodyStyle={{
        display: "flex",
        alignItems: "center",
        padding: "12px 24px",
      }}
    >
      {type === "top" && (
        <Title level={2} className={style.number}>
          {number}
        </Title>
      )}
      <div className={style.img_wrap}>
        <img
          src={game.thumbnail}
          alt={game.title}
          width={type === "top" ? "260px" : "160px"}
        />
      </div>
      <div className={style.description}>
        <Card.Meta title={game.title} />
        <div className={style.meta}>{game.short_description}</div>
        <div>
          {type === "top" ? (
            <span>
              <EnvironmentFilled /> {game.title} is currenty one of the
              most-played Free To Play games in {new Date().getFullYear()}
            </span>
          ) : (
            <span className={classNames(style.badge, style.dark)}>
              {game.genre}
            </span>
          )}
        </div>
      </div>
      {type === "default" && (
        <div>
          <Space size="large">
            {game.platform === "Web Browser" ? (
              <ChromeFilled />
            ) : (
              <WindowsFilled />
            )}
            <span className={style.badge}>FREE</span>
          </Space>
        </div>
      )}
    </Card>
  );
};

export default HorizontalCard;
