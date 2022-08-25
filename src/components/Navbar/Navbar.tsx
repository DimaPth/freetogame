import {
  AppstoreFilled,
  CaretDownOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Col, Dropdown, Layout, Menu, Row, Space } from "antd";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { RouteNames } from "../../routes";
import style from "./Navbar.module.scss";

const Navbar: FC = () => {
  const freeGames = (
    <Menu
      selectable={false}
      items={[
        { label: "MMORPG", key: "MMORPG" },
        { label: "Shooter", key: "Shooter" },
        { label: "MOBA", key: "MOBA" },
        { label: "Anime", key: "Anime" },
        { label: "Battle Royale", key: "Battle Royale" },
        { label: "Strategy", key: "Strategy" },
        { label: "Fantasy", key: "Fantasy" },
        { label: "Sci-Fi", key: "Sci-Fi" },
        { label: "Card Games", key: "Card Games" },
        { label: "Racing", key: "Racing" },
        { label: "Fighting", key: "Fighting" },
        { label: "Social", key: "Social" },
        { label: "Sports", key: "Sports" },
      ]}
    />
  );

  const browserGames = (
    <Menu
      selectable={false}
      items={[
        { label: "Browser MMORPG", key: "Browser MMORPG" },
        { label: "Browser Shooter", key: "Browser Shooter" },
        { label: "Browser Anime", key: "Browser Anime" },
        { label: "Browser Strategy", key: "Browser Strategy" },
        { label: "Browser Fantasy", key: "Browser Fantasy" },
        { label: "Browser Sci-Fi", key: "Browser Sci-Fi" },
        { label: "Browser Racing", key: "Browser Racing" },
        { label: "Browser Social", key: "Browser Social" },
        { label: "Browser Sports", key: "Browser Sports" },
      ]}
    />
  );

  const auth = false;

  return (
    <Layout.Header className={style.header}>
      <Row align="middle" className={style.header__content}>
        <Col span={16}>
          <Space size="large">
            <Link to={RouteNames.Home}>
              <img
                className={style.img}
                src="https://www.freetogame.com/assets/images/freetogame-logo.png"
                alt="logo"
              />
            </Link>
            <Link to={RouteNames.Games}>
              <Dropdown overlay={freeGames}>
                <Space size={4}>
                  Free games
                  <CaretDownOutlined />
                </Space>
              </Dropdown>
            </Link>
            <Link to={RouteNames.Games}>
              <Dropdown overlay={browserGames}>
                <Space size={4}>
                  Browser games
                  <CaretDownOutlined />
                </Space>
              </Dropdown>
            </Link>
            <Link to={RouteNames.Top}>
              <div>Top {new Date().getFullYear()}</div>
            </Link>
          </Space>
        </Col>
        <Col span={5} offset={3}>
          <Row justify="end">
            <Space size="middle">
              <Link to={RouteNames.Search}>
                <div>
                  <SearchOutlined />
                </div>
              </Link>
              <Link to={auth ? RouteNames.Library : RouteNames.Login}>
                <div>
                  <AppstoreFilled />
                </div>
              </Link>
              {auth ? (
                <div style={{ color: "#fff" }}>User</div>
              ) : (
                <>
                  <Link to={RouteNames.Login}>
                    <div>Log In</div>
                  </Link>
                  <Link to={RouteNames.Register} className={style.linkBtn}>
                    Join Free
                  </Link>
                </>
              )}
            </Space>
          </Row>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default Navbar;
