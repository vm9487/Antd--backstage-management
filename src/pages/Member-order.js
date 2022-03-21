import { Select, Typography, Divider, Tabs,BackTop } from "antd";

import React from "react";
import { useState, useEffect } from "react";
import { API_URL } from "../utils/config";
import axios from "axios";
import "antd/dist/antd.less";
import CampOrder from "../comp/CampOrder";
import ProductOrder from "../comp/ProductOrder";
const { Option } = Select;
const { Title } = Typography;

// ---------------for Tabs---------------
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}
// ---------------for Tabs end---------------

const MemberOrder = ({ setSelectedKey }) => {
  const [data, setData] = useState([]);
  async function getAllPO() {
    try {
      let response = await axios.post(`${API_URL}/campAllPO`, data, {
        // 為了跨源存取 cookie
        withCredentials: true,
      });
      console.log(response.data[0]);
      // console.log(response.data[0].id);
      setData(response.data[0]);
    } catch (e) {
      console.error("error");
    }
  }

  useEffect(() => {
    getAllPO();
  }, []);

  return (
    <>
      <Divider style={{ marginBottom: 60 }}>
        <Title
          id="titleTest"
          level={3}
          style={{
            marginBottom: 0,
            marginTop: 10,
          }}
        >
          訂單資料
        </Title>
      </Divider>
      {/*---------------for Tabs--------------- */}
      <Tabs onChange={callback} type="card">
        <TabPane tab="營地訂單" key="1">
          <div className="tabbottom">
            <CampOrder data={data} />
          </div>
        </TabPane>
        <TabPane tab="商品訂單" key="2">
          <div className="tabbottom">
            <CampOrder data={data} />
          </div>
        </TabPane>
      </Tabs>
      {/*---------------Tabs end--------------- */}
    </>
  );
};

export default MemberOrder;
