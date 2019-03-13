/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react';
import { Mutation } from 'react-apollo';
import NaverMap from 'react-naver-map';
import { withRouter } from 'react-router-dom';
import { useInput, useSelect, useFetch } from '../../actions/hook';
import utils, { toast } from '../../utils/utils';
import InputText from '../../atoms/forms/InputText';
import SelectBox from '../../atoms/forms/SelectBox';
import { CREATE_HOUSE } from '../../queries';
import Button from '../../atoms/button/Buttons';
import './MakeHouse.scss';
import SearchInput from '../../components/searchInput/SearchInput';
// eslint-disable-next-line react/prop-types
const MakeHouse = ({ history }) => {
  const houseNameHoook = useInput('');
  const deatailAdressHook = useInput('');
  const typeSelectHook = useSelect(null);
  const adressApiKey = 'U01TX0FVVEgyMDE5MDIyMTE3NTEzMDEwODUzMTU=';
  const [adressSearchValue, setAdressSearchValue] = useState('');
  const [location, setlocation] = useState({ lat: 36.3595704, lng: 127.105399 });
  const adressGeturl = `http://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&resultType=json&countPerPage=100&keyword=${adressSearchValue}&confmKey=${adressApiKey}`;
  const locationApiKey = 'AIzaSyDHtW4jBj6glHJCi13wKvFD-RagSFvvbog';
  const locationGetUrl = `https://maps.googleapis.com/maps/api/geocode/json?parameters&address=${adressSearchValue}&key=${locationApiKey}`;
  const [data, isLoading, isError, doGet] = useFetch(adressGeturl);
  const [locationData, locationIsLoading, locationIsError, locationDoGet] = useFetch('');
  const naverMap = useRef(null);

  const handleOnSearch = (value) => {
    setAdressSearchValue(value);
  };

  const submitValidation = () => {
    // 로딩이끝나면 모든 값이 다시 셋팅된 다음 다시 요청 되어야한다 좋은 방법이 없을까
    if (locationIsLoading || isLoading) {
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

    if (adressSearchValue === '') {
      toast.warn('숙소위치를 검색해주세요.');
      return false;
    }

    return true;
  };

  const selectTypeHouse = [
    { value: 'GUEST_HOUSE', label: '게스트하우스' },
    { value: 'HOTEL', label: '호텔' },
    { value: 'MOTEL', label: '모텔' },
    { value: 'PENSION', label: '펜션' },
    { value: 'HOSTEL', label: '호스텔' },
    { value: 'YOUTH_HOSTEL', label: '유스호스텔' },
  ];

  useEffect(() => {
    doGet(adressGeturl);
    if (adressSearchValue !== '') locationDoGet(locationGetUrl);
  }, [adressGeturl]);

  useEffect(() => {
    const tempLocation = { lat: 36.3595704, lng: 127.105399 };
    if (locationData.results && locationData.results.geometry) {
      tempLocation.lat = locationData.results[0].geometry.location.lat;
      tempLocation.lng = locationData.results[0].geometry.location.lng;
    }
    setlocation(tempLocation);
  }, [locationData]);

  return (
    <div id="makeHomePage" className="container container--sm">
      <div className="docs-section">
        <Mutation
          mutation={CREATE_HOUSE}
          variables={{
            name: houseNameHoook.value,
            houseType: typeSelectHook.selectedOption ? typeSelectHook.selectedOption.value : 'GUEST_HOUSE',
            location: {
              address: adressSearchValue,
              addressDetail: deatailAdressHook.value,
              lat: location.lat && 36.3595704,
              lng: location.lng && 127.105399,
            },
          }}
          onError={(error) => {
            console.error(error);
          }}
          onCompleted={({ CreateHouse }) => {
            if (CreateHouse.ok) {
              toast.success('숙소생성완료');
              history.replace('/middleServer/products');
            }
            if (CreateHouse.error) console.error(CreateHouse.error);
          }}
        >
          {(mutation) => {
            const makeHouseSubmit = (e) => {
              e.preventDefault();
              if (submitValidation()) mutation();
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
                  <div className="flex-grid__col col--full-6 col--md-12">
                    <SearchInput
                      filter={false}
                      onSearch={handleOnSearch}
                      label="숙소주소"
                      dataList={data.results ? data.results.juso : []}
                      asName="roadAddr"
                      asDetail="jibunAddr"
                      isLoading={isLoading && locationIsLoading}
                      feedBackMessage={data.results ? data.results.common.errorMessage : ''}
                    />
                  </div>
                  <div className="flex-grid__col col--full-6 col--md-12">
                    <InputText {...deatailAdressHook} validation={utils.isMaxOver} max={50} label="상세주소" />
                  </div>
                  <div className="makeHomePage__map flex-grid__col col--full-12">
                    <NaverMap
                      clientId="ja5o94ba07"
                      ref={naverMap}
                      ncp
                      style={{ width: '100%', height: '240px' }}
                      defaultZoom={10}
                      initialPosition={location}
                    />
                  </div>
                  <Button type="submit" thema="primary" label="숙소 생성 완료" mode="large" />
                </div>
              </form>
            );
          }}
        </Mutation>
      </div>
    </div>
  );
};

export default utils.ErrProtecter(withRouter(MakeHouse));
