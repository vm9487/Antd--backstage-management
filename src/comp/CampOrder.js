import React from "react";
import { List} from "antd";
import { Link } from "react-router-dom";
import "../App.less";
import "../style/campOrder.less";
import { IMAGE_URL } from "../utils/config";





const CampOrder = ({data}) => {
  //-----for thumbnail-------------
  const tagWords = {
    1: "主打",
    2: "促銷",
  };
  const tagcolor = {
    1: "tagStar",
    2: "tag",
  };
  const orderStatus = {
    1: "未付款",
    2: "待出發",
    3: "已取消",
    4: "已出發",
  };
  const orderStatuscolor = {
    1: "statusTagTBD1",
    2: "statusTagDone1",
    3: "statusTagCancel1",
    4: "statusTagPODone1",
  };

  return (
    //TODO: MEJOR- filter
    <List
    
      size="small"
      itemLayout="horizontal"
      dataSource={data}
      pagination={{
        position: "bottom",
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 10,
      }}
      renderItem={(data) => (
        <Link to={`/orderDetails/${data.id}`}>
          <div className="list">
            <List.Item
              actions={[]}
              key={data.id}
              //   extra={          }
            >
              <List.Item.Meta
                title={
                  <div>
                    <div className={orderStatuscolor[data.orderstatus_id]}>
                      {orderStatus[data.orderstatus_id]}
                    </div>
                    <a className="campTitle" href={data.href}>
                      {data.camp_name}
                    </a>
                  </div>
                }
                description={
                  <>
                    <span className="campdate">{data.orderdate_start}</span>~
                    <span className="campdate">{data.orderdate_end}</span>
                    <br />
                    <span className="campdate">{data.camp_county}</span>
                    <div className="orderlinkbox">
                      
                      <Link to={`/orderDetails/${data.id}`}>
                        <button className="orderlinks" key="list-loadmore-edit">
                          訂單詳細
                        </button>
                      </Link>
                    </div>
                  </>
                }
              />

              {/* --------------pic-------------------- */}
              <div className="orderPicBox">
                <div className="tagWord">{tagWords[data.orderstatus_id]}</div>
                <div className={tagcolor[data.orderstatus_id]}></div>
                <div className="list_item">
                  <img
                    className="pic"
                    src={`${IMAGE_URL}/images/${data.img1}`}
                    
                    alt="camp-pic"
                  />
                </div>
              </div>
              {/* ----------------------------- */}
            </List.Item>
          </div>
        </Link>
      )}
    />
  );
};
export default CampOrder;
