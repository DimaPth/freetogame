import { Col, Row, Select, Typography } from "antd";
import React, { FC, useEffect, useState } from "react";
import { GameCard } from "../../components/GameCard/GameCard";
import RandomGames from "../../components/RandomGames/RandomGames";
import { useGetMultipleSortedGamesQuery } from "../../redux/freeToGameApi";
import style from "./Games.module.scss";

const { Option, OptGroup } = Select;

const Games: FC = () => {
  const [platform, setPlatform] = useState<string>("all");
  const [category, setCategory] = useState<string>();
  const [sortBy, setSortBy] = useState<string>();

  const [limit, setLimit] = useState(10);

  const { data, isLoading, isError, isSuccess } =
    useGetMultipleSortedGamesQuery({ platform, category, "sort-by": sortBy });

  const current = data?.slice(0, limit);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  // fix it later
  const scrollHandler = (e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setLimit((prev) => prev + 10);
    }
  };

  return (
    <div className="container">
      <div className={style.header}>
        <Typography.Title level={2} className={style.title}>
          Best Free Games for{" "}
          {platform === "all"
            ? "PC and Browser"
            : platform === "pc"
            ? "PC"
            : "Browser"}{" "}
          in {new Date().getFullYear()}!
        </Typography.Title>
        <Typography.Text className={style.dark_text}>
          <b>{data?.length ? data.length : "0"}</b> free-to-play{" "}
          <b>{platform === "browser" && "web brouser"} games</b> found in our
          games list!
        </Typography.Text>
      </div>
      <div className={style.random}>
        {isSuccess && <RandomGames games={data} />}
      </div>
      <div>
        <Row className={style.select}>
          <Col span={6}>
            <span className={style.dark_text}>Platform: </span>
            <Select
              defaultValue="All Platforms"
              dropdownStyle={{ minWidth: "200px" }}
              className={style.select_item}
              bordered={false}
              onChange={(value) => {
                setPlatform(value);
                setLimit(10);
              }}
            >
              <OptGroup label="Browse by platform:">
                <Option value="pc">Windows (PC)</Option>
                <Option value="browser">Browser (Web)</Option>
                <Option value="all">All Platforms</Option>
              </OptGroup>
            </Select>
          </Col>
          <Col span={6}>
            <span className={style.dark_text}>Genre/Tag: </span>
            <Select
              defaultValue="All Genres"
              dropdownStyle={{ minWidth: "200px" }}
              className={style.select_item}
              bordered={false}
              onChange={(value) => {
                setCategory(value);
                setLimit(10);
              }}
            >
              <OptGroup label="Browse by genre:">
                <Option value="mmo">MMO</Option>
                <Option value="mmorpg">MMORPG</Option>
                <Option value="shooter">Shooter</Option>
                <Option value="strategy">Strategy</Option>
                <Option value="moba">Moba</Option>
                <Option value="card">Card Games</Option>
                <Option value="racing">Racing</Option>
                <Option value="sports">Sports</Option>
                <Option value="social">Social</Option>
                <Option value="fighting">Fighting</Option>
              </OptGroup>
            </Select>
          </Col>
          <Col span={6}>
            <span className={style.dark_text}>Sort By: </span>
            <Select
              defaultValue="Relevance"
              dropdownStyle={{ minWidth: "200px" }}
              className={style.select_item}
              bordered={false}
              onChange={(value) => {
                setSortBy(value);
                setLimit(10);
              }}
            >
              <OptGroup label="Sort by:">
                <Option value="relevance">Relevance</Option>
                <Option value="popularity">Popularity</Option>
                <Option value="release-date">Release Date</Option>
                <Option value="alphabetical">Alphabetical </Option>
              </OptGroup>
            </Select>
          </Col>
        </Row>
        <div className={style.games__list}>
          <Row>
            {current?.map((game) => (
              <Col span={6} className={style.card} key={game.id}>
                <GameCard game={game} small meta="full" />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Games;
