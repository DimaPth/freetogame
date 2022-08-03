import { Button, Col, Row } from "antd";
import { Footer } from "antd/lib/layout/layout";
import React from "react";

const FooterContent = () => {
  return (
    <Footer>
      <Row align="middle">
        <Col>1</Col>
        <Col>2</Col>
        <Col>3</Col>
        <Col>4</Col>
      </Row>
      <Row align="middle">
        <Col>1</Col>
        <Col>2</Col>
      </Row>
    </Footer>
  );
};

export default FooterContent;
