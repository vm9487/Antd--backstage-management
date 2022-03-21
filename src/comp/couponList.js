import React, { useRef, createRef } from "react";
import { List, Input, Button, Tooltip } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import "../App.less";
import "../style/coupon.less";

const CouponList = ({ couponData }) => {
  const color = {
    100: "couponValue",
    200: "couponValue",
    300: "tres",
    400: "tres",
    500: "cinco",
    1000: "cinco",
  };

  const linkRef = useRef([]);

  const copyCoupon = (i) => {
    linkRef.current[i].select();
    document.execCommand("copy", true);
  };
  return (
    <List
      className="couponOuter"
      split={false}
      itemLayout="horizontal"
      dataSource={couponData}
      renderItem={(couponData,i) => (
        <List.Item className="couponlist" key={couponData.id}>
          <List.Item.Meta
            className="couponMeta"
            title={
              <div className={color[couponData.discount]}>
                ${couponData.discount}
                <br />
                折價券
              </div>
            }
            //description={"ttttttt"}
          />
          <div className="couponContainer">
            <div className="couponDue">{couponData.pastdue_date}到期</div>

            <Input.Group compact>
              <Input
                key={couponData.id}
                style={{ width: "calc(100% - 3em)", margin: "0 0 0 0.2em" }}
                defaultValue={couponData.promo_code}
                // ref={linkRef}
                ref={(elem) => (linkRef.current[i] = elem)}
                readOnly
              />
              <Tooltip title="點擊複製">
                <Button icon={<CopyOutlined />} onClick={(e) => copyCoupon(i)} />
              </Tooltip>
            </Input.Group>
          </div>

          <br />
        </List.Item>
      )}
    />
  );
};
export default CouponList;
