import { Layout, Button, Drawer, Menu, Modal} from "antd";

import { MenuOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "antd/dist/antd.less";
import Logo from "../img/logo.svg";
import "../App.less";
import { API_URL } from "../utils/config";


import axios from "axios";
const { Header } = Layout;
const { SubMenu } = Menu;


function Header1({ menu,setLogData,logData }) {
  const [visible, setVisible] = useState(false);
  // const [logData, setLogData] = useState({}); 
  //-------------------------------------------------
  function countDown() {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: "您即將登出",
      content: `在 ${secondsToGo} 秒之後將會自動登出並回到首頁`,
      closable: "true",
      onOk: ()=>handleLogout(),
    });

    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `在 ${secondsToGo} 秒之後將會自動登出並回到首頁`,
        closable: "true",
        onOk: ()=>handleLogout(),
      });
    }, 1000);

    setTimeout(() => {
      modal.destroy();
      clearInterval(timer);
      handleLogout()
    }, secondsToGo * 900);
  }
//------------------------------------------
   const handleLogout = async () => {
     await axios.get(`${API_URL}/logOut`, {
       withCredentials: true,
     });
     setLogData(null);
     window.location.href = "http://localhost:3000";
  };
  //-----------------------------------------
  return (
    <>
      <Header>
        <Button
          className="barsMenu"
          type="primary"
          onClick={() => setVisible(true)}
          style={{ marginBottom: "50%" }}
        >
          <span className="barsBtn">
            <MenuOutlined />
          </span>
        </Button>
        <span
          style={{
            color: "#fff",
            // paddingLeft: "10%",
            fontSize: "1.8em",
          }}
        >
          會員中心
        </span>
        <img
          className="logo-left"
          src={Logo}
          alt="logo"
          style={{
            float: "right",
            margin: "10px",
          }}
        />
        <Menu
          mode="horizontal"
          style={{
            float: "right",
          }}
        >
          <Menu.Item key="setting:1">
            <a href="http://localhost:3000/" target="_blank">
              回首頁
            </a>
          </Menu.Item>
          <Menu.Item key="setting:2" onClick={countDown}>
            登出
          </Menu.Item>
        </Menu>

        {/* <span
          style={{
            // color: '#fff',
            float: "right",
            paddingRight: "1%",
          }}
        >
          <img className="logo-left" src={Logo} alt="logo" />
        </span> */}
      </Header>
      <Drawer
        // title="Basic Drawer"
        placement="left"
        closable={false}
        onClick={() => setVisible(false)}
        onClose={() => setVisible(false)}
        visible={visible}
        width="200"
        bodyStyle={{
          backgroundColor: "#6A6842",
          color: "#fff",
          height: "calc(100vh - 55px)",
          overflow: "auto",
          width: 200,
        }}
      >
        {menu}
      </Drawer>
    </>
  );
}

export default Header1;
