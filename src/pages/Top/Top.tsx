import { Card, Col, Divider, Row, Select, Typography } from "antd";
import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import style from "./Top.module.scss";
import HorizontalCard from "../../components/HorizontalCard/HorizontalCard";
import { useGetMultipleSortedGamesQuery } from "../../redux/freeToGameApi";
import { RightOutlined } from "@ant-design/icons";
import RandomGames from "../../components/RandomGames/RandomGames";

const { Option, OptGroup } = Select;

const Top: FC = () => {
  const [platform, setPlatform] = useState<string>("all");
  const [category, setCategory] = useState<string>();
  const [sortBy, setSortBy] = useState<string>();

  const { data, isLoading, isError, isSuccess } =
    useGetMultipleSortedGamesQuery({
      platform,
      category: category?.toLowerCase(),
      "sort-by": sortBy,
    });

  return (
    <div className="container">
      <Typography.Title level={2}>
        Top 10 <u>{category ? category : "Free To Play"}</u> Games for{" "}
        <u>
          {platform === "all"
            ? "PC and Browser"
            : platform === "pc"
            ? "PC"
            : "Browser"}
        </u>{" "}
        in {new Date().getFullYear()}
      </Typography.Title>
      <div>
        <Row className={style.select}>
          <Col span={12}>
            <span className={style.dark_text}>More Top 10's: </span>
            <Select
              defaultValue="Select Category"
              dropdownStyle={{ minWidth: "200px" }}
              bordered={false}
              onChange={(value) => {
                setCategory(value);
              }}
            >
              <OptGroup label="Browse by genre:">
                <Option value="MMO">MMO</Option>
                <Option value="MMORPG">MMORPG</Option>
                <Option value="Shooter">Shooter</Option>
                <Option value="Strategy">Strategy</Option>
                <Option value="MOBA">Moba</Option>
                <Option value="Card">Card Games</Option>
                <Option value="Racing">Racing</Option>
                <Option value="Sports">Sports</Option>
                <Option value="Social">Social</Option>
                <Option value="Fighting">Fighting</Option>
              </OptGroup>
            </Select>
          </Col>
          <Col span={12}>
            <span className={style.dark_text}>Platform: </span>
            <Select
              defaultValue="All Platforms"
              dropdownStyle={{ minWidth: "200px" }}
              bordered={false}
              onChange={(value) => {
                setPlatform(value);
              }}
            >
              <OptGroup label="Browse by platform:">
                <Option value="pc">Windows (PC)</Option>
                <Option value="browser">Browser (Web)</Option>
                <Option value="all">All Platforms</Option>
              </OptGroup>
            </Select>
          </Col>
          <Col></Col>
        </Row>
      </div>
      <Divider className={style.divider} />
      <Typography.Text className={style.dark_text}>
        Below, you can find our ongoing Top 10 Free To Play Games in August
        2022. Our ranking is based on our users preferences during this calendar
        month and all results are updated daily. You can also use the menu to
        explore even more Top 10's for your favorite platforms.
      </Typography.Text>
      <div className={style.topGames}>
        {isSuccess &&
          data.length > 0 &&
          data
            ?.slice(0, 10)
            .map((game, index) => (
              <HorizontalCard
                game={game}
                type="top"
                number={index + 1}
                key={game.id}
              />
            ))}
      </div>
      <div className={style.moreGames}>
        <div className={style.header}>
          <Typography.Title level={3}>
            More {category ? category : "Free To Play"} Games for{" "}
            {platform === "all"
              ? "PC and Browser"
              : platform === "pc"
              ? "PC"
              : "Browser"}
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
