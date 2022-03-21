import {
  Layout,
  Menu,
  Breadcrumb,
  Button,
  Drawer,
} from "antd";
import {
  UserOutlined,
  BorderlessTableOutlined,
  FileSearchOutlined,

  HeartOutlined,
  CompassOutlined,
  MenuOutlined,

} from "@ant-design/icons";
import React, { Component } from "react";
import "antd/dist/antd.less";
import Logo from '../img/logo.svg'
import Text from '../img/Text.svg'
import "../comp/navi.css";
import Test from "../comp/test";
import LeftSideBar from '../comp/leftSideBar';
// import "./App.less";

const { Header, Content, Footer, Sider } = Layout;



class SiderDemo extends Component {
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
      <Layout>

        <Drawer
          // title="Basic Drawer"
          placement="left"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{
            backgroundColor: "#6A6842",
            color: "#fff",
            height: "calc(100vh - 55px)",
            overflow: "auto",
            width: 200,
            

          }}
        >
          {/* -------------------left side bar-in drawer----------------------------------------------------- */}
          <Sider trigger={null}
            collapsible collapsed={this.state.collapsed}
            className="drawer"
            bodyStyle={{
              backgroundColor: "#6A6842",
              color: "#fff",
              height: "calc(100vh - 55px)",
              width: 200,

            }}

          >
            <img className="text" src={Text} alt="" />

            <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <BorderlessTableOutlined />

                <span className="nav-text">首頁</span>
              </Menu.Item>
              <Menu.Item key="2">
                <UserOutlined />
                <span className="nav-text">個人資料</span>
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

        </Drawer>

        <LeftSideBar></LeftSideBar>



        <Layout>
          <Header
          // style={{ background: '#000', padding: 0 }}
          >
            <Button className="barsMenu" type="primary" onClick={this.showDrawer}>
              <span className="barsBtn"><MenuOutlined /></span>
            </Button>

            <span
              style={{
                // color: '#fff',
                paddingLeft: "2%",
                fontSize: "1.4em",
              }}
            ></span>
            <span
              style={{
                color: '#fff',
                // paddingLeft: "2%",
                fontSize: "1.8em",
              }}
            >
              會員中心
            </span>
            <span
              style={{
                // color: '#fff',
                float: "right",
                paddingRight: "1%",
              }}
            >
              <img className="logo-left" src={Logo} alt="logo" />
            </span>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "12px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <Test></Test>
          </Content>
          <Footer style={{ textAlign: "center" }}>森活營家．live green to save green</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo;
