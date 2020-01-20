import React, { useEffect } from "react";
import { useFetch, LANG } from "../../../../hooks/hook";
import JDsearchInput from "../../../../atoms/searchInput/SearchInput";

interface IProps {
  address: string;
  handleOnFind: (address: string) => void;
  onTypeChange: (value?: string) => void;
}

const AddressSearcher: React.FC<IProps> = ({
  address,
  handleOnFind,
  onTypeChange
}) => {
  const addressGeturl = `http://www.juso.go.kr/addrlink/addrLinkApi.do?currentPag<e=1&resultType=json&countPerPage=100&keyword=${address}&confmKey=${process.env.REACT_APP_API_ADDRESS_API_KEY}`;
  const [addressData, addressLoading, getAddressError, addressGet] = useFetch(
    addressGeturl
  );

  // 도로명주소 가져오기
  useEffect(() => {
    addressGet(addressGeturl);
  }, [addressGeturl]);

  return (
    <JDsearchInput
      id="Address"
      maxCount={10}
      filter={false}
      dataList={addressData.results?.juso}
      label={LANG("house_address")}
      asId="bdMgtSn"
      asName="roadAddr"
      asDetail="jibunAddr"
      isLoading={addressLoading}
      onFindOne={handleOnFind}
      onTypeChange={onTypeChange}
      onTypeValue={address}
    />
  );
};

export default AddressSearcher;
