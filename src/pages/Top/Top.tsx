import { Card, Typography } from "antd";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import style from "./Top.module.scss";
import HorizontalCard from "../../components/HorizontalCard/HorizontalCard";
import { useGetMultipleSortedGamesQuery } from "../../redux/freeToGameApi";
import { RightOutlined } from "@ant-design/icons";
import RandomGames from "../../components/RandomGames/RandomGames";

const Top: FC = () => {
  const { data, isLoading, isError, isSuccess } =
    useGetMultipleSortedGamesQuery({
      "sort-by": "relevance",
    });
  console.log(data);
  return (
    <div className="container">
      <Typography.Title level={2}>
        Top 10 Free To Play Games for PC and Browser in{" "}
        {new Date().getFullYear()}
      </Typography.Title>
      <div>
        {isSuccess &&
          data
            ?.slice(0, 10)
            .map((game, index) => (
              <HorizontalCard game={game} type="top" number={index + 1} />
            ))}
      </div>
      <div className={style.moreGames}>
        <div className={style.title}>
          <Typography.Title level={3}>
            More Free To Play Games for PC and Browser
          </Typography.Title>
          <Link to="/games">
            <div className={style.btn}>
              Explore <RightOutlined />
            </div>
          </Link>
        </div>
        {isSuccess && <RandomGames games={data} />}
      </div>
    </div>
  );
};

export default Top;
