import { Rate } from "antd";
import React from "react";


const desc = ["有點糟", "還可以", "普通", "滿意", "太棒啦!"];

const Rater = ({ starValue, setStarValue }) => {
  const handleStarChange = (starValue) => {
    setStarValue(starValue);
  };
  return (
    <>
      <span>
        <Rate onChange={handleStarChange} value={starValue} />
        {starValue ? (
          <span className="ant-rate-text">{desc[starValue - 1]}</span>
        ) : (
          ""
        )}
      </span>
    </>
  );
};
    



//   render() {
//     const { value } = this.state;
//     return (
      
//     );
//   }
// }

export default Rater
