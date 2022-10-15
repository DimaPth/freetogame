import { Col, Row, Space, Typography } from "antd";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import style from "./Home.module.scss";
import RandomGames from "../../components/RandomGames/RandomGames";
import { useGetSortedGamesQuery } from "../../redux/freeToGameApi";
import { RightOutlined, RobotFilled } from "@ant-design/icons";
import { GameCard } from "../../components/GameCard/GameCard";
import HorizontalCard from "../../components/HorizontalCard/HorizontalCard";
import { useAuth } from "../../hooks/useAuth";
import CustomBtn from "../../components/CustomBtn/CustomBtn";

const Home: FC = () => {
  const { isAuth } = useAuth();
  const { data, isLoading, isError, isSuccess } =
    useGetSortedGamesQuery("release-date");
  const newGames = data && data.slice(0, 7);
  const mostPlayed = data && data.slice(8, 12);

  if (isError)
    return (
      <div className="container">
        <h1>Something gone wrong</h1>
      </div>
    );

  if (isLoading)
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div>
      {!isAuth && (
        <section className={style.jumbotron}>
          <div className={style.jumbotron__content}>
            <Typography.Title level={2} className={style.title}>
              Find &amp; track the best <span>free-to-play</span> games!
            </Typography.Title>
            <Typography.Paragraph className={style.subTitle}>
              Track what you've played and search for what to play next! Plus
              get free premium loot!
            </Typography.Paragraph>
            <Row justify="center">
              <Space className={style.btns}>
                <Link to="/register">
                  <CustomBtn type="link">
                    <b>GET STARTED</b> <span>it's free</span>
                  </CustomBtn>
                </Link>
                <Link to="/games/all">
                  <CustomBtn type="ghost">Browse Games</CustomBtn>
                </Link>
              </Space>
            </Row>
          </div>
        </section>
      )}

      <div className="container">
        {isSuccess && (
          <div className={style.content}>
            <Typography.Title level={4}>
              <RobotFilled />
              &nbsp;Personalized Recommendations
            </Typography.Title>
            <RandomGames games={data} meta="title" />
            <div className={style.content__main}>
              <Row>
                <Col sm={{ span: 16 }} xs={{ span: 24 }}>
                  <Typography.Title level={3} className={style.title}>
                    Recently Added
                  </Typography.Title>
                  {newGames?.map((item) => (
                    <HorizontalCard game={item} key={item.id} />
                  ))}
                  <div className={style.btn}>
                    <Link to="/games/all" onClick={() => window.scrollTo(0, 0)}>
                      <CustomBtn type="ghost">
                        More Games <RightOutlined />
                      </CustomBtn>
                    </Link>
                  </div>
                </Col>
                <Col
                  sm={{ span: 8 }}
                  xs={{ span: 24 }}
                  className={style.mostPlayed}
                >
                  <Typography.Title level={3} className={style.title}>
                    Most Played Today
                  </Typography.Title>
                  <div className={style.mostPlayed__list}>
                    {mostPlayed?.map((item) => (
                      <GameCard key={item.id} game={item} />
                    ))}
                  </div>
                </Col>
              </Row>
            </div>
            {!isAuth && (
              <div className={style.about}>
                <Row align="middle">
                  <Col
                    sm={{ span: 10 }}
                    xs={{ span: 24 }}
                    className={style.about__logo}
                  >
                    <img
                      src="https://www.freetogame.com/assets/images/ftg-img.jpg"
                      alt="logo"
                    />
                  </Col>
                  <Col
                    sm={{ span: 14 }}
                    xs={{ span: 24 }}
                    className={style.about__descr}
                  >
                    <Typography.Title level={4}>
                      More Fun and More Rewarding!
                    </Typography.Title>
                    <Typography.Text className={style.about__descr_text}>
                      We are FreeToGame, a new gaming platform that brings all
                      the best Free-to-Play Multiplayer Games and MMO Games into
                      one place while rewarding gamers with free premium loot
                      and exlusive perks. Plus maintain your own games library,
                      track what you've played and search for what to play next!
                    </Typography.Text>
                    <div className={style.about__btns}>
                      <Space>
                        <Link to="/register">
                          <CustomBtn type="link">
                            <b>JOIN NOW</b>
                          </CustomBtn>
                        </Link>
                        <a href="https://www.freetogame.com/about">
                          <CustomBtn type="ghost">Learn More</CustomBtn>
                        </a>
                      </Space>
                    </div>
                  </Col>
                </Row>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
