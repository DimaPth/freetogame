import {
  AppstoreFilled,
  CaretDownOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Col, Dropdown, Layout, Menu, Row, Space } from "antd";
import type { MenuProps } from "antd";
import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { RouteNames } from "../../routes";
import style from "./Navbar.module.scss";
import { getAuth, signOut } from "firebase/auth";
import { setUser } from "../../redux/slices/userSlice";
import { useAppDispatch } from "../../hooks/redux";

const Navbar: FC = () => {
  const { isAuth, username } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const auth = getAuth();

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        dispatch(
          setUser({
            username: null,
            email: null,
            id: null,
            token: null,
          })
        );
        navigate("/");
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  const freeGames = (
    <Menu
      selectable={false}
      items={[
        { label: <Link to="/games/all/mmorpg">MMORPG</Link>, key: "MMORPG" },
        {
          label: <Link to="/games/all/shooter">Shooter</Link>,
          key: "Shooter",
        },
        { label: <Link to="/games/all/moba">MOBA</Link>, key: "MOBA" },
        {
          label: <Link to="/games/all/strategy">Strategy</Link>,
          key: "Strategy",
        },
        {
          label: <Link to="/games/all/card">Card Games</Link>,
          key: "Card Games",
        },
        { label: <Link to="/games/all/racing">Racing</Link>, key: "Racing" },
        {
          label: <Link to="/games/all/fighting">Fighting</Link>,
          key: "Fighting",
        },
        { label: <Link to="/games/all/social">Social</Link>, key: "Social" },
        { label: <Link to="/games/all/sports">Sports</Link>, key: "Sports" },
      ]}
    />
  );

  const browserGames = (
    <Menu
      selectable={false}
      items={[
        {
          label: <Link to="/games/browser/mmorpg">Browser MMORPG</Link>,
          key: "MMORPG",
        },
        {
          label: <Link to="/games/browser/shooter">Browser Shooter</Link>,
          key: "Shooter",
        },
        {
          label: <Link to="/games/browser/moba">Browser MOBA</Link>,
          key: "MOBA",
        },
        {
          label: <Link to="/games/browser/strategy">Browser Strategy</Link>,
          key: "Strategy",
        },
        {
          label: <Link to="/games/browser/card">Browser Card Games</Link>,
          key: "Card Games",
        },
        {
          label: <Link to="/games/browser/racing">Browser Racing</Link>,
          key: "Racing",
        },
        {
          label: <Link to="/games/browser/fighting">Browser Fighting</Link>,
          key: "Fighting",
        },
        {
          label: <Link to="/games/browser/social">Browser Social</Link>,
          key: "Social",
        },
        {
          label: <Link to="/games/browser/sports">Browser Sports</Link>,
          key: "Sports",
        },
      ]}
    />
  );

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "Logout") {
      logoutUser();
    }
  };

  const account = (
    <Menu
      selectable={false}
      onClick={onClick}
      items={[
        { label: <Link to="/library">My Library</Link>, key: "Library" },
        { label: "Logout", key: "Logout" },
      ]}
    />
  );

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
            <Link to="/games/all">
              <Dropdown overlay={freeGames}>
                <Space size={4}>
                  Free games
                  <CaretDownOutlined />
                </Space>
              </Dropdown>
            </Link>
            <Link to="/games/browser">
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
              <Link to={isAuth ? RouteNames.Library : RouteNames.Login}>
                <div>
                  <AppstoreFilled />
                </div>
              </Link>
              {isAuth ? (
                <Dropdown
                  overlay={account}
                  trigger={["click"]}
                  className={style.account}
                >
                  <Space size={4}>
                    <img
                      src="https://www.freetogame.com/assets/images/avatars/default/default-small.png"
                      alt="avatar"
                      width={32}
                      height={32}
                      className={style.img}
                    />
                    {username}
                    <CaretDownOutlined />
                  </Space>
                </Dropdown>
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
