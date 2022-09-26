import { SearchOutlined } from "@ant-design/icons";
import { Divider, Input, Row, Typography } from "antd";
import React, { FC, useState, useEffect } from "react";
import { GameCard } from "../../components/GameCard/GameCard";
import RandomGames from "../../components/RandomGames/RandomGames";
import { useDebounce } from "../../hooks/useDebounce";
import { useGetAllGamesQuery } from "../../redux/freeToGameApi";
import { IGames } from "../../types/IGames";
import style from "./Search.module.scss";

const Search: FC = () => {
  const { data, isSuccess } = useGetAllGamesQuery();
  const [searchValue, setSearchValue] = useState("");
  const [limit, setLimit] = useState(12);
  const [filtered, setFiltered] = useState<IGames[]>([]);
  const debouncedSearchValue: string = useDebounce<string>(searchValue, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    setFiltered(
      data?.filter((game) => {
        return game.title
          .toLowerCase()
          .includes(debouncedSearchValue.toLowerCase());
      }) || []
    );
  }, [debouncedSearchValue, data]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [limit, filtered]);

  const scrollHandler = () => {
    if (
      document.documentElement.scrollHeight -
        (document.documentElement.scrollTop + window.innerHeight) <
        150 &&
      limit < filtered.length
    ) {
      setLimit((prev) => prev + 12);
    }
  };

  const current = (debouncedSearchValue && filtered?.slice(0, limit)) || [];

  return (
    <div className="container">
      <Typography.Title level={2}>
        <SearchOutlined /> Find Games
      </Typography.Title>
      <Divider className={style.divider} />
      <Input
        placeholder="Search for games"
        className={style.input}
        value={searchValue}
        onChange={handleChange}
      />
      <Row justify="space-between" className={style.games}>
        {current?.map((game) => (
          <GameCard game={game} key={game.id} small meta="full" />
        ))}
      </Row>
      <div className={style.recommendation}>
        <Typography.Title level={5}>You May Like</Typography.Title>
        {isSuccess && (
          <RandomGames games={[data[7], data[12], data[24]]} meta="title" />
        )}
      </div>
    </div>
  );
};

export default Search;
