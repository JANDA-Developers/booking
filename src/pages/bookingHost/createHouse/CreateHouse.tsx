import { toast } from "react-toastify";
/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from "react";
import { ProvidedProps, GoogleApiWrapper } from "google-maps-react";
import {
  useInput,
  useSelect,
  useFetch,
  useDebounce,
  LANG
} from "../../../hooks/hook";
import utils, { s4 } from "../../../utils/utils";
import GoogleMap from "./components/googleMap";
import InputText from "../../../atoms/forms/inputText/InputText";
import SelectBox from "../../../atoms/forms/selectBox/SelectBox";
import Button from "../../../atoms/button/Button";
import "./CreateHouse.scss";
import Preloader from "../../../atoms/preloader/Preloader";
import { FLOATING_PRELOADER_SIZE, HOUSE_TYPE_OP } from "../../../types/const";
import { IContext } from "../../bookingHost/BookingHostRouter";
import PreloaderModal from "../../../atoms/preloaderModal/PreloaderModal";
import { initHouseVariables, HouseType } from "../../../types/api";
import { TRef } from "../../../types/interface";
import EerrorProtect from "../../../utils/errProtect";
import optionFineder from "../../../utils/optionFinder";
import { JDsearchInput, ISearchViewData } from "@janda-com/front";
import JDtypho from "../../../atoms/typho/Typho";
import {
  getLocationFromMap,
  loadMap,
  geoCode,
  reverseGeoCode,
  JDgoogleMapWraper,
  changeMapBySearch,
  TLocation
} from "./components/googleMapHelper";
import AddressSearcher from "../houseConfig/components/AddressSearcher";

const defaultData = {
  name: "",
  houseType: null,
  location: {
    addressDetail: "",
    address: "",
    lat: 0,
    lng: 0
  }
};

let map: google.maps.Map | null = null;

type houseData = {
  name: string;
  houseType: HouseType;
  location: TLocation;
};

interface IProps extends ProvidedProps {
  context: IContext;
  houseData?: houseData;
  muLoading?: boolean;
  onSubmit: (variables: initHouseVariables) => void;
  submitRef?: TRef;
}

// eslint-disable-next-line react/prop-types
const CreateHouse: React.FC<IProps> = ({
  context,
  google,
  houseData,
  onSubmit,
  submitRef,
  muLoading
}) => {
  const { name, houseType, location: defaultLocation } =
    houseData || defaultData;
  const houseNameHoook = useInput(name);
  const typeSelectHook = useSelect(optionFineder(HOUSE_TYPE_OP, houseType));
  const [location, setLocation] = useState(defaultLocation);
  const debouncedAddress = useDebounce(location.address, 100);
  const addressGeturl = `http://www.juso.go.kr/addrlink/addrLinkApi.do?currentPag<e=1&resultType=json&countPerPage=100&keyword=${debouncedAddress}&confmKey=${process.env.REACT_APP_API_ADDRESS_API_KEY}`;
  const [addressData, addressLoading, getAddressError, addressGet] = useFetch(
    addressGeturl
  );
  const mapRef = useRef(null);

  if (getAddressError) console.error(getAddressError);

  // 제출전 입력값이 정확한지 검사
  const submitValidation = () => {
    if (addressLoading) {
      return false;
    }

    if (!houseNameHoook.value) {
      toast.warn(LANG("please_enter_the_name_of_the_house"));
      return false;
    }

    if (houseNameHoook.isValid === false) {
      toast.warn(LANG("the_max_count_of_houseName_is_20"));
      return false;
    }

    if (!typeSelectHook.selectedOption?.value) {
      toast.warn(LANG("please_select_the_accommodation_type"));
      return false;
    }

    if (location.address === "") {
      toast.warn(LANG("please_search_house_location"));
      return false;
    }

    return true;
  };

  // 서치인풋에 값이 제출될때마다.
  const handleOnFind = (adress: string) => {
    changeMapBySearch(adress, map, location, setLocation);
    onTypeChange(adress || "");
  };

  // 서치인풋에 값을 입력할때마다.
  const onTypeChange = (value: string = "") => {
    setLocation({
      ...location,
      address: value
    });
  };

  // 도로명주소 가져오기
  useEffect(() => {
    addressGet(addressGeturl);
  }, [addressGeturl]);

  // 구글맵 첫 생성 (현재위치)
  useEffect(() => {}, []);

  const createHouseSubmit = () => {
    if (submitValidation()) {
      onSubmit({
        param: {
          cardInfo: null,
          createHouseInput: {
            name: houseNameHoook.value,
            houseType: typeSelectHook.selectedOption!.value,
            location
          },
          createRoomTypesInput: []
        }
      });
    }
  };

  return (
    <div id="createHomePage">
      <PreloaderModal loading={muLoading} />
      <div className="flex-grid">
        {/* 숙소명 입력 */}
        <div className="flex-grid__col col--full-12 col--md-12">
          <InputText
            id="HouseName"
            {...houseNameHoook}
            validation={utils.isMaxOver}
            max={20}
            placeholder={LANG("houseName")}
            label={LANG("houseName")}
          />
        </div>
        {/* 숙소 타입 선택 */}
        <div className="flex-grid__col JDz-index-1 col--full-12 col--md-12">
          <SelectBox
            id="HouseType"
            {...typeSelectHook}
            options={HOUSE_TYPE_OP}
            isOpen
            label={LANG("select_house_type")}
          />
        </div>
        <div className="JDz-index-2 flex-grid__col col--full-8 col--md-12">
          <AddressSearcher
            onTypeChange={(s: string = "") => {
              location.address = s;
              setLocation({ ...location });
            }}
            address={location.address}
            handleOnFind={handleOnFind}
          />
        </div>
        <div className="flex-grid__col col--full-4 col--md-12">
          <InputText
            onChange={v => {
              setLocation({ ...location, addressDetail: v });
            }}
            value={location.addressDetail}
            id="AddressDetail"
            validation={utils.isMaxOver}
            max={50}
            placeholder={LANG("detail_address")}
            label={LANG("detail_address")}
          />
        </div>
        <div className="test__googleMapWrap createHomePage__map flex-grid__col col--full-12 col--md-12">
          <GoogleMap ref={mapRef} />
        </div>
        <Button
          refContainer={submitRef}
          id="CreateHouseSubmitBtn"
          thema="primary"
          label={LANG("create_house")}
          mode="normal"
          onClick={createHouseSubmit}
        />
      </div>
    </div>
  );
};

export default JDgoogleMapWraper(CreateHouse);
