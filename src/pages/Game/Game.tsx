import React, { FC, useEffect, useState } from "react";
import style from "./Game.module.scss";
import { useGetGameByIDQuery } from "../../redux/freeToGameApi";
import { Breadcrumb, Col, Divider, Row, Typography, Image } from "antd";
import { Link, useParams } from "react-router-dom";
import cn from "classnames";
import {
  InfoCircleFilled,
  PlaySquareOutlined,
  QqOutlined,
} from "@ant-design/icons";
import CustomBtn from "../../components/CustomBtn/CustomBtn";
import { useAuth } from "../../hooks/useAuth";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addGame, removeGame } from "../../redux/slices/localStorageSlice";

const Game: FC = () => {
  const { isAuth, email } = useAuth();
  const { users } = useAppSelector((state) => state.local);
  const { id } = useParams<{ id?: string }>();
  const [gameId, setGameId] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    email &&
      id &&
      setIsSelected(users[email]?.some((lgame) => lgame.id === +id));
  }, [email]);

  useEffect(() => {
    id && setGameId(id);
  }, [id]);

  const { data, isLoading, isSuccess } = useGetGameByIDQuery(gameId);

  const handleClickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAuth && email && data) {
      dispatch(addGame({ email, game: data }));
      setIsSelected((game) => !game);
    } else {
      alert("You must be signed in to perform this action");
    }
  };

  const handleClickRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    email && data && dispatch(removeGame({ email, game: data }));
    setIsSelected((game) => !game);
  };

  const info = [
    "title",
    "developer",
    "publisher",
    "release_date",
    "genre",
    "platform",
  ];

  const sysReq =
    data?.platform === "Windows"
      ? Object.keys(data?.minimum_system_requirements)
      : null;

  window.scrollTo(0, 0);

  if (isLoading)
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div className={style.main}>
      {isSuccess && (
        <div
          style={{
            backgroundImage: `url(https://www.freetogame.com/g/${data.id}/background.jpg)`,
          }}
          className={style.background}
        >
          <div className={style.gradient} />
        </div>
      )}
      <div className="container">
        {isSuccess && (
          <>
            <Row>
              <Col md={{ span: 8 }} xs={{ span: 24 }} className={style.sidebar}>
                <div className={style.sticky}>
                  <img
                    src={data?.thumbnail}
                    alt={data?.title}
                    className={style.image}
                  />
                  <div
                    className={style.buttons}
                    style={{ display: "flex", gap: "8px" }}
                  >
                    <CustomBtn>FREE</CustomBtn>
                    <a
                      href={data?.game_url}
                      target="_blank"
                      rel="noreferrer"
                      className={style.linkBtn}
                    >
                      <CustomBtn type="link">
                        <strong>
                          PLAY NOW <PlaySquareOutlined />
                        </strong>
                      </CustomBtn>
                    </a>
                  </div>
                  {isSelected ? (
                    <CustomBtn onClick={(e) => handleClickRemove(e)}>
                      Remove
                    </CustomBtn>
                  ) : (
                    <CustomBtn onClick={(e) => handleClickAdd(e)}>
                      Add
                    </CustomBtn>
                  )}
                  <span className={style.require}>
                    <QqOutlined /> Requires 3rd-Party Account
                  </span>
                </div>
              </Col>
              <Col
                md={{ span: 16 }}
                xs={{ span: 24 }}
                className={style.content}
              >
                <Breadcrumb className={style.breadcrumb} separator={">"}>
                  <Breadcrumb.Item className={style.breadcrumbItem}>
                    <Link to="/">Home</Link>{" "}
                  </Breadcrumb.Item>
                  <Breadcrumb.Item className={style.breadcrumbItem}>
                    <Link to="/games">Free Games</Link>{" "}
                  </Breadcrumb.Item>
                  <Breadcrumb.Item
                    className={cn(style.breadcrumbItem, style.dark)}
                  >
                    {data.title}
                  </Breadcrumb.Item>
                </Breadcrumb>
                <Typography.Title level={2}>{data.title}</Typography.Title>
                <Typography.Text>{data.description}</Typography.Text>
                <Divider />
                <Typography.Text
                  italic
                  className={cn(style.disclosure, style.dark)}
                >
                  Disclosure: FreeToGame works closely with publishers and
                  developers to offer a free and rewarding experience. In order
                  to keep everything free to use we may sometimes earn a small
                  commission from some partners. Find more info in our{" "}
                  <Link to="https://www.freetogame.com/faq">FAQ</Link> page.
                </Typography.Text>
                <div className={style.info}>
                  <Typography.Title level={4} className={style.info__title}>
                    Additional Information
                  </Typography.Title>
                  <Typography.Text>
                    <InfoCircleFilled /> Please note this free-to-play game may
                    or may not offer optional in-game purchases.
                  </Typography.Text>
                  <Divider className={style.info__divider} />
                  <Row>
                    {info.map((item) => (
                      <Col span={8} className={style.info__item} key={item}>
                        <>
                          <div className={style.dark}>
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                          </div>
                          {data[item as keyof typeof data]}
                        </>
                      </Col>
                    ))}
                  </Row>
                  <Typography.Title level={4} className={style.info__title}>
                    {data.title} Screenshots
                  </Typography.Title>
                  <Divider className={style.info__divider} />
                  <Row gutter={16}>
                    <Image.PreviewGroup>
                      {data.screenshots.map((image) => (
                        <Col
                          lg={{ span: 8 }}
                          key={image.id}
                          className={style.info__screenshot}
                        >
                          <Image src={image.image} />
                        </Col>
                      ))}
                    </Image.PreviewGroup>
                  </Row>
                  <Typography.Title level={4} className={style.info__title}>
                    Minimum System Requirements{" "}
                    <Typography.Text className={cn(style.dark)}>
                      ({data.platform})
                    </Typography.Text>
                  </Typography.Title>
                  <Divider className={style.info__divider} />
                  <Row>
                    {data.platform === "Windows" ? (
                      sysReq?.map((item) => (
                        <Col span={12} className={style.info__item} key={item}>
                          <>
                            <div className={style.dark}>
                              {item.charAt(0).toUpperCase() + item.slice(1)}
                            </div>
                            {
                              data.minimum_system_requirements[
                                item as keyof typeof data.minimum_system_requirements
                              ]
                            }
                          </>
                        </Col>
                      ))
                    ) : (
                      <div>
                        <Typography.Paragraph className={style.dark}>
                          {data.title} is a browser based game and should run
                          smoothly on practically any PC with a updated
                          web-browser.
                        </Typography.Paragraph>
                        <Typography.Paragraph className={style.dark}>
                          If you have old hardware or software, you may still be
                          able to play {data.title}, but your game experience
                          may suffer. For the best gameplay experience, we
                          recommend the latest versions of Firefox, Chrome, or
                          Internet Explorer.
                        </Typography.Paragraph>
                      </div>
                    )}
                  </Row>
                  <Divider className={style.info__divider} />
                  <Typography.Text className={cn(style.copyrights, style.dark)}>
                    All material on this page is copyrighted by ©
                    {data.publisher} and their respective licensors. All other
                    trademarks are the property of their respective owners.
                  </Typography.Text>
                </div>
              </Col>
            </Row>
          </>
        )}
      </div>
    </div>
  );
};

export default Game;
