import {
  Menu,
} from "antd";

import React from "react";
import { Link, } from "react-router-dom";

import "antd/dist/antd.less";

function TopicMenu({
  linkTo,
  topics,
  menuIcons,
  selectedKey,
  changeSelectedKey,
}) {
  const styledTopics = [];

  topics.forEach((topic, index) =>
    styledTopics.push(
      <Menu.Item
        key={index}
        onClick={(index) => changeSelectedKey(index)}
        icon={menuIcons[index]}
      >
        <Link to={linkTo[index]}>
          <span className="nav-text">{topic}</span>
        </Link>
      </Menu.Item>
    )
  );

  return (
    <Menu theme="light" mode="vertical" selectedKeys={[selectedKey]}>
      {styledTopics}
    </Menu>
  );
}

export default TopicMenu;
