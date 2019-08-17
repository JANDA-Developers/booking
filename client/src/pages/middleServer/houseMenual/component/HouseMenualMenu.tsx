import React, {Fragment, useEffect} from "react";
import ImageUploader from "../../../../atoms/imageUploader/ImageUploader";
import {useImageUploader} from "../../../../actions/hook";
import InputText from "../../../../atoms/forms/inputText/InputText";
import JDbox from "../../../../atoms/box/JDbox";
import JDIcon from "../../../../atoms/icons/Icons";

interface IProps {
  onChangeFile: (url: string) => void;
  host?: any;
  onChnageText?: any;
  menu?: any;
  menuData: any;
}

const HouseMenualMenu: React.FC<IProps> = ({
  onChangeFile,
  onChnageText,
  menuData,
  host,
  menu
}) => {
  //   onChangeFile;
  const sharedPart = () => (
    <div className="houseMenual__menuTitle">{menu.title}</div>
  );
  const imageUploaderHook = useImageUploader(menu.img);

  useEffect(() => {
    onChangeFile(imageUploaderHook.fileUrl);
  }, [imageUploaderHook.fileUrl]);

  return !host ? (
    <Fragment>
      {sharedPart()}
      <img src={imageUploaderHook.fileUrl} alt="" />
      <p>{menu.content}</p>
    </Fragment>
  ) : (
    <Fragment>
      {sharedPart()}
      <ImageUploader coverImg minHeight="200px" {...imageUploaderHook} />
      <InputText
        onChange={value => {
          menu.content = value;
          host.setMenuData([...menuData]);
        }}
        value={menu.content}
        placeholder="메뉴에대한 숙소 설명을 적어보세요."
        textarea
      />
    </Fragment>
  );
};

export default HouseMenualMenu;
