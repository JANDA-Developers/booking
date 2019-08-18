import React, {Fragment, useEffect} from "react";
import ImageUploader from "../../../../atoms/imageUploader/ImageUploader";
import {useImageUploader, IuseImageUploader} from "../../../../actions/hook";
import InputText from "../../../../atoms/forms/inputText/InputText";
import JDbox from "../../../../atoms/box/JDbox";
import JDIcon from "../../../../atoms/icons/Icons";
import {getHManual_GetHManual_houseManual_menus} from "../../../../types/api";

interface IProps {
  onChangeFile: (url: string) => void;
  host?: {
    setEnableLngList: any;
    setMenuData: React.Dispatch<
      React.SetStateAction<getHManual_GetHManual_houseManual_menus[]>
    >;
    bgImageHook: IuseImageUploader;
    setMainTitle: React.Dispatch<string>;
  };
  menu: getHManual_GetHManual_houseManual_menus;
  menuData: any;
}

const HouseMenualMenu: React.FC<IProps> = ({
  onChangeFile,
  menuData,
  host,
  menu
}) => {
  //   onChangeFile;
  const sharedPart = () => (
    <div className="houseMenual__menuTitle">{menu.name}</div>
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
      <ImageUploader coverImg minHeight="150px" {...imageUploaderHook} />
      <InputText
        onChange={value => {
          menu.content = value;
          host.setMenuData([...menuData]);
        }}
        autoHeight
        value={menu.content}
        placeholder="메뉴에대한 숙소 설명을 적어보세요."
        textarea
      />
    </Fragment>
  );
};

export default HouseMenualMenu;
