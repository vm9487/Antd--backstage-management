import React from "react";
import { Divider, Typography } from "antd";
import "../style/campOrderDetail.less";
import "antd/dist/antd.less";
import { IMAGE_URL } from "../utils/config";

const { Title } = Typography;
const style = { background: "#e9e3da", padding: "8px 0" };

const OrderDetails6 = ({ data, poStatus, poStatusWord }) => {
  const tagWords = {
    1: "主打",
    2: "促銷",
  };
  const tagcolor = {
    1: "O6_tagStar",
    2: "O6_tag",
    3: "O6_tagNoStock",
  };
  const orderStatuscolor = {
    1: "statusTagTBD",
    2: "statusTagDone",
    3: "statusTagCancel",
    4: "statusTagPODone",
  };
  const orderStatus = {
    1: "未付款",
    2: "待出發",
    3: "已取消",
    4: "已出發",
  };
  var moment = require("moment");
  return (
    <>
      {data.map((item) => (
        <React.Fragment key={item.id}>
          {/* <li key={item.camp_name}>
            <div>{item.camp_name}</div>
          </li> */}
          <div style={style}>
            <div className={orderStatuscolor[poStatus]}>{poStatusWord}</div>
            <Divider />
            <div className="O6orderPicBox">
              <div className="O6_tagWord">{tagWords[item.camp_tag]}</div>
              <div className={tagcolor[item.camp_tag]}></div>
              <div className="O6_list_item">
                <img
                  className="O6_pic"
                  src={`${IMAGE_URL}/images/${item.img1}`}
                  // src={`${IMAGE_URL}${item.img1}`}
                  // http://localhost:3005/images/camp1.jpg
                  alt="camp-pic"
                />
                <img />
              </div>
            </div>

            <div className="subtitle">
              <span className="subWord">{item.camp_name}</span>
            </div>
            <div className="infobox">
              <span className="subnote">入住時間</span>
              <br />
              <span className="subname">
                {moment(`${item.orderdate_start}`).format("YYYY-MM-DD")}
              </span>
              <br />
              <span className="subnote">退房時間</span>
              <br />
              <span className="subname">
                {moment(`${item.orderdate_end}`).format("YYYY-MM-DD")}
              </span>
              <br />
              <span className="subnote">地址</span>
              <br />
              <span className="subname">{item.camp_add}</span>
              <br />
              <span className="subnote">電話</span>
              <br />
              <span className="subname">{item.phone}</span>
              <br />
            </div>
          </div>
        </React.Fragment>
      ))}
    </>
  );
};

export default OrderDetails6;
