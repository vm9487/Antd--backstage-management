import {
  Layout,

} from "antd";

import React from "react";
import { Link } from "react-router-dom";

import "antd/dist/antd.less";
import Text from "../img/Text.svg";

const { Sider } = Layout;



function LeftSideBar ({menu}){
    return (
      <>
        <Sider
          trigger={null}
          collapsible
          className="sidebar"
        >
        <Link  to="/">
        <img className="text" src={Text} alt="" />
        </Link>
          {menu}
       
        </Sider>
      </>
    );
  }


export default LeftSideBar;
