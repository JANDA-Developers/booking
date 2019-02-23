/* eslint-disable max-len */
import React from 'react';
import { useInput, useSelect } from '../../actions/hook';
import utils from '../../utils/utils';
import InputText from '../../atoms/forms/InputText';
import SelectBox from '../../atoms/forms/SelectBox';
import Button from '../../atoms/Buttons';
import './MakeHouse.scss';
import SearchInput from '../../components/searchInput/SearchInput';
// eslint-disable-next-line react/prop-types
const MakeHouse = () => {
  const houseNameHoook = useInput('');
  const deatailAdressHook = useInput('');
  const typeSelect = useSelect(null);

  const selectTypeHouse = [
    { value: 'guestHouse', label: '게스트하우스' },
    { value: 'hotel', label: '호텔' },
    { value: 'motel', label: '모텔' },
  ];

  const searchDummyData = [
    { name: 'Manpreet Singh', pic: '' },
    { name: 'Abhimanyu Kapoor', pic: '' },
    { name: 'Richard B. Gomes', pic: '' },
    { name: 'Utkarsh Jain', pic: '' },
  ];

  fetch(
    'http://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&resultType=json&countPerPage=10&keyword=강서로7길&confmKey=U01TX0FVVEgyMDE5MDIyMTE3NTEzMDEwODUzMTU',
  ).then((data) => {
    console.log('api 공공');
    console.log(data);
  });
  // 구글 api
  fetch(
    'https://maps.googleapis.com/maps/api/geocode/json?parameters&address=부산광역시 부산진구 가야대로 772&key=AIzaSyDHtW4jBj6glHJCi13wKvFD-RagSFvvbog',
  ).then((data) => {
    console.log('api 구글');
    console.log(data);
  });
  return (
    <div id="makeHomePage" className="container">
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
              <SearchInput show userList={searchDummyData} label="숙소주소" />
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
