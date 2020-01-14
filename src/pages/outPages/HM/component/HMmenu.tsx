import React, { Fragment, useEffect } from "react";
import ImageUploader from "../../../../atoms/imageUploader/ImageUploader";
import {
  useImageUploader,
  IuseImageUploader,
  LANG
} from "../../../../hooks/hook";
import InputText from "../../../../atoms/forms/inputText/InputText";
import { getHM_GetHM_HM_menus } from "../../../../types/api";
import { Language } from "../../../../types/enum";
import { DEFAULT_FILE } from "../../../../types/defaults";
import JDVideo from "../../../../atoms/video/Video";
import JDLabel from "../../../../atoms/label/JDLabel";

export interface IHMmenuPropsChain {
  host?: {
    setEnableLngList: any;
    setMenuData: React.Dispatch<React.SetStateAction<getHM_GetHM_HM_menus[]>>;
    bgImageHook: IuseImageUploader;
    setTitle: React.Dispatch<string>;
  };
}

interface IProps extends IHMmenuPropsChain {
  menu: getHM_GetHM_HM_menus;
  menuData: getHM_GetHM_HM_menus[];
  currentLang: Language;
}

const MenuContent: React.FC<IProps> = ({
  menuData,
  currentLang,
  host,
  menu
}) => {
  const imageUploaderHook = useImageUploader(menu.img, undefined, file => {
    if (host) {
      menu.img = file;
      host.setMenuData([...menuData]);
    }
  });
  const { file } = imageUploaderHook;
  const { url, mimeType } = file || DEFAULT_FILE;
  const isVideo = mimeType.includes("video");

  const sharedPart = () => (
    <div className="HM__inMenuTitle">{menu.name[currentLang]}</div>
  );

  if (host) {
    return (
      <Fragment>
        {sharedPart()}
        <JDLabel txt={LANG("info_img")} />
        <ImageUploader
          className="TMenuImgUploader"
          mode="input"
          minHeight="100px"
          {...imageUploaderHook}
        />
        <InputText
          className="TMenuInfoTxt"
          label={LANG("info_txt")}
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
  }

  return (
    <Fragment>
      {sharedPart()}
      {isVideo ? (
        <JDVideo width="100%" height="auto" controls url={url} />
      ) : (
        <img src={menu.img?.url || ""} alt="" />
      )}
      <p>{menu.content[currentLang]}</p>
    </Fragment>
  );
};

export default MenuContent;
