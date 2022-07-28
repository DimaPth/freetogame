import {
  AppstoreFilled,
  CaretDownOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Col, Dropdown, Layout, Menu, Row, Space } from "antd";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import style from "./Navbar.module.scss";

const Navbar: FC = () => {
  const freeGames = (
    <Menu
      theme="dark"
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
      theme="dark"
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
    <Layout.Header>
      <Row align="middle">
        <Col span={16}>
          <Space size="large">
            <Link to="/" className={style.link}>
              <img
                src="https://www.freetogame.com/assets/images/freetogame-logo.png"
                alt="logo"
              />
            </Link>
            <Link to="/games" className={style.link}>
              <Dropdown overlay={freeGames}>
                <Space size={4}>
                  Free games
                  <CaretDownOutlined />
                </Space>
              </Dropdown>
            </Link>
            <Link to="/browser" className={style.link}>
              <Dropdown overlay={browserGames}>
                <Space size={4}>
                  Browser games
                  <CaretDownOutlined />
                </Space>
              </Dropdown>
            </Link>
            <Link to="/top" className={style.link}>
              <div>Top {new Date().getFullYear()}</div>
            </Link>
          </Space>
        </Col>
        <Col span={5} offset={3}>
          <Row justify="end">
            <Space size="middle">
              <Link to="/search" className={style.link}>
                <div>
                  <SearchOutlined className={style.icon} />
                </div>
              </Link>
              <Link to="/library" className={style.link}>
                <div>
                  <AppstoreFilled className={style.icon} />
                </div>
              </Link>
              {auth ? (
                <div style={{ color: "#fff" }}>User</div>
              ) : (
                <>
                  <Link to="/login" className={style.link}>
                    <div>Log In</div>
                  </Link>
                  <Link to="/register" className={style.link_btn}>
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
