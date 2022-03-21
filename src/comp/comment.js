import { Comment, Avatar, Form, Button, List, Input } from "antd";
import React from "react";
import { useState, useEffect } from "react";
const { TextArea } = Input;

const InputComment = ({ value, setValue }) => {
  const handleSubmit = () => {
    if (!value) {
      return;
    }
    setTimeout(() => {
      setValue("");
    }, 1000);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    console.log(value);
  };

  return (
    <>
      <Comment
        content={
          <Form.Item>
            <TextArea
              name="commentByUser"
              rows={4}
              onChange={handleChange}
              value={value}
              showCount
              required
              maxLength={250}
            />
          </Form.Item>
        }
      />
    </>
  );
};

export default InputComment;
