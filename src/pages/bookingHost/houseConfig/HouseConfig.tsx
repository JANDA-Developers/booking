import React, { useState, useRef, useEffect } from "react";
import "./HouseConfig.scss";
import { LANG, useInput, useSelect } from "../../../hooks/hook";
import PageBody from "../../../components/pageBody/PageBody";
import PageHeader from "../../../components/pageHeader/PageHeader";
import JDcard from "../../../atoms/cards/Card";
import CardSection from "../../../atoms/cards/components/CardSection";
import CardHeader from "../../../atoms/cards/components/CardHeader";
import Button from "../../../atoms/button/Button";
import InputText from "../../../atoms/forms/inputText/InputText";
import JDselect from "../../../atoms/forms/selectBox/SelectBox";
import { isMaxOver } from "../../../utils/inputValidations";
// @ts-ignore
import omitDeep from "omit-deep";
import {
  HOUSE_TYPE_OP,
  FLOATING_PRELOADER_SIZE,
  OPTIONAL_APPLY_PAYMETHOD
} from "../../../types/const";
import AddressSearcher from "./components/AddressSearcher";
import GoogleMap from "../createHouse/components/googleMap";
import { loadMap, getLocationFromMap, geoCode } from "../createHouse/mapHelper";
import EerrorProtect from "../../../utils/errProtect";
import Preloader from "../../../atoms/preloader/Preloader";
import { GoogleApiWrapper, ProvidedProps } from "google-maps-react";
import { IContext } from "../BookingHostRouter";
import { UpdateHouseInput } from "../../../types/api";
import optionFineder from "../../../utils/optionFinder";
import { string } from "prop-types";

let map: google.maps.Map | null = null;

interface IProps {
  updateHouseFn: (updateHouseInput: UpdateHouseInput) => void;
  context: IContext;
}

const HouseConfig: React.FC<IProps & ProvidedProps> = ({
  google,
  updateHouseFn,
  context
}) => {
  const { house } = context;
  const { name, houseType, location: defaultLocation } = house;
  const { address, addressDetail, lat, lng } = defaultLocation;
  const {
    bankAccountInfo: defaultBankAcountInfo,
    payMethods
  } = house.bookingPayInfo!;

  const [applyPayMethods, setApplyPayMethods] = useState(
    payMethods?.map(p => ({
      label: LANG(p),
      value: p
    }))
  );
  const [bankAccountInfo, setBankAccountInfo] = useState(
    defaultBankAcountInfo || {
      bankName: "",
      accountNum: "",
      accountHolder: ""
    }
  );
  const nameHook = useInput(name);
  const houseTypeHook = useSelect(optionFineder(HOUSE_TYPE_OP, houseType));
  const [location, setLocation] = useState({
    addressDetail,
    address,
    lat,
    lng
  });
  const mapRef = useRef(null);

  // 지도 드래그가 끝날때 좌표값을 받아서 저장함
  const handleDragEnd = async () => {
    if (!map) return;
    const { lat, lng, reversedAddress } = await getLocationFromMap(map);
    setLocation({ ...location, address: reversedAddress, lat, lng });
  };

  // 인풋서치 이후에 구글맵 위치를 변환
  const changeMapBySearch = async (value: string | null) => {
    if (!value || !map) return;
    const result = await geoCode(value);
    if (result === false) return;
    const { lat, lng } = result;

    setLocation({
      ...location,
      address: value,
      lat,
      lng
    });
    map.panTo({ lat, lng });
  };

  const handleOnFind = (value: string | null) => {
    changeMapBySearch(value);
  };

  const handleUpdateBtn = (updateFlag: "bankAccountInfo" | "basicInfo") => {
    if (updateFlag === "basicInfo") {
      updateHouseFn({
        houseId: house._id,
        updateParams: {
          location,
          name: name,
          houseType
        }
      });
    } else if (updateFlag === "bankAccountInfo") {
      updateHouseFn({
        houseId: house._id,
        updateParams: {
          bankAccountInfo: omitDeep(bankAccountInfo, ["__typename"]),
          bookingPayMethods: applyPayMethods?.map(op => op.value) || []
        }
      });
    }
  };

  useEffect(() => {
    map = loadMap(location.lat, location.lng, mapRef, google);
    if (!map) return;
    map.addListener("dragend", handleDragEnd);
  }, []);

  return (
    <div className="houseConfigWrap">
      <PageHeader desc={LANG("house_config_desc")} title={LANG("house_info")} />
      <PageBody>
        <JDcard>
          <CardHeader
            desc={LANG("basic_info_desc")}
            title={LANG("basic_info")}
            headerRgiht={
              <Button
                onClick={() => handleUpdateBtn("basicInfo")}
                mb="no"
                mode="flat"
                size="tiny"
                thema="point"
                label={LANG("save")}
              />
            }
          />
          <CardSection>
            <div className="flex-grid">
              <div className="flex-grid__col col--full-6 col--wmd-12">
                <InputText
                  {...nameHook}
                  id="HouseName"
                  validation={isMaxOver}
                  max={20}
                  placeholder={LANG("houseName")}
                  label={LANG("houseName")}
                />
              </div>
              <div className="flex-grid__col col--full-6 col--wmd-12">
                <JDselect
                  {...houseTypeHook}
                  id="HouseType"
                  options={HOUSE_TYPE_OP}
                  isOpen
                  label={LANG("select_house_type")}
                />
              </div>
            </div>
            <div className="flex-grid">
              <div className="flex-grid__col col--full-6 col--wmd-12">
                <AddressSearcher
                  onTypeChange={(s: string = "") => {
                    location.address = s;
                    setLocation({ ...location });
                  }}
                  address={location.address}
                  handleOnFind={handleOnFind}
                />
              </div>
              <div className="flex-grid__col col--full-6 col--wmd-12">
                <InputText
                  onChange={v => {
                    location.addressDetail = v;
                    setLocation({ ...location });
                  }}
                  value={location.addressDetail}
                  id="AddressDetail"
                  validation={isMaxOver}
                  max={50}
                  placeholder={LANG("detail_address")}
                  label={LANG("detail_address")}
                />
              </div>
            </div>
            <GoogleMap mapRef={mapRef} />
          </CardSection>
          <CardHeader
            desc={LANG("deposit_info_desc")}
            title={LANG("deposit_info")}
            headerRgiht={
              <Button
                onClick={() => handleUpdateBtn("bankAccountInfo")}
                mb="no"
                mode="flat"
                size="tiny"
                thema="point"
                label={LANG("save")}
              />
            }
          />
          <CardSection>
            <div className="flex-grid">
              <div className="flex-grid__col col--full-6 col--wmd-12">
                <InputText
                  onChange={v => {
                    setBankAccountInfo({
                      ...bankAccountInfo,
                      accountHolder: v
                    });
                  }}
                  value={bankAccountInfo.accountHolder}
                  label={LANG("depositor")}
                />
              </div>
              <div className="flex-grid__col col--full-6 col--wmd-12">
                <InputText
                  onChange={v => {
                    setBankAccountInfo({ ...bankAccountInfo, accountNum: v });
                  }}
                  value={bankAccountInfo.accountNum}
                  label={LANG("account_number")}
                />
              </div>
            </div>
            <div className="flex-grid">
              <div className="flex-grid__col col--full-6 col--wmd-12">
                <InputText
                  onChange={v => {
                    setBankAccountInfo({ ...bankAccountInfo, bankName: v });
                  }}
                  value={bankAccountInfo.bankName}
                  label={LANG("bank_name")}
                />
              </div>
              <div className="flex-grid__col col--full-6 col--wmd-12">
                <JDselect
                  onChange={foo => {
                    // @ts-ignore
                    setApplyPayMethods(foo);
                  }}
                  selectedOptions={applyPayMethods}
                  options={OPTIONAL_APPLY_PAYMETHOD}
                  isMulti
                  label={LANG("support_payment_method")}
                />
              </div>
            </div>
          </CardSection>
        </JDcard>
      </PageBody>
    </div>
  );
};

export default EerrorProtect<IProps>(
  // @ts-ignore
  GoogleApiWrapper({
    apiKey: "AIzaSyCLG8qPORYv6HJIDSgXpLqYDDzIKgSs6FY",
    LoadingContainer: () => (
      <div style={{ height: "85vh" }}>
        <Preloader floating size={FLOATING_PRELOADER_SIZE} loading={true} />
      </div>
    )
  })(HouseConfig)
);
