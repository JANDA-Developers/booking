import {toast} from "react-toastify";
/* eslint-disable max-len */
import React, {useState, useEffect, useRef} from "react";
import {Mutation} from "react-apollo";
import {GoogleApiWrapper, ProvidedProps} from "google-maps-react";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {reverseGeoCode, geoCode} from "./mapHelper";
import {
  useInput,
  useSelect,
  useFetch,
  useDebounce
} from "../../../actions/hook";
import {SELECT_HOUSE} from "../../../clientQueries";
import {CREATE_HOUSE, GET_USER_INFO} from "../../../queries";
import {ADDRESS_API_KEY} from "../../../keys";
import utils, {ErrProtecter, showError} from "../../../utils/utils";
import GoogleMap from "./components/googleMap";
import InputText from "../../../atoms/forms/inputText/InputText";
import SelectBox from "../../../atoms/forms/selectBox/SelectBox";
import Button from "../../../atoms/button/Button";
import SearchInput from "../../../atoms/searchInput/SearchInput";
import "./MakeHouse.scss";
import {show} from "react-tooltip";
import {createHouse, createHouseVariables} from "../../../types/api";
import Preloader from "../../../atoms/preloader/Preloader";
import {getOperationName} from "apollo-link";
import {Standard_PreloaderFloatingSize} from "../../../types/enum";

let map: google.maps.Map | null = null;

interface IProps extends ProvidedProps {}

class SelectHouseMu extends Mutation<any, any> {}

class CreateHouse extends Mutation<createHouse, createHouseVariables> {}

// eslint-disable-next-line react/prop-types
const MakeHouse: React.FC<IProps & RouteComponentProps> = ({
  history,
  google
}) => {
  const houseNameHoook = useInput("");
  const deatailaddressHook = useInput("");
  const typeSelectHook = useSelect(null);
  const [location, setLocation] = useState({address: "", lat: 0, lng: 0});
  const debouncedAdress = useDebounce(location.address, 500);
  const addressGeturl = `http://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&resultType=json&countPerPage=100&keyword=${debouncedAdress}&confmKey=${ADDRESS_API_KEY}`;
  const [adressData, adressLoading, getAdressError, adressGet] = useFetch(
    addressGeturl
  );
  const mapRef = useRef(null);

  if (getAdressError) console.error(getAdressError);

  // 제출전 입력값이 정확한지 검사
  const submitValidation = () => {
    if (adressLoading) {
      return false;
    }

    if (houseNameHoook.isValid === "") {
      toast.warn("숙소명을 입력해주세요.");
      return false;
    }

    if (houseNameHoook.isValid === false) {
      toast.warn("숙소명은 최대 20글자 입니다.");
      return false;
    }

    if (typeSelectHook.selectedOption === null) {
      toast.warn("숙소타입을 선택 해주세요.");
      return false;
    }

    if (location.address === "") {
      toast.warn("숙소위치를 검색해주세요.");
      return false;
    }

    return true;
  };

  // 선택가능한 숙소타입 목록
  const selectTypeHouse = [
    {value: "GUEST_HOUSE", label: "게스트하우스"},
    {value: "HOTEL", label: "호텔"},
    {value: "MOTEL", label: "모텔"},
    {value: "PENSION", label: "펜션"},
    {value: "HOSTEL", label: "호스텔"},
    {value: "YOUTH_HOSTEL", label: "유스호스텔"}
  ];

  // 지도 드래그가 끝날때 좌표값을 받아서 저장함
  const handleDragEnd = async () => {
    if (!map) return;
    const newCenter = map.getCenter();
    const lat = newCenter.lat();
    const lng = newCenter.lng();
    const reversedAddress = await reverseGeoCode(lat, lng);
    if (reversedAddress !== false)
      setLocation({address: reversedAddress, lat, lng});
  };

  // Map Config 그리고 생성
  const loadMap = (lat: number, lng: number) => {
    const {maps} = google;
    const mapNode = mapRef.current;
    const mapConfig = {
      center: {
        lat,
        lng
      },
      disableDefaultUI: true,
      minZoom: 8,
      zoom: 15,
      zoomControl: true
    };
    map = new maps.Map(mapNode, mapConfig);
    map.addListener("dragend", handleDragEnd);
  };

  // 구글맵 네비 현재위치 조회 성공시
  const handleGeoSucces = (positon: Position) => {
    const {
      coords: {latitude, longitude}
    } = positon;
    loadMap(latitude, longitude);
  };

  // 인풋서치 이후에 구글맵 위치를 변환
  const changeMapBySearch = async (value: string | null) => {
    const result = await geoCode(value);
    if (!map || !value) return;
    if (result !== false) {
      const {lat, lng} = result;
      setLocation({
        address: value,
        lat,
        lng
      });
      map.panTo({lat, lng});
    }
  };

  // 서치인풋에 값이 제출될때마다.
  const handleOnFind = (value: string | null) => {
    console.log("handleOnFind");
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
    adressGet(addressGeturl);
  }, [addressGeturl]);

  // 구글맵 첫 생성 (현재위치)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async location => {
        handleGeoSucces(location);
        const {
          coords: {latitude: lat, longitude: lng}
        } = location;
        if (map) {
          map.panTo({lat, lng});
          console.log("mapTo");
        }
        const address = await reverseGeoCode(lat, lng);
        setLocation({
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

  return (
    <div id="makeHomePage" className="container container--sm">
      <div className="docs-sectionp">
        {/* 하우스 선택 */}
        <SelectHouseMu
          mutation={SELECT_HOUSE}
          refetchQueries={[getOperationName(GET_USER_INFO)!]}
        >
          {selectHouseMutation => (
            // Mutation : 숙소생성
            <CreateHouse
              mutation={CREATE_HOUSE}
              variables={{
                name: houseNameHoook.value,
                houseType: typeSelectHook.selectedOption
                  ? typeSelectHook.selectedOption.value
                  : "GUEST_HOUSE",
                location: {
                  address: location.address,
                  addressDetail: deatailaddressHook.value,
                  lat: location.lat,
                  lng: location.lng
                }
              }}
              refetchQueries={[{query: GET_USER_INFO}]}
              awaitRefetchQueries
              onCompleted={({CreateHouse}) => {
                if (CreateHouse.ok && CreateHouse.house) {
                  toast.success("숙소생성완료");
                  const variables = {
                    value: CreateHouse.house._id,
                    label: CreateHouse.house.name
                  };
                  selectHouseMutation({variables: {selectedHouse: variables}});
                }
              }}
            >
              {(makeHouseMutation, {loading}) => {
                const makeHouseSubmit = (
                  e: React.FormEvent<HTMLFormElement>
                ) => {
                  if (loading) return;
                  e.preventDefault();
                  if (submitValidation()) makeHouseMutation();
                };
                return (
                  <form onSubmit={makeHouseSubmit}>
                    <h3>숙소생성</h3>
                    <div className="flex-grid docs-section__box">
                      {/* 숙소명 입력 */}
                      <div className="flex-grid__col col--full-12 col--md-12">
                        <InputText
                          {...houseNameHoook}
                          validation={utils.isMaxOver}
                          max={20}
                          label="숙소명"
                        />
                      </div>
                      {/* 숙소 타입 선택 */}
                      <div className="flex-grid__col col--full-12 col--md-12">
                        <SelectBox
                          {...typeSelectHook}
                          options={selectTypeHouse}
                          isOpen
                          label="숙소타입 선택"
                        />
                      </div>
                      <div className="flex-grid__col col--full-8 col--md-12">
                        <SearchInput
                          maxCount={10}
                          filter={false}
                          feedBackMessage={
                            adressData.results
                              ? adressData.results.common.errorMessage
                              : ""
                          }
                          dataList={
                            adressData.results && adressData.results.juso
                          }
                          label="숙소주소"
                          asId="bdMgtSn"
                          asName="roadAddr"
                          asDetail="jibunAddr"
                          isLoading={adressLoading}
                          onFindOne={handleOnFind}
                          onTypeChange={onTypeChange}
                          onTypeValue={location.address}
                        />
                      </div>
                      <div className="flex-grid__col col--full-4 col--md-12">
                        <InputText
                          {...deatailaddressHook}
                          validation={utils.isMaxOver}
                          max={50}
                          label="상세주소"
                        />
                      </div>
                      <div className="makeHomePage__map flex-grid__col col--full-12 col--md-12">
                        <GoogleMap mapRef={mapRef} />
                      </div>
                      <Button
                        type="submit"
                        thema="primary"
                        label="숙소 생성 완료"
                        mode="normal"
                      />
                    </div>
                  </form>
                );
              }}
            </CreateHouse>
          )}
        </SelectHouseMu>
      </div>
    </div>
  );
};

export default ErrProtecter(
  // @ts-ignore
  GoogleApiWrapper({
    apiKey: "AIzaSyCLG8qPORYv6HJIDSgXpLqYDDzIKgSs6FY",
    LoadingContainer: () => (
      <div style={{height: "85vh"}}>
        <Preloader
          floating
          size={Standard_PreloaderFloatingSize}
          loading={true}
        />
      </div>
    )
  })(MakeHouse)
);
