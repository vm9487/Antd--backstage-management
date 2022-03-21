import React, { useRef } from "react";
import { List, Input, Button, Tooltip,Modal,} from "antd";
import { CopyOutlined } from "@ant-design/icons";
import "../App.less";
import "../style/coupon.less";

const AllCouponList = ({ allCouponData,couponVisible,setCouponVisible }) => {
  const color = {
    100: "couponValue1",
    200: "couponValue1",
    300: "tres1",
    400: "tres1",
    500: "cinco1",
    1000: "cinco1",
  };

  const linkRef2 = useRef([]);

  const copyCoupon2 = (i) => {
    linkRef2.current[i].select();
    document.execCommand("copy", true);
  };
  return (
    <Modal
      title="你的coupon"
      centered
      visible={couponVisible}
      cancelText={"關閉"}
      onOk={() => setCouponVisible(false)}
      width={1000}
      closable={false}
      cancelButtonProps={{ type: "text", hidden: true }}
    >
      <List
        grid={{ gutter: 16, column: 3 }}
        className="AllcouponOuter"
        split={false}
        itemLayout="horizontal"
        dataSource={allCouponData}
        renderItem={(allCouponData, i) => (
          <List.Item className="couponlist" key={allCouponData.id}>
            <List.Item.Meta
              className="couponMeta"
              title={
                <div className={color[allCouponData.discount]}>
                  ${allCouponData.discount}
                  折價券
                </div>
              }
              //description={"ttttttt"}
            />
            <div className="couponContainer">
              <div className="couponDue">{allCouponData.pastdue_date}到期</div>

              <Input.Group compact>
                <Input
                  key={allCouponData.id}
                  style={{ width: "calc(100% - 3em)", margin: "0 0 0 0.2em" }}
                  defaultValue={allCouponData.promo_code}
                  ref={(elem) => (linkRef2.current[i] = elem)}
                  readOnly
                />
                <Tooltip title="點擊複製">
                  <Button
                    icon={<CopyOutlined />}
                    onClick={(e) => copyCoupon2(i)}
                  />
                </Tooltip>
              </Input.Group>
            </div>

            <br />
          </List.Item>
        )}
      />
    </Modal>
  );
};
export default AllCouponList;
