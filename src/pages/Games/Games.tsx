import { Col, Row, Select, Typography } from "antd";
import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { GameCard } from "../../components/GameCard/GameCard";
import RandomGames from "../../components/RandomGames/RandomGames";
import { useAuth } from "../../hooks/useAuth";
import { useGetMultipleSortedGamesQuery } from "../../redux/freeToGameApi";
import { addGame } from "../../redux/slices/localStorageSlice";
import { IGames } from "../../types/IGames";
import style from "./Games.module.scss";

const { Option, OptGroup } = Select;

const Games: FC = () => {
  const { email } = useAuth();
  const params = useParams();
  const [platform, setPlatform] = useState<string>("all");
  const [category, setCategory] = useState<string>();
  const [sortBy, setSortBy] = useState<string>();

  const [limit, setLimit] = useState(12);

  const { data, isLoading, isError, isSuccess } =
    useGetMultipleSortedGamesQuery({ platform, category, "sort-by": sortBy });

  const dispatch = useDispatch();

  const current =
    (isSuccess && data?.length > 0 && data?.slice(0, limit)) || [];

  useEffect(() => {
    params.platform ? setPlatform(params.platform) : setPlatform("all");
    params.genre ? setCategory(params.genre) : setCategory(undefined);
  }, [params]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [limit, data]);

  const scrollHandler = () => {
    if (
      document.documentElement.scrollHeight -
        (document.documentElement.scrollTop + window.innerHeight) <
        100 &&
      limit < (isSuccess && data?.length)
    ) {
      setLimit((prev) => prev + 12);
    }
  };

  const handleClickAdd = (e: React.MouseEvent, game: IGames) => {
    e.preventDefault();
    dispatch(addGame({ email, game }));
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
              value={platform}
              dropdownStyle={{ minWidth: "200px" }}
              className={style.select_item}
              bordered={false}
              onChange={(value) => {
                setPlatform(value);
                setLimit(12);
              }}
            >
              <OptGroup label="Browse by platform:">
                <Option value="pc">
                  <Link to={`/games/pc/${category}`}>Windows (PC)</Link>
                </Option>
                <Option value="browser">
                  <Link to={`/games/browser/${category}`}>Browser (Web)</Link>
                </Option>
                <Option value="all">
                  <Link to={`/games/all/${category}`}>All Platforms</Link>
                </Option>
              </OptGroup>
            </Select>
          </Col>
          <Col span={6}>
            <span className={style.dark_text}>Genre/Tag: </span>
            <Select
              defaultValue="All Genres"
              value={category || "All Genres"}
              dropdownStyle={{ minWidth: "200px" }}
              className={style.select_item}
              bordered={false}
              onChange={(value) => {
                setCategory(value);
                setLimit(12);
              }}
            >
              <OptGroup label="Browse by genre:">
                <Option value="mmorpg">
                  <Link to={`/games/${platform}/mmorpg`}>MMORPG</Link>
                </Option>
                <Option value="shooter">
                  <Link to={`/games/${platform}/shooter`}>Shooter</Link>
                </Option>
                <Option value="strategy">
                  <Link to={`/games/${platform}/strategy`}>Strategy</Link>
                </Option>
                <Option value="moba">
                  <Link to={`/games/${platform}/moba`}>Moba</Link>
                </Option>
                <Option value="card">
                  <Link to={`/games/${platform}/card`}>Card Games</Link>
                </Option>
                <Option value="racing">
                  <Link to={`/games/${platform}/racing`}>Racing</Link>
                </Option>
                <Option value="sports">
                  <Link to={`/games/${platform}/sports`}>Sports</Link>
                </Option>
                <Option value="social">
                  <Link to={`/games/${platform}/social`}>Social</Link>
                </Option>
                <Option value="fighting">
                  <Link to={`/games/${platform}/fighting`}>Fighting</Link>
                </Option>
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
                setLimit(12);
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
          <Row justify="space-between">
            {isSuccess &&
              current?.map((game) => (
                <GameCard
                  game={game}
                  key={game.id}
                  small
                  meta="full"
                  addGame={(e) => handleClickAdd(e, game)}
                />
              ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Games;
