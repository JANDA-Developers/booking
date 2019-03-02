/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useInput, useSelect } from '../../actions/hook';
import utils from '../../utils/utils';
import InputText from '../../atoms/forms/InputText';
import SelectBox from '../../atoms/forms/SelectBox';
import { Mutation } from 'react-apollo';
import Button from '../../atoms/Buttons';
import './MakeHouse.scss';
import SearchInput from '../../components/searchInput/SearchInput';
// eslint-disable-next-line react/prop-types
const MakeHouse = () => {
  const houseNameHoook = useInput('');
  const deatailAdressHook = useInput('');
  const [searchList, setSearchList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [adressSearchValue, setAdressSearchValue] = useState('서성로');
  const typeSelect = useSelect(null);
  const key = 'U01TX0FVVEgyMDE5MDIyMTE3NTEzMDEwODUzMTU=';
  const url = `http://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&resultType=json&countPerPage=100&keyword=${adressSearchValue}&confmKey=${key}`;

  async function getAdressData() {
    try {
      const { data } = await Axios.get(url);
      if (data.results) {
        if (data.results.juso) {
          console.log(data.results.juso);
          setSearchList(utils.searchListFormat(data.results.juso, 'roadAddr'));
        } else {
          setSearchList([]);
        }
      }
    } catch (inError) {
      setError(inError);
    } finally {
      setLoading(loading);
    }
  }

  useEffect(() => {
    getAdressData();
  }, [url]);

  const selectTypeHouse = [
    { value: 'guestHouse', label: '게스트하우스' },
    { value: 'hotel', label: '호텔' },
    { value: 'motel', label: '모텔' },
  ];

  // // 구글 api
  // fetch(
  //   'https://maps.googleapis.com/maps/api/geocode/json?parameters&address=부산광역시 부산진구 가야대로 772&key=AIzaSyDHtW4jBj6glHJCi13wKvFD-RagSFvvbog',
  // ).then((data) => {
  //   console.log('api 구글');
  //   console.log(data);
  // });

  return (
    <div id="makeHomePage" className="container container--sm">
      <div className="docs-section">
        <form>
          <h3>숙소생성</h3>
          <div className="flex-grid docs-section__box">
            <div className="flex-grid__col col--full-12 col--md-12">
              <InputText {...houseNameHoook} validation={utils.isMaxOver} max={20} label="숙소명" />
            </div>
            <div className="flex-grid__col col--full-12 col--md-12">
              <SelectBox {...typeSelect} options={selectTypeHouse} isOpen label="숙소타입 선택" />
            </div>
            <div className="flex-grid__col col--full-6 col--md-12">
              <SearchInput
                unfilter
                onTypeChange
                onSearch={setAdressSearchValue}
                onTypeValue={adressSearchValue}
                userList={searchList}
                label="숙소주소"
              />
            </div>
            <div className="flex-grid__col col--full-6 col--md-12">
              <InputText {...deatailAdressHook} validation={utils.isMaxOver} max={50} label="상세주소" />
            </div>
          </div>
          <Button thema="primary" label="숙소 생성 완료" mode="large" />
        </form>
      </div>
    </div>
  );
};

export default MakeHouse;
