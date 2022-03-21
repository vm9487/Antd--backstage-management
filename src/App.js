import {
  Alert,
  Layout,
  Select,
  Typography,
  
} from "antd";

import {
  UserOutlined,
  BorderlessTableOutlined,
  FileSearchOutlined,
  HeartOutlined,
  CompassOutlined,

} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { API_URL } from "./utils/config";


// --------less or css-------------------------
import "antd/dist/antd.less";
import "./App.less";

// -------router comp--------------------------
import MemberProfile from "./pages/Member-profile";
import MemberOrder from './pages/Member-order';

// -------page comp----------------------------
import LeftSideBar from "./comp/leftSideBar";
import TopicMenu from './comp/TopicMenu';
import Header1 from "./comp/header";
import OrderDetails from "./pages/OrderDetails";
import MyFav from "./pages/MyFav";
import DashBoard from './pages/dashboard';
import { useCookies } from "react-cookie";
import { useAuth } from "./context/auth";



const { Content } = Layout;
const { Option } = Select;
const { Title } = Typography;


function App() {
  // ----導入menu context---------------------
  const topics = ["首頁", "個人資料", "訂單", "我的最愛", "露營地圖"];
  const menuIcons = [
    <BorderlessTableOutlined />,
    <UserOutlined />,
    <FileSearchOutlined />,
    <HeartOutlined />,
    <CompassOutlined />,
  ];
  const linkTo = ["/", "/profile", "/orders", "/favorites", "/map"];
  const [contentIndex, setContentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState("0");
  // const changeSelectedKey = (data) => {
  //   // const key = event.key;
  //   setSelectedKey(data.key);
  //   setContentIndex(+data.key);
  //   console.log("key",data.key)
  // };
  const changeSelectedKey = (event) => {
    const key = event.key;
    setSelectedKey(key);
    // setContentIndex(+key);
    console.log(contentIndex);
  };
  const Menu = (
    <TopicMenu
      linkTo={linkTo}
      topics={topics}
      menuIcons={menuIcons}
      selectedKey={selectedKey}
      changeSelectedKey={changeSelectedKey}
    />
  );
  // ------------------------------
  const [logData, setLogData] = useState(null); 
  useEffect(() => {
    // 每次重新整理或開啟頁面時，都去確認一下是否在已經登入的狀態。
    const getMember = async () => {
      try {
        let result = await axios.get(`${API_URL}/login`, {
          withCredentials: true,
        });
        console.log("app.js id",result.data.id);
        setLogData(result.data);
      } catch (e) {
        window.alert("您尚未登入，請登入後繼續");
        window.location.href = "http://localhost:3000/login";
        // 尚未登入過
        // 401 也不會去 setMember
      }
    };
    getMember();
  }, []);
  //------------------------------

  // const [cookies, setCookie] = useCookies(["connect.sid"]);
  // console.log("cookie", cookies);
  // let cookieQuery = cookies["connect.sid"];
  // console.log("cookieQuery", cookieQuery);
  // // const cookieQuery = cookies.connect.sid;
  

  return (
    <Layout style={{ height: "100vh" }}>
      <LeftSideBar menu={Menu} />
      <Layout>
        <Header1 menu={Menu} logData={logData} setLogData={setLogData} />
        <Content
          style={{
            margin: "0 16px",
            overflow: "scroll",
          }}
        >
          <Routes>
            <Route
              path="/profile"
              element={
                <MemberProfile
                  logData={logData}
                  selectedKey={selectedKey}
                  setSelectedKey={setSelectedKey}
                />
              }
            />
            <Route path="/orders" element={<MemberOrder logData={logData} />} />
            <Route
              path="/orderDetails/:POId"
              element={<OrderDetails  logData={logData} />}
            ></Route>
            <Route path="/favorites" element={<MyFav logData={logData}  />} />
            {/* <Route path="/logStatus" element={<LogStatus logData={logData} setLogData={setLogData} />} /> */}
            <Route path="/" element={<DashBoard logData={logData} />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}


export default App;
