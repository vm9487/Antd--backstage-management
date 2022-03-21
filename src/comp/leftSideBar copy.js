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
import { Link, NavLink } from "react-router-dom";

import "antd/dist/antd.less";
import Text from "../img/Text.svg";

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;
const { Title } = Typography;


class LeftSideBar1 extends Component {
  state = {
    collapsed: false,
    mode: "inline",
  };


  render() {
    return (
      <>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          className="sidebar"
        >
        <Link  to="/">
        <img className="text" src={Text} alt="" />
        </Link>
          
          <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              
              <Link  to="/dashboard">
              <BorderlessTableOutlined />
              <span className="nav-text">首頁</span>
              </Link>
              
            </Menu.Item>
            <Menu.Item key="2">
              <Link  to="/profile">
                <UserOutlined />
                <span className="nav-text">個人資料</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <FileSearchOutlined />
              <span className="nav-text">訂單</span>
            </Menu.Item>
            <Menu.Item key="4">
              <HeartOutlined />
              <span className="nav-text">我的最愛</span>
            </Menu.Item>
            <Menu.Item key="5">
              <CompassOutlined />
              <span className="nav-text">露營地圖</span>
            </Menu.Item>
          </Menu>
        </Sider>
      </>
    );
  }
}

export default LeftSideBar1;
