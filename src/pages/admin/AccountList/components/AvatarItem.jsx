import { Image } from 'antd';
import React from 'react';

const AvatarItem = (props) => {
  const { avatar, value } = props;
  let src = "";
  if (avatar !== undefined) {
    src = avatar[0];
  } else {
    src = "https://live.staticflickr.com/65535/51491000497_fbf6f88611_m.jpg";
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Image className="avatar" width={40}
        src={src}
        style={{ borderRadius: "50%" }}
      />

      <p style={{ paddingLeft: "1rem" }}>{value}</p>
    </div>
  );
}

export default AvatarItem;