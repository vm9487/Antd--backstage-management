import React from "react";
import {
  Divider,
  Typography,
  Card,
  List,
  Modal,
  Button,
  Input,
  message,
  Avatar,
  Rate,
} from "antd";
import "../style/campOrderDetail.less";
import "antd/dist/antd.less";
import Rater from "./star";
import InputComment from "./comment";
import { useState, useEffect, useRef } from "react";
import { API_URL } from "../utils/config";
import { ERR_MSG } from "../utils/error";
// import {commentOnPop} from "./CommentOnCampop"
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { IMAGE_URL } from "../utils/config";
const { Title } = Typography;
const style = { background: "#e9e3da", padding: "8px 0" };
const { Meta } = Card;
const { TextArea } = Input;

const OrderDetails12 = ({ ppl, tent, act, data, setPOStatus, setPOStatusWord }) => {
  const [loading, setloading] = useState(false);
  const [visible, setvisible] = useState(false); //write comment modal
  const [visible1, setvisible1] = useState(false); //cancel
  const [visible2, setvisible2] = useState(false); //existed comment
  const [visible3, setvisible3] = useState(true); //see comment btn
  const [visible4, setvisible4] = useState(true); //write comment btn
  const [Cbtn, setCbtn] = useState(false);
  const [Combtn, setCombtn] = useState(false);
  const [starValue, setStarValue] = useState("3");
  const [value, setValue] = useState([]); //camp_comment
  const [existedComment, setExistedComment] = useState([]); //Existed camp_comment

  // if (tent[0] !== undefined && ppl.length !== 0 && act.length !== 0) {
  //   console.log("tent.price", tent[0].price * tent[0].tent_qty);
  //   console.log("OK");

  // } else {
  // }

  //--------------handle BTN 區域----------------------
  const handleOk = (e) => {
    if (!value) {
      return;
    }
    setloading(true);

    setTimeout(() => {
      setValue("");
      setloading(false);
      setvisible(false);
      ratePO();
      setvisible3(false);
    
      
      //TODO: MEJOR-看要不要可以編輯評論 或追加評論
    }, 1500);
  };
  const handleOkCANCEL = (e) => {
    setloading(true);

    setTimeout(() => {
      setloading(false);
      setvisible1(false);
      setCbtn(true);
      setCombtn(true);
      changePOtoCancelBE();
      setPOStatus("3");
      setPOStatusWord("已取消");
    }, 1500);
  };
  //------------------------------------------------
  // 為了抓網址變數

  const { POId } = useParams();
  // console.log(`POId: ${POId}`);

  //---------backend----cancelPO----------------------

  async function changePOtoCancelBE() {
    // e.preventDefault();
    try {
      let response = await axios.post(
        `${API_URL}/cancelPO/`,
        {
          POId: `${POId}`,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (e) {
      console.log("error");
    }
  }
  //---------backend----rate PO----------------------

  async function ratePO() {
    const campId = ppl[0].camp_id;
    console.log("campId", campId);
    try {
      let response = await axios.post(
        `${API_URL}/ratePO`,
        {
          campId: `${campId}`,
          POId: `${POId}`,
          starValue: `${starValue}`,
          camp_comment: `${value}`,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      message.success("成功送出!");
    } catch (e) {
      console.log("error");
      message.error("錯誤存在，請稍後再試");
    }
  }
  //---------backend----see PO----------------------

  async function seeRatePO() {
    console.log(`POId: ${POId}`);
    try {
      let response = await axios.get(`${API_URL}/seeRatePO/${POId}`, {
        withCredentials: true,
      });
      console.log("seeRatePO");
      console.log(response.data);
      setExistedComment(response.data);
    } catch (e) {
      console.log("error");
      message.error("錯誤存在，請稍後再試");
    }
  }
  useEffect(() => {
    seeRatePO();
  }, []);
  //---------------------------------------
  const seeRateAfter = () => {
    setvisible2(true);
    seeRatePO();
    setvisible4(false)
  }
  //----------------------------------------
  const [ttl, setTtl] = useState([]);
  //   const ref = useRef();
  //   const refact = useRef();
  //   const reftent = useRef();
  // console.log(reftent)

  //   const actTtl = refact.current?.innerText || "0"
  //   setTtl({ ...ttl, "actTtl": actTtl });
  //   const TentTtl = reftent.current?.innerText || "0";
  //   const disTtl = ref.current?.innerText || "0";
  // };
  // useEffect(() => {
  //   if (!reftent.current) {

  //   } else {
  //     const final = () => {
  //       for (var i = 0; i <= tent.length; i++) {
  //         const TentTtl = reftent.current[i]?.innerText;
  //         console.log(TentTtl);
  //       }
  //     };
  //     final();
  //   }
  // }, [act, tent, ppl]);
  // -----for thumbnail---------------------------------
  const tagWords = {
    1: "主打",
    2: "促銷",
  };
  const tagcolor = {
    1: "tagStar",
    2: "tag",
  };
  const orderStatuscolor = {
    1: "statusTagTBD",
    2: "statusTagDone",
    3: "statusTagCancel",
    4: "statusTagDone",
  };
  const orderStatus = {
    1: "未付款",
    2: "待出發",
    3: "已取消",
    4: "已出發",
  };

  return (
    <>
      <div style={style}>
        <Divider orientation="left">
          <div className="subtitle2">訂購人資訊</div>
        </Divider>
        <div className="btnclaster">
          <button
            disabled={
              Cbtn ||
              (data && data.length > 0 && data[0].orderstatus_id === 3) ||
              (data && data.length > 0 && data[0].orderstatus_id === 4)
            }
            className="orderlinks"
            onClick={() => setvisible1(true)}
          >
            取消訂單
          </button>
          {visible3 ? (
            <button
              disabled={
                Combtn ||
                (data && data.length > 0 && data[0].orderstatus_id === 3) ||
                (data && data.length > 0 && data[0].orderstatus_id === 2) ||
                (data && data.length > 0 && data[0].orderstatus_id === 1)
              }
              // className="orderlinks "
              className={
                existedComment && existedComment.length <= 0
                  ? "orderlinks"
                  : "orderlinks displayNone  "
              }
              onClick={() => setvisible(true)}
            >
              填寫評價
            </button>
          ) : (
            <button
              //className="orderlinks"
              className="orderlinks"
              onClick={() => seeRateAfter()}
            >
              你的評論
            </button>
          )}

          {visible4 ? (<button
            //className="orderlinks"
            className={
              (existedComment && existedComment.length > 0) ||
              (existedComment &&
                existedComment.length > 0 &&
                existedComment[0].orderstatus_id > 0)
                ? "orderlinks "
                : "orderlinks displayNone "
            }
            onClick={() => setvisible2(true)}
          >
            你的評論
          </button>) : ""}
          <button className="orderlinks">聯繫客服</button>
        </div>
        <div className="orderppl">
          <br />
          {ppl.map((item) => (
            <React.Fragment key={item.id}>
              <span className="subnote2">訂購人姓名:</span>
              <span className="subname2">{item.name}</span>
              <br />
              <span className="subnote2">訂購人電話:</span>

              <span className="subname2">{item.phone}</span>
              <br />
              <span className="subnote2">訂購人信箱:</span>
              <span className="subname2">{item.user_name}</span>
              <br />
            </React.Fragment>
          ))}
          <br />
        </div>
        <Divider orientation="left">
          <div className="subtitle2">訂單詳細資訊</div>
        </Divider>
        <br />
        {tent.map((item) => (
          <React.Fragment key={item.id}>
            <List itemLayout="vertical" size="small">
              <List.Item
                key={item.Tid}
                extra={
                  <img
                    width={250}
                    alt="logo"
                    src={`${IMAGE_URL}/images/${item.img}`}
                    // src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                }
              >
                <List.Item.Meta
                  title={
                    <>
                      <div className="subname3">{item.name}</div>
                    </>
                  }
                  description={
                    <>
                      <span className="subnote2">帳篷介紹</span> <br />
                      <span className="subname2">{item.intro}</span>
                      <br />
                      <span className="subnote2">帳篷類型</span> <br />
                      <span className="subname2">{item.tent_item}</span>
                      <br />
                      <span className="subnote2">帳篷數</span> <br />
                      <span className="subname2">{item.tent_qty}</span>
                    </>
                  }
                />
              </List.Item>
            </List>
          </React.Fragment>
        ))}
        {/* //----tent資訊--end--------------- */}
        <br />
        <Divider orientation="left">
          <div className="subtitleSub">加購活動</div>
        </Divider>
        <br />
        {/* //----加購資訊----------------- */}
        {act.map((item) => (
          <React.Fragment key={item.id}>
            <List className="" itemLayout="vertical" size="small">
              <List.Item
                key={item.id}
                extra={
                  <div className="extraPic">
                    <img
                      width={250}
                      height={150}
                      alt="logo"
                      src={`${IMAGE_URL}/images/${item.pic}`}
                      // src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                  </div>
                }
              >
                <List.Item.Meta
                  title={
                    <>
                      <div className="subname3">{item.name}</div>
                    </>
                  }
                  description={
                    <>
                      <span className="subnote2">活動描述</span> <br />
                      <span className="subname2">{item.intro}</span>
                      <br />
                      <span className="subnote2">加購人數</span> <br />
                      <span className="subname2">{item.number_people}</span>
                      <br />
                    </>
                  }
                />
              </List.Item>
            </List>
            {/* //----加購資訊--end--------------- */}
          </React.Fragment>
        ))}

        <Divider orientation="left">
          <div className="subtitleSub">訂單金額</div>
        </Divider>
        <br />
        {/* //----總金額資訊----------------- */}

        <div className="totalBlockEnd">
          <div className="totalItemBlock">
            {tent.map((item) => (
              <React.Fragment key={item.id}>
                <div className="totalItem">
                  {item.name}帳篷每晚單價(共{item.tent_qty}晚)
                </div>
              </React.Fragment>
            ))}
            {act.map((item) => (
              <React.Fragment key={item.id}>
                <div className="totalItem">
                  {item.name}(共{item.number_people}人)
                </div>
              </React.Fragment>
            ))}
            {ppl.map((item) => (
              <React.Fragment key={item.id}>
                {item.discount == null ? (
                  ""
                ) : (
                  <div className="totalItem">折扣碼</div>
                )}
              </React.Fragment>
            ))}

            <Divider />
            <div className="totalItemE">訂單總額</div>
          </div>

          <div className="totalmoney">
            {tent.map((item, i) => (
              <React.Fragment key={item.id}>
                <div
                  // ref={(ref) => {
                  //   reftent.current?.innerText || "0" = ref;
                  // }}
                  className="total"
                >{`${item.price * item.tent_qty}`}</div>
              </React.Fragment>
            ))}
            {act.map((item) => (
              <React.Fragment key={item.id}>
                <div
                  // ref={refact}
                  className="total"
                >{`${item.price * item.number_people}`}</div>
              </React.Fragment>
            ))}

            {ppl.map((item, i) => (
              <React.Fragment key={item.id}>
                {item.discount == null ? (
                  ""
                ) : (
                  <div
                    // ref={ref}
                    className="total"
                  >
                    -{item.discount}
                  </div>
                )}
                <Divider />
                <div className="totalE">{item.total}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* ------------MODAL FOR CANCEL----------------- */}
      <Modal
        visible={visible1}
        title="取消訂單"
        onCancel={() => setvisible1(false)}
        footer={[
          <Button key="back" onClick={() => setvisible1(false)}>
            返回
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => handleOkCANCEL()}
          >
            取消
          </Button>,
        ]}
      >
        <p>您確定要取消訂單嗎?此動作不可回復，若要訂購請重新下定。</p>
      </Modal>
      {/* --------------------------------- */}
      {/* ------------MODAL FOR COMMENT----------------- */}
      <Modal
        visible={visible}
        title="分享你的住宿心得吧!"
        //onCancel 這樣X跟點背景就會消失 不可以拿掉
        onCancel={() => setvisible(false)}
        footer={[
          <Button key="back" onClick={() => setvisible(false)}>
            返回
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => handleOk()}
          >
            送出
          </Button>,
        ]}
      >
        <Rater starValue={starValue} setStarValue={setStarValue} />
        <InputComment setValue={setValue} value={value} />
        <p>告訴別人為何喜歡這個營地吧!</p>
      </Modal>
      {/* --------------------------------- */}
      {/* ------------MODAL FOR Seeing COMMENT----------------- */}
      <Modal
        visible={visible2}
        title="你的心得"
        //onCancel 這樣X跟點背景就會消失 不可以拿掉
        onCancel={() => setvisible2(false)}
        footer={[
          <Button type="primary" key="back" onClick={() => setvisible2(false)}>
            返回
          </Button>,
          // <Button
          //   key="submit"
          //   type="primary"
          //   loading={loading}
          //   // onClick={}
          // >
          //   TODO:編輯
          // </Button>,
        ]}
      >
        {existedComment.map((item) => (
          <>
            <div className="flex-wrapper">
              <Avatar
                className="existed_rate_avatar "
                // src="https://joeschmoe.io/api/v1/random"
                src={`${IMAGE_URL}/images/${item.img}`}
              />
              <div className="existed_rate">
                <div className="existed_rate_time">{item.created_time}</div>
                <Rate
                  disabled
                  value={item.camp_stars}
                  //setStarValue={setStarValue}
                />
                <div>{item.camp_comment}</div>
              </div>
            </div>
          </>
        ))}
      </Modal>
      {/* --------------------------------- */}
    </>
  );
};;;;;

export default OrderDetails12;
