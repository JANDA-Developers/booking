/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react';
import { Mutation } from 'react-apollo';
import { GoogleApiWrapper } from 'google-maps-react';
import { withRouter } from 'react-router-dom';
import { reverseGeoCode, geoCode } from './mapHelper';
import { useInput, useSelect, useFetch } from '../../../../actions/hook';
import {
  CREATE_HOUSE, SELECT_HOUSE, GET_USER_INFO, SELECTED_HOUSE,
} from '../../../../queries';
import { ADDRESS_API_KEY } from '../../../../keys';
import utils, { ErrProtecter, toast } from '../../../../utils/utils';
import GoogleMap from './components/googleMap';
import InputText from '../../../../atoms/forms/InputText';
import SelectBox from '../../../../atoms/forms/SelectBox';
import Button from '../../../../atoms/button/Buttons';
import SearchInput from '../../../../components/searchInput/SearchInput';
import './MakeHouse.scss';

let map = null;

// eslint-disable-next-line react/prop-types
const MakeHouse = ({ history, google }) => {
  const houseNameHoook = useInput('');
  const deatailaddressHook = useInput('');
  const typeSelectHook = useSelect(null);
  const [location, setlocation] = useState({ address: '', lat: 0, lng: 0 });
  const addressGeturl = `http://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&resultType=json&countPerPage=100&keyword=${
    location.address
  }&confmKey=${ADDRESS_API_KEY}`;
  const [adressData, adressLoading, getAdressError, adressGet] = useFetch(addressGeturl);
  const mapRef = useRef(null);

  if (getAdressError) console.error(getAdressError);

  // 제출전 입력값이 정확한지 검사
  const submitValidation = () => {
    if (adressLoading) {
      return false;
    }

    if (houseNameHoook.isValid === '') {
      toast.warn('숙소명을 입력해주세요.');
      return false;
    }

    if (houseNameHoook.isValid === false) {
      toast.warn('숙소명은 최대 20글자 입니다.');
      return false;
    }

    if (typeSelectHook.selectedOption === null) {
      toast.warn('숙소타입을 선택 해주세요.');
      return false;
    }

    if (location.address === '') {
      toast.warn('숙소위치를 검색해주세요.');
      return false;
    }

    return true;
  };

  // 선택가능한 숙소타입 목록
  const selectTypeHouse = [
    { value: 'GUEST_HOUSE', label: '게스트하우스' },
    { value: 'HOTEL', label: '호텔' },
    { value: 'MOTEL', label: '모텔' },
    { value: 'PENSION', label: '펜션' },
    { value: 'HOSTEL', label: '호스텔' },
    { value: 'YOUTH_HOSTEL', label: '유스호스텔' },
  ];

  // 지도 드래그가 끝날때 좌표값을 받아서 저장함
  const handleDragEnd = async () => {
    const newCenter = map.getCenter();
    const lat = newCenter.lat();
    const lng = newCenter.lng();
    const reversedAddress = await reverseGeoCode(lat, lng);
    if (reversedAddress !== false) setlocation({ address: reversedAddress, lat, lng });
  };

  // Map Config 그리고 생성
  const loadMap = (lat, lng) => {
    const { maps } = google;
    const mapNode = mapRef.current;
    const mapConfig = {
      center: {
        lat,
        lng,
      },
      disableDefaultUI: true,
      minZoom: 8,
      zoom: 17,
      zoomControl: true,
    };
    map = new maps.Map(mapNode, mapConfig);
    map.addListener('dragend', handleDragEnd);
  };

  // 구글맵 네비 현재위치 조회 성공시
  const handleGeoSucces = (positon) => {
    const {
      coords: { latitude, longitude },
    } = positon;
    loadMap(latitude, longitude);
  };

  // 인풋서치 이후에 구글맵 위치를 변환
  const changeMapBySearch = async (value) => {
    const result = await geoCode(value);
    if (result !== false) {
      const { lat, lng } = result;
      setlocation({
        address: value,
        lat,
        lng,
      });
      map.panTo({ lat, lng });
    }
  };

  // 서치인풋에 값이 제출될때마다.
  const handleOnSearch = (value) => {
    changeMapBySearch(value);
  };

  // 서치인풋에 값을 입력할때마다.
  const onTypeChange = (value) => {
    setlocation({
      ...location,
      address: value,
    });
  };

  // 도로명주소 가져오기
  const handleGeoError = (error) => {
    console.error(error);
  };

  // 도로명주소 가져오기
  useEffect(() => {
    adressGet(addressGeturl);
  }, [addressGeturl]);

  // 구글맵 첫 생성 (현재위치)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
  }, []);

  return (
    <div id="makeHomePage" className="container container--sm">
      <div className="docs-section">
        {/* 하우스 선택 */}
        <Mutation
          mutation={SELECT_HOUSE}
          nError={(error) => {
            console.error(error);
          }}
          onCompleted={({ selectHouse }) => {
            if (selectHouse.ok) {
              history.replace('/middleServer/products');
            } else {
              console.error(selectHouse.error);
              toast.warn('네트워크 오류발생 별도 문의주십시요.');
            }
          }}
        >
          {selectHouseMutation => (
            // 숙소생성
            <Mutation
              mutation={CREATE_HOUSE}
              variables={{
                name: houseNameHoook.value,
                houseType: typeSelectHook.selectedOption ? typeSelectHook.selectedOption.value : 'GUEST_HOUSE',
                location: {
                  address: location.address,
                  addressDetail: deatailaddressHook.value,
                  lat: location.lat,
                  lng: location.lng,
                },
              }}
              refetchQueries={[{ query: GET_USER_INFO }]}
              onError={(error) => {
                console.error(error);
              }}
              onCompleted={({ CreateHouse }) => {
                if (CreateHouse.ok) {
                  toast.success('숙소생성완료');
                  const variables = {
                    value: CreateHouse.house._id,
                    label: CreateHouse.house.name,
                  };
                  console.log(variables);
                  selectHouseMutation({ variables: { selectedHouse: variables } });
                }
                if (CreateHouse.error) console.error(CreateHouse.error);
              }}
            >
              {(makeHouseMutation) => {
                const makeHouseSubmit = (e) => {
                  e.preventDefault();
                  if (submitValidation()) makeHouseMutation();
                };
                return (
                  <form onSubmit={makeHouseSubmit}>
                    <h3>숙소생성</h3>
                    <div className="flex-grid docs-section__box">
                      <div className="flex-grid__col col--full-12 col--md-12">
                        <InputText {...houseNameHoook} validation={utils.isMaxOver} max={20} label="숙소명" />
                      </div>
                      <div className="flex-grid__col col--full-12 col--md-12">
                        <SelectBox {...typeSelectHook} options={selectTypeHouse} isOpen label="숙소타입 선택" />
                      </div>
                      <div className="flex-grid__col col--full-8 col--md-12">
                        <SearchInput
                          maxCount={10}
                          filter={false}
                          feedBackMessage={adressData.results ? adressData.results.common.errorMessage : ''}
                          dataList={adressData.results && adressData.results.juso}
                          label="숙소주소"
                          asName="roadAddr"
                          asDetail="jibunAddr"
                          isLoading={adressLoading}
                          isTypeChange
                          onSearch={handleOnSearch}
                          onTypeChange={onTypeChange}
                          onTypeValue={location.address}
                        />
                      </div>
                      <div className="flex-grid__col col--full-4 col--md-12">
                        <InputText {...deatailaddressHook} validation={utils.isMaxOver} max={50} label="상세주소" />
                      </div>
                      <div className="makeHomePage__map flex-grid__col col--full-12 col--md-12">
                        <GoogleMap mapRef={mapRef} />
                      </div>
                      <Button type="submit" thema="primary" label="숙소 생성 완료" mode="large" />
                    </div>
                  </form>
                );
              }}
            </Mutation>
          )}
        </Mutation>
      </div>
    </div>
  );
};

export default ErrProtecter(
  GoogleApiWrapper({ apiKey: 'AIzaSyCLG8qPORYv6HJIDSgXpLqYDDzIKgSs6FY' })(withRouter(MakeHouse)),
);
