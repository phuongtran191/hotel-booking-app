import { Button, Upload } from "antd";
import { uploadImage } from "fb";
import React, { useState } from "react";

function UserProfile(props) {

  const [fileList, setFileList] = useState([]);
  const [listImg, setListImage] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
 
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  const handleUpload = () => {

    fileList.forEach((image) => {
      const url= uploadImage(image);
      setListImage([...listImg,url]);

    });
  };
  return (
    <div>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 5 && "+ Upload"}
      </Upload>
      <Button onClick={handleUpload}>Upload all</Button>
    </div>
  );
}
export default UserProfile;
