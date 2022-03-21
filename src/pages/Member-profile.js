import {
  Form,
  Select,
  Button,
  Typography,
  Space,
  Divider,
  Input,
  DatePicker,
  Spin,
  message,
  BackTop,
} from "antd";

import React, { useRef } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { API_URL } from "../utils/config";
import { useForm } from "react-hook-form";
import "antd/dist/antd.less";
import "../style/member-profile.less";
const { Option } = Select;
const { Title } = Typography;

//-------表格RWD縮放---------------------
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
    lg: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
    lg: {
      span: 8,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
    lg: {
      span: 8,
    },
  },
};

const MemberProfile = ({ logData }) => {
  //------------------------------------------------
  const [form] = Form.useForm();
  //-----後端連線----得到資料----------------------------------
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  let getMemberInfo = async () => {
    try {
      let res = await axios.post(`${API_URL}/memberInfo`, [], {
        withCredentials: true,
      });
      setData(res.data[0]);
      setLoading(false);
      // console.log(res.data[0]);
    } catch (e) {
      console.error("error");
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getMemberInfo();
    }, 1500);
  }, []);
  //---------------------------------------------------------------------------

  //---表格變更---------------------------------------------------------------------
  function getFormData(value) {
    console.log("formData:", form.getFieldValue());
  }

  //---reset表格
  function resetBtn(e) {
    form.resetFields();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    return;
  }
  //---表格送出---------------------------------------------------------------------

  const onFinish = (fieldsValue) => {
    let data = form.getFieldValue();
    console.log(data);
    // Should format date value before submit.
    const values = {
      ...data,
      datePicker1: moment(fieldsValue["datePicker"]).format("YYYY-MM-DD"),
    };
    console.log(values);

    // e.preventDefault();
    async function test() {
      try {
        let response = await axios.post(`${API_URL}/memberInfo1`, data, {
          // 為了跨源存取 cookie
          withCredentials: true,
        });
        console.log(response.data);
        success();
      } catch (e) {
        message.error("更新失敗，請稍後嘗試");
        console.log("error");
      }
    }
    test();
  };
  //----------------------------

  //-------------------------------
  function success() {
    const suc = message.success("更新成功");
    setTimeout(suc, 7000);
  }

  //----------日期相關---------------------------------------------------------
  const config = {
    rules: [
      {
        type: "object",
        required: true,
        message: "請選擇日期",
      },
    ],
  };

  return (
    <>
      {loading ? (
        <Spin className="spinner" />
      ) : (
        <>
          <Divider style={{ marginBottom: 60 }}>
            <Title
              id="titleTest2"
              level={3}
              style={{
                marginBottom: 0,
                marginTop: 10,
              }}
            >
              會員資料
            </Title>
          </Divider>

          {data.map((member) => {
            return (
              <Form
                className="memberFormBottom"
                {...formItemLayout}
                form={form}
                onFinish={onFinish}
                key={member.id}
                initialValues={{
                  email: member.user_name,
                  name: member.name,
                  gender: member.gender,
                  //日期TBD
                  datePicker: moment(`${member.bday}`, "YYYY-MM-DD"),
                  phone: member.phone,
                  address: member.address,
                }}
              >
                <Form.Item
                  name={"name"}
                  label="名字"
                  rules={[
                    {
                      required: true,
                      message: "請輸入姓名",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="您的信箱"
                  rules={[
                    {
                      type: "email",
                      message: "這不是正確的信箱格式",
                    },
                    {
                      required: true,
                      message: "請輸入你的信箱",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="您的密碼"
                  rules={[
                    {
                      validator: async (_, password) => {
                        if (
                          password &&
                          !/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,16}$/.test(
                            password
                          )
                        ) {
                          return Promise.reject(
                            new Error(
                              "密碼為數字，小寫字母，大寫字母，特殊符號 至少包含三種，長度為 8 - 16位"
                            )
                          );
                        }
                      },
                    },
                    {
                      required: true,
                      message: "請輸入你的密碼",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  label="再次輸入密碼"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "請確認你的密碼",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("密碼不相同，請確認"));
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="gender"
                  label="性別"
                  rules={[
                    {
                      required: true,
                      message: "請選擇性別",
                    },
                  ]}
                >
                  <Select placeholder="請選擇" allowClear>
                    <Option value="1">男</Option>
                    <Option value="0">女</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="datePicker" label="您的生日" {...config}>
                  <DatePicker />
                </Form.Item>
                {/* //TODO: MEJOR-手機號碼沒有前端驗證 */}
                <Form.Item
                  name="phone"
                  label="手機號碼"
                  rules={[{ required: true, message: "請輸入手機號碼" }]}
                >
                  <Input style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item label="地址">
                  <Form.Item
                    name="address"
                    rules={[{ required: true, message: "請填寫地址" }]}
                  >
                    <Input
                      style={{
                        width: "100%",
                      }}
                      placeholder="請填寫地址"
                    />
                  </Form.Item>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                  <Space>
                    <Button type="primary" htmlType="submit">
                      送出
                    </Button>
                    <Button onClick={resetBtn}>取消</Button>
                    {/* <Button onClick={getFormData}>get</Button> */}
                  </Space>
                </Form.Item>
              </Form>
            );
          })}
        </>
      )}
    </>
  );
};

export default MemberProfile;
