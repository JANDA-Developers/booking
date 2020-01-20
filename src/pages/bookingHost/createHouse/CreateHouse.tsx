import { toast } from "react-toastify";
/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from "react";
import { ProvidedProps, GoogleApiWrapper } from "google-maps-react";
import {
  reverseGeoCode,
  geoCode,
  loadMap,
  getLocationFromMap
} from "./mapHelper";
import {
  useInput,
  useSelect,
  useFetch,
  useDebounce,
  LANG
} from "../../../hooks/hook";
import utils from "../../../utils/utils";
import GoogleMap from "./components/googleMap";
import InputText from "../../../atoms/forms/inputText/InputText";
import SelectBox from "../../../atoms/forms/selectBox/SelectBox";
import Button from "../../../atoms/button/Button";
import SearchInput from "../../../atoms/searchInput/SearchInput";
import "./CreateHouse.scss";
import Preloader from "../../../atoms/preloader/Preloader";
import { FLOATING_PRELOADER_SIZE, HOUSE_TYPE_OP } from "../../../types/const";
import { IContext } from "../../bookingHost/BookingHostRouter";
import PreloaderModal from "../../../atoms/preloaderModal/PreloaderModal";
import { initHouseVariables, HouseType } from "../../../types/api";
import { TRef } from "../../../types/interface";
import EerrorProtect from "../../../utils/errProtect";
import optionFineder from "../../../utils/optionFinder";

let map: google.maps.Map | null = null;

type TLocation = {
  addressDetail: string;
  address: string;
  lat: number;
  lng: number;
};

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

  // 선택가능한 숙소타입 목록
  const selectTypeHouse = [
    { value: "GUEST_HOUSE", label: LANG("guestHouse") },
    { value: "HOTEL", label: LANG("hotel") },
    { value: "MOTEL", label: LANG("motel") },
    { value: "PENSION", label: LANG("pension") },
    { value: "HOSTEL", label: LANG("hostel") },
    { value: "YOUTH_HOSTEL", label: LANG("youth_hostel") }
  ];

  // 지도 드래그가 끝날때 좌표값을 받아서 저장함
  const handleDragEnd = async () => {
    if (!map) return;
    const { lat, lng, reversedAddress } = await getLocationFromMap(map);
    setLocation({
      ...location,
      address: reversedAddress as string,
      lat,
      lng
    });
  };

  // 구글맵 네비 현재위치 조회 성공시
  const handleGeoSucces = (positon: Position) => {
    const {
      coords: { latitude, longitude }
    } = positon;
    map = loadMap(latitude, longitude, mapRef, google);
    if (!map) return;
    map.addListener("dragend", handleDragEnd);
  };

  // 인풋서치 이후에 구글맵 위치를 변환
  const changeMapBySearch = async (value: string | null) => {
    if (!value || !map) return;
    const result = await geoCode(value);
    if (result !== false) {
      const { lat, lng } = result;
      setLocation({
        ...location,
        address: value,
        lat,
        lng
      });
      map.panTo({ lat, lng });
    }
  };

  // 서치인풋에 값이 제출될때마다.
  const handleOnFind = (value: string | null) => {
    changeMapBySearch(value);
  };

  // 서치인풋에 값을 입력할때마다.
  const onTypeChange = (value?: string) => {
    setLocation({
      ...location,
      address: value || ""
    });
  };

  // 도로명주소 가져오기
  const handleGeoError = (error: PositionError) => {
    console.error(error);
  };

  // 도로명주소 가져오기
  useEffect(() => {
    addressGet(addressGeturl);
  }, [addressGeturl]);

  // 구글맵 첫 생성 (현재위치)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async inlocation => {
        handleGeoSucces(inlocation);
        const {
          coords: { latitude: lat, longitude: lng }
        } = inlocation;
        if (map) {
          map.panTo({ lat: lat || 35.1484595, lng: lng || 129.0632157 });
        }
        const address = await reverseGeoCode(lat, lng);
        setLocation({
          ...location,
          lat,
          lng,
          address
        });
      },
      prop => {
        handleGeoError(prop);
      }
    );
  }, []);

  const createHouseSubmit = () => {
    if (submitValidation()) {
      onSubmit({
        param: {
          cardInfo: {
            cardNo: "",
            cardPw: "",
            expMonth: "",
            expYear: " ",
            idNo: ""
          },
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
    <div id="createHomePage" className="container container--sm">
      <div className="docs-section">
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
          <div className="flex-grid__col col--full-12 col--md-12">
            <SelectBox
              id="HouseType"
              {...typeSelectHook}
              options={selectTypeHouse}
              isOpen
              label={LANG("select_house_type")}
            />
          </div>
          <div className="flex-grid__col col--full-8 col--md-12">
            <SearchInput
              id="Address"
              maxCount={10}
              filter={false}
              feedBackMessage={addressData.results?.common.errorMessage || ""}
              dataList={addressData.results && addressData.results.juso}
              label={LANG("house_address")}
              asId="bdMgtSn"
              asName="roadAddr"
              asDetail="jibunAddr"
              isLoading={addressLoading}
              onFindOne={handleOnFind}
              onTypeChange={onTypeChange}
              onTypeValue={location.address}
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
            <GoogleMap mapRef={mapRef} />
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
  })(CreateHouse)
);
