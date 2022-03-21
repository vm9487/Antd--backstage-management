import { Modal,} from "antd";
import React from 'react';

const HeadPic = ({
  picModalvisible,
  confirmPicLoading,
  handlePicOk,
  handlePicCancel,
  onFotoClick,
}) => {
  return (
    <React.Fragment>
      <Modal
        className='picModal'
        title="更換大頭貼"
        visible={picModalvisible}
        onOk={handlePicOk}
        confirmLoading={confirmPicLoading}
        onCancel={handlePicCancel}
      >
        <input
          type="file"
          id="photo"
          name="photo"
          onChange={(e) => {
            onFotoClick(e);
          }}
        />
        限定格式: .jpg, .jpeg 或 .png
      </Modal>
    </React.Fragment>
  );
};

export default HeadPic;
