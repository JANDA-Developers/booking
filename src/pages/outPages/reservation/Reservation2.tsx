import React, { useEffect } from "react";
import ResvModule from "@janda-com/resv-module";
import { RouteComponentProps } from "react-router-dom";
import "../../../../node_modules/@janda-com/resv-module/dist/RC.css";
import PageHeader from "../../../components/pageHeader/PageHeader";
import PageBody from "../../../components/pageBody/PageBody";
import JDcolorPicker from "../../../atoms/colorPicker/ColorPicker";
import { useColorPicker, useModal } from "../../../hooks/hook";
import JDIcon from "../../../atoms/icons/Icons";
import "./Reservation2.scss";
import { JDmodal, JDlabel, JDbutton } from "@janda-com/front";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  getHouseTag,
  addHouseTags,
  addHouseTagsVariables
} from "../../../types/api";
import { ADD_HOUSE_TAGS, GET_HOUSE_TAGS } from "../../../apollo/queries";
import { queryDataFormater, onCompletedMessage } from "../../../utils/utils";
import client from "../../../apollo/apolloClient";

interface ICheckParams {
  houseKey: string;
  houseId: string;
}

interface IProp extends RouteComponentProps<ICheckParams> {
  leisure?: boolean;
}

export const Reservation2: React.FC<IProp> = ({ match, leisure }) => {
  const { params } = match;
  const { houseKey, houseId } = params;
  if (!houseId && sessionStorage.getItem("jwt"))
    throw Error("permission denial");

  const { data, loading: getHouseTagLoading } = useQuery<getHouseTag>(
    GET_HOUSE_TAGS,
    {
      client
    }
  );
  const tagData = queryDataFormater(
    data,
    "GetHouseForPublic",
    "house",
    undefined
  );
  const defaultPrimaryColor =
    tagData?.tags.find(t => t.key === "--primary-color")?.value || null;

  const colorPickerHook = useColorPicker(defaultPrimaryColor);
  const customModalHook = useModal();
  localStorage.setItem("hk", houseKey);

  // ADD 태그로 변경
  const [addTagsMu, { loading }] = useMutation<
    addHouseTags,
    addHouseTagsVariables
  >(ADD_HOUSE_TAGS, {
    client,
    variables: {
      houseId,
      tags: [
        {
          key: "--primary-color",
          value: colorPickerHook.color
        }
      ]
    },
    onCompleted: ({ AddHouseTags }) => {
      onCompletedMessage(AddHouseTags, "변경완료", "변경실패");
    }
  });

  const handleSaveCustom = () => {
    if (!loading) addTagsMu();
  };

  //설정 프로세스는 내부로 옴기자
  const themProvider = document
    .getElementsByClassName("themeProvider")
    .item(0) as HTMLElement;

  useEffect(() => {
    colorPickerHook.setColor(defaultPrimaryColor || "ffffff");
  }, [getHouseTagLoading]);

  if (themProvider) {
    themProvider.style.setProperty(
      "--primary-color-dark",
      colorPickerHook.color
    );
    themProvider.style.setProperty("--primary-color", colorPickerHook.color);
  }

  if (houseId) {
    return (
      <div id="RESV2" className="reservation2">
        <PageHeader
          title={"JD 예약페이지 2.0"}
          desc={"해당 예약페이지를 홈페이지에 부착 할수 있습니다."}
        />
        <PageBody></PageBody>
        <JDmodal
          foot={
            <div>
              <JDbutton
                mode="flat"
                onClick={handleSaveCustom}
                thema="primary"
                label="저장"
              />
              <JDbutton
                mode="flat"
                onClick={customModalHook.closeModal}
                label="닫기"
              />
            </div>
          }
          visibleOverflow
          head={{
            title: "예약페이지 커스텀"
          }}
          {...customModalHook}
        >
          <div>
            <div>
              <JDlabel component="div" txt="대표색상" />
            </div>
            <JDcolorPicker colorHook={colorPickerHook} />
          </div>
        </JDmodal>
        <div
          onClick={() => {
            customModalHook.openModal();
          }}
          className="reservation2__config"
        >
          <JDIcon size="large" icon="paint" />
        </div>
      </div>
    );
  }

  return <ResvModule publickey={houseKey} />;
};

export default Reservation2;
