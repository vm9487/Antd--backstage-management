import {
  Layout,
  Menu,
  Breadcrumb,
  Form,
  Select,
  InputNumber,
  DatePicker,
  Switch,
  Slider,
  Button,
  Rate,
  Typography,
  Space,
  Divider,
  Drawer,
} from "antd";

import {
  UserOutlined,
  BorderlessTableOutlined,
  FileSearchOutlined,
  ArrowUpOutlined,
  AimOutlined,
  HeartOutlined,
  CompassOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";

import "antd/dist/antd.less";
import "./App.less";
import Logo from "./img/logo.svg";
import Text from "./img/Text.svg";

import Test from "./comp/test";
import MemberProfile from "./pages/member-profile";
import LeftSideBar from "./comp/leftSideBar";
// import LeftDrawer from "./comp/leftDrawer";


import Header1 from "./comp/header";

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;
const { Title } = Typography;

class App extends Component {
  state = {
    collapsed: false,
    mode: "inline",
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };


  render() {

    return (
      <Layout style={{height: '100vh', overflow: 'scroll'}}>
        {/* <LeftDrawer/>*/}
        <LeftSideBar style={{ 
            }}/>
        <Layout>
          <Header1 />
          <Content style={{ 
            margin: "0 16px",
            overflow: 'scroll',
             }}>

            <Routes>
            <Route path="/profile" element={<MemberProfile />} />
            </Routes>
           
          </Content>

        </Layout>
      </Layout>
    );
  }
}

export default App;
