import { Layout } from "antd";
import React from "react";
import "./App.less";
import AppRouter from "./components/AppRouter";
import FooterContent from "./components/FooterContent/FooterContent";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <Layout>
      <Navbar />
      <Layout.Content className="content">
        <AppRouter />
      </Layout.Content>
      <FooterContent />
    </Layout>
  );
}

export default App;
