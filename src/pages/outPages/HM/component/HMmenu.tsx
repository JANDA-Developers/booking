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
import {DEFAULT_FILE} from "../../../../types/defaults";
import JDVideo from "../../../../atoms/video/Video";
import {JdFile} from "../../../../types/interface";

interface IProps {
  onChangeFile: (file?: JdFile | null) => void;
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
    onChangeFile(imageUploaderHook.file);
  }, [imageUploaderHook.file]);

  const {file} = imageUploaderHook;
  const {url, mimeType} = file || DEFAULT_FILE;
  const isVideo = mimeType.includes("video");
  const isImg = mimeType.includes("image");

  return !host ? (
    <Fragment>
      {sharedPart()}
      {isVideo ? (
        <JDVideo width="100%" height="auto" controls url={url} />
      ) : (
        <img
          src={imageUploaderHook.file ? imageUploaderHook.file.url : ""}
          alt=""
        />
      )}
      <p>{menu.content[currentLang]}</p>
    </Fragment>
  ) : (
    <Fragment>
      {sharedPart()}
      <ImageUploader
        autoHeight
        coverImg
        minHeight="150px"
        {...imageUploaderHook}
      />
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
