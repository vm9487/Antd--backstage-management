import { Card, Col, Row, Tag } from "antd";
import React from "react";
import { IMAGE_URL } from "../utils/config";

import {
  HeartOutlined,
  ShareAltOutlined,
  ZoomInOutlined,
  HeartFilled,
} from "@ant-design/icons";

// --------less or css-------------------------
import "../style/FavCard.less";

const { Meta } = Card;

const FavCardP = ({ }) => {

  const tagWords = {
    1: "主打",
    2: "促銷",
  };
  const tagcolor = {
    1: "card_tagStar",
    2: "card_tag",
    3: "card_tagNoStock",
  };

  //--------------------------------------


  //--------------------------------------


  return (
    <React.Fragment>
      <div className="site-card-border-less-wrapper">
        <Row gutter={[{ xs: 2, sm: 2, md: 4, lg: 4 }, 40]} justify="center">
{/* //----------------------------------------------------------------------z/ */}
          <Col xs={20} sm={12} md={12} lg={12} xl={10} xxl={7}>
            <Card
              key="1"
              className="Scard"
              bordered={false}
              // style={{ width: 400 }}
              cover={
                <>
                  <div className="cardOrderPicBox">
                    <div className="card_tagWord">
                      {tagWords[1]}
                    </div>
                    <div className={tagcolor[1]}></div>
                    <div className="card_list_item">
                      <img
                        className="card_pic"
                        // src="http://localhost:3005/images/camp1.jpg"
                        src={`${IMAGE_URL}/images/product1.jpeg`}
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
                    key="1"
                    className="favBtn"

                  >
                    <HeartFilled
                      className="filledheart"

                      key="filledHeart"
                    />

                    <div className="favBtnWords">
                      Like
                    </div>
                  </div>
                </>,

                <>
                  <div className="favBtn">
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
                title={<span className="campName">時尚環保水壺</span>}
                description={
                  <>
                    <Tag color="#C15F2E">環保餐具</Tag>
                    <Tag color="#FCF9F5" className="tagFCF9F5">
                      水壺
                    </Tag>
                    <Tag color="#6A6842">餐具組
                    </Tag>
                    <div className="trancate"> 環保也能很時尚！OCEAN BOTTLE時尚環保水壺是每日喝水最佳夥伴，採用不鏽鋼及海洋再生塑料材質...</div>
                  </>
                }
              />
            </Card>
          </Col>
          {/* //----------------------------------------------------------------------z/ */}
          {/* //----------------------------------------------------------------------z/ */}
          <Col xs={20} sm={12} md={12} lg={12} xl={10} xxl={7}>
            <Card
              key="1"
              className="Scard"
              bordered={false}
              // style={{ width: 400 }}
              cover={
                <>
                  <div className="cardOrderPicBox">
                    <div className="card_tagWord">
                      {tagWords[0]}
                    </div>
                    <div className={tagcolor[0]}></div>
                    <div className="card_list_item">
                      <img
                        className="card_pic"
                        // src="http://localhost:3005/images/camp1.jpg"
                        src={`${IMAGE_URL}/images/product7.jpeg`}
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
                    key="1"
                    className="favBtn"

                  >
                    <HeartFilled
                      className="filledheart"

                      key="filledHeart"
                    />

                    <div className="favBtnWords">
                      Like
                    </div>
                  </div>
                </>,

                <>
                  <div className="favBtn">
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
                title={<span className="campName">環保袋</span>}
                description={
                  <>
                    <Tag color="#C15F2E">露營裝備</Tag>
                    <Tag color="#FCF9F5" className="tagFCF9F5">
                    背包
                    </Tag>
                    <Tag color="#6A6842">背包
                    </Tag>
                    <div className="trancate"> 以塑膠帶一體成形編織，波西米亞風大方編織法,小巧可愛,容量適中的環保袋, 小餐盒袋, 寵物隨身用品袋.</div>
                  </>
                }
              />
            </Card>
          </Col>
          {/* //----------------------------------------------------------------------z/ */}
           {/* //----------------------------------------------------------------------z/ */}
           <Col xs={20} sm={12} md={12} lg={12} xl={10} xxl={7}>
            <Card
              key="1"
              className="Scard"
              bordered={false}
              // style={{ width: 400 }}
              cover={
                <>
                  <div className="cardOrderPicBox">
                    <div className="card_tagWord">
                      {tagWords[2]}
                    </div>
                    <div className={tagcolor[2]}></div>
                    <div className="card_list_item">
                      <img
                        className="card_pic"
                        // src="http://localhost:3005/images/camp1.jpg"
                        src={`${IMAGE_URL}/images/product13.jpeg`}
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
                    key="1"
                    className="favBtn"

                  >
                    <HeartFilled
                      className="filledheart"

                      key="filledHeart"
                    />

                    <div className="favBtnWords">
                      Like
                    </div>
                  </div>
                </>,

                <>
                  <div className="favBtn">
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
                title={<span className="campName">環保牙刷</span>}
                description={
                  <>
                    <Tag color="#C15F2E">露營裝備</Tag>
                    <Tag color="#FCF9F5" className="tagFCF9F5">
                    牙刷
                    </Tag>
                    <Tag color="#6A6842">牙刷
                    </Tag>
                    <div className="trancate"> 使用蓖麻油提煉出來的纖維，適合素食者使用。雖然環境不可分解，但在製作過程中不需要使用石化原料，是碳排</div>
                  </>
                }
              />
            </Card>
          </Col>
          {/* //----------------------------------------------------------------------z/ */}
        </Row>
      </div>
    </React.Fragment>
  );
};

export default FavCardP;
