import { Card, Col, Row, Tag } from "antd";
import React from "react";
import { IMAGE_URL } from "../utils/config";
import { useState, useEffect } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  HeartOutlined,
  ShareAltOutlined,
  ZoomInOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { API_URL } from "../utils/config";
import axios from "axios";
// --------less or css-------------------------
import "../style/FavCard.less";

const { Meta } = Card;

const FavCard = ({ favData, setFavData, setLikeData, likeData }) => {
  const tagWords = {
    1: "主打",
    2: "促銷",
  };
  const tagcolor = {
    1: "card_tagStar",
    2: "card_tag",
    3: "card_tagNoStock",
  };
  const orderStatuscolor = {
    1: "statusTagTBD",
    2: "statusTagDone",
    3: "statusTagCancel",
    4: "statusTagPODone",
  };
  const orderStatus = {
    1: "未付款",
    2: "已付款",
    3: "已取消",
    4: "已完成",
  };
  //-----------------------------------------

  //--------------------------------------

  function goCampPage(idx) {
    console.log(`idx: ${idx}`);
    let clickedFav = favData[idx];
    let campID = clickedFav.FAV_CAMPID;
    console.log(campID);
    window.location.href = `http://localhost:3000/camp/${campID}`;
  }
  const handleToggle = (idx) => {
    console.log(`idx: ${idx}`);
    let clickedFav = favData[idx];
    console.log(clickedFav.FAV_CAMPID);
    const campId = clickedFav.FAV_CAMPID;
     console.log("campId", clickedFav.FAV_CAMPID);
    let newData = [...favData];


    //like原本沒這數值 所以每一個按到的時候都是undefine 愛心是實心
    if (newData[idx].like === undefined) {
      newData[idx].like ="0"; //按到的時候把它改成false=0 愛心是空心
      DelFav(campId); //false的時候去從資料庫刪除他
    } else if (newData[idx].like == "0") {
      //如果他是false=0 代表再按一次要加入資料庫 所以like改成true=1
      newData[idx].like = "1";
      AddFav(campId);
    } else if (!newData[idx].like == "0") {
      //WHY: 只能寫不等於不能寫==1??
      newData[idx].like = "0";
      DelFav(campId);
    }
    setFavData(newData);
    console.log("newData:", newData);
    //---------------後端刪除愛心----------------------------
    async function DelFav(campId) {
      try {
        console.log("campId", campId);
        let result = await axios.post(
          `${API_URL}/favAll/del`,
          { campId: `${campId}` },
          {
            withCredentials: true,
          }
        );
        console.log("del", result.data);
      } catch (e) {
        console.error("error");
      }
    }
    //---------------後端加入愛心----------------------------
    async function AddFav(campId) {
      try {
        let result = await axios.post(
          `${API_URL}/favAll/add`,
          { campId: `${campId}` },
          {
            withCredentials: true,
          }
        );
        console.log("add", result.data);
      } catch (e) {
        console.error("error");
      }
    }
  };
  return (
    <React.Fragment>
      <div className="site-card-border-less-wrapper">
        <Row gutter={[{ xs: 2, sm: 2, md: 4, lg: 4 }, 40]} justify="center">
          {favData.map((fav, index) => {
            return (
              <Col xs={20} sm={12} md={12} lg={12} xl={10} xxl={7}>
                <Card
                  key={fav.camp_id}
                  className="Scard"
                  bordered={false}
                  // style={{ width: 400 }}
                  cover={
                    <>
                      <div className="cardOrderPicBox">
                        <div className="card_tagWord">
                          {tagWords[fav.camp_tag]}
                        </div>
                        <div className={tagcolor[fav.camp_tag]}></div>
                        <div className="card_list_item">
                          <img
                            className="card_pic"
                            // src="http://localhost:3006/images/camp1.jpg"
                            src={`${IMAGE_URL}/images/${fav.img1}`}
                            alt="camp-pic"
                          />
                          <img />
                        </div>
                      </div>
                    </>
                  }
                  actions={[
                    <>
                      <div
                        key={fav.camp_id}
                        className="favBtn"
                        onClick={(e) => handleToggle(index)}
                      >
                        <HeartFilled
                          className={
                            fav.like === undefined || fav.like =="1"
                              ? " filledheart"
                              : "filledheart heartdisplaynone"
                          }
                          key="filledHeart"
                        />
                        <HeartOutlined
                          className={
                            fav.like =="0"
                              ? "filledheart "
                              : "filledheart heartdisplaynone"
                          }
                          key="heart"
                        />
                        <div className="favBtnWords">
                          {likeData ? " Like" : "Unlike"}
                        </div>
                      </div>
                    </>,

                    <>
                      <div className="favBtn" onClick={() => goCampPage(index)}>
                        <ZoomInOutlined key="zoom" />
                        <div className="favBtnWords">
                          {/* <a href={`http://localhost:3000/camp/${fav.camp_id}`}>*/}
                          看詳細
                          {/* </a> */}
                        </div>
                      </div>
                    </>,
                    <>
                      <div className="favBtn">
                        <ShareAltOutlined key="share" />{" "}
                        <div className="favBtnWords">分享</div>
                      </div>
                    </>,
                  ]}
                >
                  <Meta
                    title={<span className="campName">{fav.camp_name}</span>}
                    description={
                      <>
                        <Tag color="#C15F2E">{fav.camp_county}</Tag>
                        <Tag color="#FCF9F5" className="tagFCF9F5">
                          {fav.camp_item}
                        </Tag>
                        <Tag color="#6A6842">{fav.tent_item}</Tag>
                        <div className="trancate"> {fav.camp_intro}</div>
                      </>
                    }
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </React.Fragment>
  );
};

export default FavCard;
