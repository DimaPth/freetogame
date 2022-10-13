import {
  AppstoreFilled,
  CaretDownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Col, Dropdown, Layout, Menu, Modal, Row, Space } from "antd";
import type { MenuProps } from "antd";
import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { RouteNames } from "../../routes";
import style from "./Navbar.module.scss";
import { getAuth, signOut } from "firebase/auth";
import { setUser } from "../../redux/slices/userSlice";
import { useAppDispatch } from "../../hooks/redux";
import cn from "classnames";

const Navbar: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
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
      onClick={() => setModalOpen(false)}
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
        { label: <Link to="/games/all">All Free Games</Link>, key: "All" },
      ]}
    />
  );

  const browserGames = (
    <Menu
      selectable={false}
      onClick={() => setModalOpen(false)}
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
        {
          label: <Link to="/games/browser">All Browser Games</Link>,
          key: "All",
        },
      ]}
    />
  );

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "Logout") {
      logoutUser();
    }
    setModalOpen(false);
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
        <Col span={4} xl={{ span: 4 }} lg={{ span: 5 }}>
          <Link to={RouteNames.Home}>
            <img
              className={style.img}
              src="https://www.freetogame.com/assets/images/freetogame-logo.png"
              alt="logo"
            />
          </Link>
        </Col>
        <Col xl={{ span: 12 }} lg={{ span: 11 }} className={style.full}>
          <Space size="large">
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
        <Col span={8} className={style.full}>
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
        <Col span={4} offset={16} className={style.mobile}>
          <Row justify="end">
            {modalOpen ? (
              <MenuFoldOutlined
                className={style.burger}
                onClick={() => setModalOpen(false)}
              />
            ) : (
              <MenuUnfoldOutlined
                className={style.burger}
                onClick={() => setModalOpen(true)}
              />
            )}
            <Modal
              bodyStyle={{ backgroundColor: "#272b30" }}
              style={{ top: 55, right: 0 }}
              width={"100%"}
              mask={false}
              footer={null}
              visible={modalOpen}
              onOk={() => setModalOpen(false)}
              onCancel={() => setModalOpen(false)}
            >
              <div className={style.modalLink}>
                <Dropdown
                  overlay={freeGames}
                  trigger={["click"]}
                  overlayStyle={{ width: "300px" }}
                >
                  <Space size={4}>
                    Free games
                    <CaretDownOutlined />
                  </Space>
                </Dropdown>
              </div>
              <div className={style.modalLink}>
                <Dropdown
                  overlay={browserGames}
                  trigger={["click"]}
                  overlayStyle={{ width: "300px" }}
                >
                  <Space size={4}>
                    Browser games
                    <CaretDownOutlined />
                  </Space>
                </Dropdown>
              </div>
              <Link
                to={RouteNames.Top}
                className={style.modalLink}
                onClick={() => setModalOpen(false)}
              >
                <div>Top {new Date().getFullYear()}</div>
              </Link>
              <Link
                to={RouteNames.Search}
                className={style.modalLink}
                onClick={() => setModalOpen(false)}
              >
                <div>
                  <SearchOutlined /> Search
                </div>
              </Link>
              <Link
                to={isAuth ? RouteNames.Library : RouteNames.Login}
                className={style.modalLink}
                onClick={() => setModalOpen(false)}
              >
                <div>
                  <AppstoreFilled /> Library
                </div>
              </Link>
              {isAuth ? (
                <div className={style.modalLink}>
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
                </div>
              ) : (
                <>
                  <Link
                    to={RouteNames.Login}
                    className={style.modalLink}
                    onClick={() => setModalOpen(false)}
                  >
                    <div>Log In</div>
                  </Link>
                  <Link
                    to={RouteNames.Register}
                    className={cn(style.linkBtn, style.modalLink)}
                    onClick={() => setModalOpen(false)}
                  >
                    Join Free
                  </Link>
                </>
              )}
            </Modal>
          </Row>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default Navbar;
