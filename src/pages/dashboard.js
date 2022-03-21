import {
  Avatar,
  PageHeader,
  Button,
  Card,
  Row,
  Col,
  Divider,
  List,
  message,
  Popover,
} from "antd";
import React from "react";
import { useState, useEffect } from "react";
import {
  UserOutlined,

  NotificationFilled,
  CaretRightOutlined,
} from "@ant-design/icons";
import "../style/dashBoardMember.less";
import axios from "axios";
import { API_URL } from "../utils/config";
import { IMAGE_URL } from "../utils/config";
import CouponList from "../comp/couponList";
import AllCouponList from "../comp/allCouponList";
import { Navigate, Link } from "react-router-dom";
import HeadPic from "../comp/HeadPic";

const DashBoard = ({}) => {
  const [memberPic, setMemberPic] = useState({});
  //----------------------------
  const [couponVisible, setCouponVisible] = useState(false);
  // ----be-----User基本資料:名字,點數,照片,跟等級=消費金額------
  const [rankData, setRankData] = useState([]);
  async function Rank() {
    try {
      let result = await axios.get(`${API_URL}/dashboard/user`, {
        withCredentials: true,
      });
      console.log("rank", result.data);
      // console.log(response.data[0].id);
      setRankData(result.data[0]);
    } catch (e) {
      console.error("error");
    }
  }
  // ----be-----到期coupon------
  const [couponData, setCoupon] = useState([]);
  async function Coupon() {
    try {
      let result = await axios.get(`${API_URL}/dashboard/coupon`, {
        withCredentials: true,
      });
      console.log("coupon", result.data[0]);
      // console.log(response.data[0].id);
      setCoupon(result.data[0]);
    } catch (e) {
      console.error("error");
    }
  }
  // ----be-----allcoupon------
  const [allCouponData, setAllCoupon] = useState([]);
  async function AllCoupon() {
    try {
      let result = await axios.get(`${API_URL}/dashboard/allCoupon`, {
        withCredentials: true,
      });
      console.log("allcoupon", result.data[0]);
      // console.log(response.data[0].id);
      setAllCoupon(result.data[0]);
    } catch (e) {
      console.error("error");
    }
  }
  // ----be-----iti------
  const [itiData, setIti] = useState([]);
  async function Iti() {
    try {
      let result = await axios.get(`${API_URL}/dashboard/iti`, {
        withCredentials: true,
      });
      console.log("iti", result.data[0]);
      // console.log(response.data[0].id);
      setIti(result.data[0]);
    } catch (e) {
      console.error("error");
    }
  }
  // ----be-----pur------
  const [purData, setPur] = useState([]);
  async function Pur() {
    try {
      let result = await axios.get(`${API_URL}/dashboard/pur`, {
        withCredentials: true,
      });
      console.log("pur", result.data[0]);
      // console.log(response.data[0].id);
      setPur(result.data[0]);
    } catch (e) {
      console.error("error");
    }
  }
  useEffect(() => {
    Rank();
    Coupon();
    AllCoupon();
    Iti();
    Pur();
  }, []);

  // useEffect(() => {
  //   if (formData.get("photo") === undefined) return;
  //   handleSubmitPic();
  // }, [memberPic]);

  //--------------------------------


  //--------------------------------

  const [file, setFile] = React.useState(null);

  async function onFotoClick(e) {
    try {
      setMemberPic({ ...memberPic, photo: e.target.files[0] });
      setFile(e.target.files[0]);
    } catch (e) {
      console.error("onFotoClick Failed");
    }
  }

  async function handleSubmitPic(e) {
    e.preventDefault(e);
    try {
      // 方法2: 要圖片上傳要用 FormData
      let formData = new FormData();
      formData.append("photo", memberPic.photo);
      console.log("formdata", formData.get("photo"));
      //if (formData.get("photo") === undefined) return;
      let response = await axios.post(`${API_URL}/changePic`, formData, {
        withCredentials: true,
      });
      console.log(response.data);
      setConfirmPicLoading(true);
      setTimeout(() => {
        setpicModalVisible(false);
        setConfirmPicLoading(false);
        message.success("上傳成功");
      }, 2000);
    } catch (e) {

       console.log("錯誤訊息",e.response.data.error);
      
      message.error(`上傳失敗，${e.response.data.error}`);
      // console.error("上傳失敗");
    }
  }
  //--------------------------------
  const showModal = () => {
    setpicModalVisible(true);
  };
  const [picModalvisible, setpicModalVisible] = React.useState(false);
  const [confirmPicLoading, setConfirmPicLoading] = React.useState(false);

  const handlePicOk = (e) => {
    handleSubmitPic(e);
  };

  const handlePicCancel = () => {
    setpicModalVisible(false);
  };
  //--------------------------------

  return (
    <>
      {rankData.map((rank) => {
        return (
          <React.Fragment>
            <HeadPic
              picModalvisible={picModalvisible}
              confirmPicLoading={confirmPicLoading}
              handlePicOk={handlePicOk}
              handlePicCancel={handlePicCancel}
              onFotoClick={onFotoClick}
            />
            <PageHeader
              className="site-page-header"
              title={`Welcome!! ${rank.name.slice(1, 5)}`}
              //subTitle={rank.name.slice(1, 5)}
              // extra={"test"}
              //footer={"test"}
            >
              {/* test */}
              <Divider
                style={{ marginBottom: 20, marginTop: "-3em", border: "5em" }}
              >
                <div className="memberpicBox">
                  <div className="avaContainer">
                    <Avatar
                      onClick={showModal}
                      className="mask"
                      size={{
                        xs: 128,
                        sm: 128,
                        md: 128,
                        lg: 160,
                        xl: 200,
                        xxl: 200,
                      }}
                    >
                      點選更換頭貼
                    </Avatar>
                    <Avatar
                      onClick={showModal}
                      className="avatarMember"
                      src={
                        file
                          ? URL.createObjectURL(file)
                          : `${IMAGE_URL}/images/${rank.img}`
                      }
                      size={{
                        xs: 128,
                        sm: 128,
                        md: 128,
                        lg: 160,
                        xl: 200,
                        xxl: 200,
                      }}
                      icon={<UserOutlined />}
                    />
                  </div>
                </div>
                <Popover
                  className="member_popover"
                  placement="rightTop"
                  content={
                    (rank.acc_total >= 100000 && (
                      <div className="popover_content">
                        <div>恭喜你！</div>
                        <div>
                          <CaretRightOutlined />
                          您現在是白金會員，每月可獲得500全站使用折價券
                        </div>
                      </div>
                    )) ||
                    (rank.acc_total >= 50000 && (
                      <div className="popover_content">
                        <div>
                          <CaretRightOutlined />
                          您現在是金色會員，每月可獲得300全站使用折價券
                        </div>
                        <div>
                          <CaretRightOutlined />
                          再消費${100000 - rank.acc_total}
                          即可成為白金會員並享受每月500全站折價券！
                        </div>
                      </div>
                    )) ||
                    (rank.acc_total >= 10000 && (
                      <div className="popover_content">
                        <div>
                          <CaretRightOutlined />
                          您現在是銀色會員，每月可獲得100全站使用折價券
                        </div>
                        <div>
                          <CaretRightOutlined />
                          再消費${50000 - rank.acc_total}
                          即可成為金色會員即可成為白金會員並享受每月300全站折價券！
                        </div>
                      </div>
                    )) ||
                    (rank.acc_total < 10000 && (
                      <div className="popover_content">
                        <div>
                          <CaretRightOutlined />
                          您現在是普通會員
                        </div>
                        <div>
                          <CaretRightOutlined />
                          再消費${10000 - rank.acc_total}
                          即可成為銀色會員並每月獲得100折價券！
                        </div>
                      </div>
                    ))
                  }
                  title={<div className="popover_title">會員升級</div>}
                  trigger="hover"
                >
                  <div>你的點數：{rank.point}點</div>
                  <div>累積購買金額：${rank.acc_total}</div>
                </Popover>
              </Divider>
            </PageHeader>
          </React.Fragment>
        );
      })}

      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Card
              className="rowCard"
              title={<h3 className="dsCardTitle">14天內預定行程</h3>}
              bordered={false}
            >
              <List
                itemLayout="horizontal"
                dataSource={itiData}
                renderItem={(item) => (
                  <Link to={`/orderDetails/${item.CAMPID}`}>
                    <div className="campOrder3">
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <div className="circleDate">
                              <div className="month3">
                                {item.orderdate_start.split("-")[1]}
                              </div>
                              <div className="date3">
                                {item.orderdate_start.split("-")[2]}
                              </div>
                            </div>
                          } //Date symbol?
                          title={
                            <Link
                              className="campOrder3title"
                              to={`/orderDetails/${item.CAMPID}`}
                            >
                              {item.camp_name}
                            </Link>
                          } //linkTo
                          description={`地址: ${item.camp_add}`}
                        />
                      </List.Item>
                    </div>
                  </Link>
                )}
              />
              ,
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Card
              className="rowCard"
              title={<h3 className="dsCardTitle">到貨提醒</h3>}
              bordered={false}
            >
              <List
                itemLayout="horizontal"
                dataSource={purData}
                renderItem={(item) => (
                  <div className="campOrder3">
                    <List.Item key={item.POId}>
                      <List.Item.Meta
                        avatar={
                          <div className="circleDate">
                            <div className="month3">
                              {item.delivery_time.split("-")[1]}
                            </div>
                            <div className="date3">
                              {item.delivery_time.split("-")[2]}
                            </div>
                          </div>
                        }
                        title={`訂單${item.POId}即將寄出`} //linkTo
                        description={`購買品項: ${item.product_name}*${item.quantity}...等`}
                      />
                    </List.Item>
                  </div>
                )}
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Card
              className="rowCard"
              title={<h3 className="dsCardTitle">待用Coupon</h3>}
              bordered={false}
              actions={[
                <Button type="primary" onClick={() => setCouponVisible(true)}>
                  查看所有coupon
                </Button>,
              ]}
            >
              {couponData && couponData.length >= 3 && couponData.length > 0 ? (
                <>
                  <div className="pastdueAlert">
                    <NotificationFilled className="blink_me" />
                    您有Coupon即將到期！請盡速使用！
                  </div>
                </>
              ) : (
                ""
              )}
              <CouponList couponData={couponData} />
            </Card>
          </Col>
        </Row>
      </div>

      <AllCouponList
        setCouponVisible={setCouponVisible}
        allCouponData={allCouponData}
        couponVisible={couponVisible}
      />
    </>
  );
};

export default DashBoard;
