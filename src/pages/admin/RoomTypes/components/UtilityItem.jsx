import { Tag } from 'antd';
import React from 'react';


const UtilityItem = (props) => {
  const { value } = props;
  const UTILITY_COLORS = {
    "wifi": "green",
    "bed": "gold",
    "roomSize": "cyan",
    "view": "blue",
    "smoking": "red",
    "shower": "purple",
  };

  return (
    <div style={{ display: "flex", width: 200, flexWrap: "wrap" }}>
      {value.map((item, index) => (
        <Tag
          style={{ marginTop: ".7rem" }}
          key={`item-${index}`}
          color={UTILITY_COLORS[Object.keys(item)]}
        >
          {item[Object.keys(item)]}
        </Tag>
      ))}
    </div>
  );
}

export default UtilityItem;
