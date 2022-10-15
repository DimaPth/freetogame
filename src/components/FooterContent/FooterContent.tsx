import {
  FacebookOutlined,
  TwitterOutlined,
  WifiOutlined,
} from "@ant-design/icons";
import { Col, Divider, Row, Space } from "antd";
import { Footer } from "antd/lib/layout/layout";
import React, { FC } from "react";
import style from "./FooterContent.module.scss";

const FooterContent: FC = () => {
  return (
    <Footer className={style.footer}>
      <div className={style.footer__wrap}>
        <Row align="middle" className={style.row}>
          <Col
            md={{ span: 5 }}
            sm={{ span: 6 }}
            xs={{ span: 24 }}
            className={style.col}
          >
            <a
              href="https://www.freetogame.com/about"
              target="_blank"
              rel="noreferrer"
              className={style.link}
            >
              About Us
            </a>
            <a
              href="https://www.freetogame.com/api-doc"
              target="_blank"
              rel="noreferrer"
              className={style.link}
            >
              API
            </a>
            <a
              href="https://www.freetogame.com/contact"
              target="_blank"
              rel="noreferrer"
              className={style.link}
            >
              Contact Us
            </a>
          </Col>
          <Divider className={style.mobile} />
          <Col
            md={{ span: 5 }}
            sm={{ span: 6 }}
            xs={{ span: 24 }}
            className={style.col}
          >
            <a
              href="https://www.freetogame.com/faq"
              target="_blank"
              rel="noreferrer"
              className={style.link}
            >
              Help/FAQ
            </a>
            <a
              href="https://www.freetogame.com/support"
              target="_blank"
              rel="noreferrer"
              className={style.link}
            >
              Support &amp; Bugs
            </a>
            <a
              href="https://www.freetogame.com/feedback"
              target="_blank"
              rel="noreferrer"
              className={style.link}
            >
              Feature Request
            </a>
          </Col>
          <Divider className={style.mobile} />
          <Col
            md={{ span: 5 }}
            sm={{ span: 8 }}
            xs={{ span: 24 }}
            className={style.col}
          >
            <a
              href="https://www.freetogame.com/privacy-policy"
              target="_blank"
              rel="noreferrer"
              className={style.link}
            >
              Privacy Policy
            </a>
            <a
              href="https://www.freetogame.com/cookies-policy"
              target="_blank"
              rel="noreferrer"
              className={style.link}
            >
              Cookies Policy
            </a>
            <a
              href="https://www.freetogame.com/terms-of-use"
              target="_blank"
              rel="noreferrer"
              className={style.link}
            >
              Terms of Use
            </a>
          </Col>
          <Divider className={style.mobile} />
          <Col
            md={{ span: 9 }}
            sm={{ span: 4 }}
            xs={{ span: 24 }}
            className={style.logo}
          >
            <div>
              <img
                src="https://www.freetogame.com/assets/images/logo-footer.png"
                alt="logo"
              />
            </div>
          </Col>
        </Row>
        <Divider />
        <Row justify="space-between" align="middle">
          <Col sm={{ span: 16 }} xs={{ span: 24 }}>
            <span className={style.small}>
              © {new Date().getFullYear()} Digiwalls Media, all rights reserved.
              All trademarks are property of their respective owners.
            </span>
          </Col>
          <Divider className={style.mobile} />
          <Col sm={{ span: 8 }} xs={{ span: 24 }} className={style.brands}>
            <Space size="large">
              <a
                href="https://www.facebook.com/FreeToGameOfficial/"
                target="_blank"
                rel="noreferrer"
                className={style.brand}
              >
                <FacebookOutlined />
              </a>
              <a
                href="https://twitter.com/FreeToGamecom"
                target="_blank"
                rel="noreferrer"
                className={style.brand}
              >
                <TwitterOutlined />
              </a>
              <a
                href="https://www.freetogame.com/rss/games"
                target="_blank"
                rel="noreferrer"
                className={style.brand}
              >
                <WifiOutlined />
              </a>
            </Space>
          </Col>
        </Row>
      </div>
    </Footer>
  );
};

export default FooterContent;
