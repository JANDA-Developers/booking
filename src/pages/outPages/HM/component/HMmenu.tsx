import React, {Fragment, useEffect} from "react";
import ImageUploader from "../../../../atoms/imageUploader/ImageUploader";
import {
  useImageUploader,
  IuseImageUploader,
  LANG
} from "../../../../hooks/hook";
import InputText from "../../../../atoms/forms/inputText/InputText";
import {getHM_GetHM_HM_menus} from "../../../../types/api";
import {Language} from "../../../../types/enum";

interface IProps {
  onChangeFile: (url: string) => void;
  host?: {
    setEnableLngList: any;
    setMenuData: React.Dispatch<React.SetStateAction<getHM_GetHM_HM_menus[]>>;
    bgImageHook: IuseImageUploader;
    setTitle: React.Dispatch<string>;
  };
  menu: getHM_GetHM_HM_menus;
  menuData: any;
  currentLang: Language;
}

const HMmenu: React.FC<IProps> = ({
  onChangeFile,
  menuData,
  currentLang,
  host,
  menu
}) => {
  //   onChangeFile;
  const sharedPart = () => (
    <div className="HM__menuTitle">{menu.name[currentLang]}</div>
  );
  const imageUploaderHook = useImageUploader(menu.img);

  useEffect(() => {
    onChangeFile(imageUploaderHook.fileUrl);
  }, [imageUploaderHook.fileUrl]);

  return !host ? (
    <Fragment>
      {sharedPart()}
      <img src={imageUploaderHook.fileUrl} alt="" />
      <p>{menu.content[currentLang]}</p>
    </Fragment>
  ) : (
    <Fragment>
      {sharedPart()}
      <ImageUploader coverImg minHeight="150px" {...imageUploaderHook} />
      <InputText
        onChange={value => {
          menu.content[currentLang] = value;
          host.setMenuData([...menuData]);
        }}
        autoHeight
        value={menu.content[currentLang]}
        placeholder={LANG("write_a_description_of_the_menu")}
        textarea
      />
    </Fragment>
  );
};

export default HMmenu;
