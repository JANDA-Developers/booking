import {toast} from "react-toastify";
/* eslint-disable max-len */
import React, {useState, useEffect, useRef} from "react";
import {Mutation} from "react-apollo";
import {GoogleApiWrapper, ProvidedProps} from "google-maps-react";
import {reverseGeoCode, geoCode} from "./mapHelper";
import {
  useInput,
  useSelect,
  useFetch,
  useDebounce,
  LANG
} from "../../../hooks/hook";
import {SELECT_HOUSE} from "../../../clientQueries";
import {CREATE_HOUSE, GET_USER_INFO} from "../../../queries";
import {ADDRESS_API_KEY} from "../../../keys";
import utils, {ErrProtecter} from "../../../utils/utils";
import GoogleMap from "./components/googleMap";
import InputText from "../../../atoms/forms/inputText/InputText";
import SelectBox from "../../../atoms/forms/selectBox/SelectBox";
import Button from "../../../atoms/button/Button";
import SearchInput from "../../../atoms/searchInput/SearchInput";
import "./CreateHouse.scss";
import {createHouse, createHouseVariables} from "../../../types/api";
import Preloader from "../../../atoms/preloader/Preloader";
import {getOperationName} from "apollo-link";
import {FLOATING_PRELOADER_SIZE} from "../../../types/enum";
import {IContext} from "../../MiddleServerRouter";
import PrloaderModal from "../../../atoms/preloaderModal/PreloaderModal";
import {Redirect} from "react-router";

let map: google.maps.Map | null = null;

interface IProps extends ProvidedProps {
  context: IContext;
}

class SelectHouseMu extends Mutation<any, any> {}

class CreateHouseMu extends Mutation<createHouse, createHouseVariables> {}

// eslint-disable-next-line react/prop-types
const CreateHouse: React.FC<IProps> = ({context, google}) => {
  const {history} = context;
  const houseNameHoook = useInput("");
  const deatailaddressHook = useInput("");
  const typeSelectHook = useSelect(null);
  const [location, setLocation] = useState({address: "", lat: 0, lng: 0});
  const debouncedAdress = useDebounce(location.address, 500);
  const addressGeturl = `http://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&resultType=json&countPerPage=100&keyword=${debouncedAdress}&confmKey=${ADDRESS_API_KEY}`;
  const [adressData, adressLoading, getAdressError, adressGet] = useFetch(
    addressGeturl
  );
  const [redirect, setRedirect] = useState("");
  const mapRef = useRef(null);

  if (getAdressError) console.error(getAdressError);

  // 제출전 입력값이 정확한지 검사
  const submitValidation = () => {
    if (adressLoading) {
      return false;
    }

    if (houseNameHoook.isValid === "") {
      toast.warn(LANG("please_enter_the_name_of_the_house"));
      return false;
    }

    if (houseNameHoook.isValid === false) {
      toast.warn(LANG("the_max_count_of_houseName_is_20"));
      return false;
    }

    if (typeSelectHook.selectedOption === null) {
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
    {value: "GUEST_HOUSE", label: LANG("guestHouse")},
    {value: "HOTEL", label: LANG("hotel")},
    {value: "MOTEL", label: LANG("motel")},
    {value: "PENSION", label: LANG("pension")},
    {value: "HOSTEL", label: LANG("hostel")},
    {value: "YOUTH_HOSTEL", label: LANG("youth_hostel")}
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
    if (!value) return;
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
          map.panTo({lat: lat || 35.1484595, lng: lng || 129.0632157});
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

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <div id="createHomePage" className="container container--sm">
      <div className="docs-section">
        {/* 하우스 선택 */}
        <SelectHouseMu
          mutation={SELECT_HOUSE}
          refetchQueries={[getOperationName(GET_USER_INFO)!]}
          awaitRefetchQueries
          onCompleted={() => {
            setRedirect("dashboard");
          }}
        >
          {selectHouseMutation => (
            // Mutation : 숙소생성
            <CreateHouseMu
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
                  toast.success(LANG("create_house_completed"));
                  const variables = {
                    value: CreateHouse.house._id,
                    label: CreateHouse.house.name
                  };
                  selectHouseMutation({variables: {selectedHouse: variables}});
                }
              }}
            >
              {(createHouseMutation, {loading: createHouseMuLoading}) => {
                // 숙소생성 서브밋
                const createHouseSubmit = (
                  e: React.FormEvent<HTMLFormElement>
                ) => {
                  if (createHouseMuLoading) return;
                  e.preventDefault();
                  if (submitValidation()) createHouseMutation();
                };
                return (
                  <form onSubmit={createHouseSubmit}>
                    <PrloaderModal loading={createHouseMuLoading} />
                    <h3>{LANG("create_house")}</h3>
                    <div className="flex-grid docs-section__box">
                      {/* 숙소명 입력 */}
                      <div className="flex-grid__col col--full-12 col--md-12">
                        <InputText
                          {...houseNameHoook}
                          validation={utils.isMaxOver}
                          max={20}
                          label={LANG("houseName")}
                        />
                      </div>
                      {/* 숙소 타입 선택 */}
                      <div className="flex-grid__col col--full-12 col--md-12">
                        <SelectBox
                          {...typeSelectHook}
                          options={selectTypeHouse}
                          isOpen
                          label={LANG("select_house_type")}
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
                          label={LANG("house_adress")}
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
                          label={LANG("detail_adress")}
                        />
                      </div>
                      <div className="createHomePage__map flex-grid__col col--full-12 col--md-12">
                        <GoogleMap mapRef={mapRef} />
                      </div>
                      <Button
                        type="submit"
                        thema="primary"
                        label={LANG("create_house_completed")}
                        mode="normal"
                      />
                    </div>
                  </form>
                );
              }}
            </CreateHouseMu>
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
        <Preloader floating size={FLOATING_PRELOADER_SIZE} loading={true} />
      </div>
    )
  })(CreateHouse)
);
