/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import React, { Fragment, useState, useEffect } from 'react';
import { Mutation, graphql } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Product from './components/Product';
import { useRadio, useModal } from '../../../actions/hook';
import Button from '../../../atoms/button/Buttons';
import Preloader from '../../../atoms/preloader/Preloader';
import Modal from '../../../atoms/modal/Modal';
import Slider from '../../../components/slider/Slider';
import {
  GET_All_PRODUCTS_TYPES, BUY_PRODUCTS, GET_USER_INFO, REFUND_PRODUCT,
} from '../../../queries';
import {
  ErrProtecter, download, toast, isEmpty,
} from '../../../utils/utils';
import './Products.scss';

// currentProduct : 현재 적용중인 상품
const Products = ({
  data: { GetAllProductTypes, loading }, currentProduct, selectedHouse, isPhoneVerified,
} = {}) => {
  const productTypes = GetAllProductTypes && GetAllProductTypes.productTypes;

  const currentProductTypeId = !isEmpty(currentProduct) && currentProduct.productType._id;
  const [selectedProductTypeId, setSelectedProductTypeId] = useRadio(currentProductTypeId);
  const [redirect, setRedirect] = useState(false);
  const [demo, demoOpen, demoClose] = useModal(false);
  const [refund, refundOpen, refundClose] = useModal(false);

  const handleSelectProductType = value => setSelectedProductTypeId(value.replace('--slider', ''));

  const sharedProductProps = {
    disabled: !isPhoneVerified,
    setRadio: handleSelectProductType,
  };

  
  const testProductId = productTypes && productTypes.filter(productType => productType.name === '상품1')[0]._id;
  console.log(selectedProductTypeId);
  console.log(testProductId);
  const product0 = {
    ...sharedProductProps,
    productIndex: '상품1',
    productName: '데모 상품',
    value: testProductId,
    roomLimit: '',
    roomCondition: '(무료체험 서비스)',
    price: '무료체험',
    specifications: [
      '숙소홈페이지 셋팅 체험',
      '실시간 예약 체험',
      '하우스메뉴얼 체험',
      <span className="JDpoint-text">본상품은 예약이 불가능합니다.</span>,
    ],
    isSelected: selectedProductTypeId === testProductId,
    isCurrent: currentProductTypeId === testProductId,
    disabled: false,
  };

  const product1Id = productTypes && productTypes.filter(productType => productType.name === '상품2')[0]._id;
  const product1 = {
    ...sharedProductProps,
    productIndex: '상품2',
    productName: '작은숙소',
    value: product1Id,
    roomLimit: '룸 7개이하',
    roomCondition: '(공유민박, 소규모 숙소)',
    price: '설치비 무료',
    specifications: ['직접 세팅이 가능한 숙소 홈페이지', '실시간 예약 시스템', '다국어 하우스 메뉴얼'],
    isSelected: selectedProductTypeId === product1Id,
    isCurrent: currentProductTypeId === product1Id,
  };

  const product2Id = productTypes && productTypes.filter(productType => productType.name === '상품3')[0]._id;
  const product2 = {
    ...sharedProductProps,
    productIndex: '상품3',
    productName: '중간 규모숙박업',
    value: product2Id,
    roomLimit: '룸 8 ~ 20개',
    roomCondition: '(게스트하우스, 펜션)',
    price: '30.000 /월',
    specifications: ['직접 세팅이 가능한 숙소 홈페이지', '실시간 예약 시스템', '다국어 하우스 메뉴얼(월 1만원 추가)'],
    isSelected: selectedProductTypeId === product2Id,
    isCurrent: currentProductTypeId === product2Id,
  };

  const product3Id = productTypes && productTypes.filter(productType => productType.name === '상품4')[0]._id;
  const product3 = {
    ...sharedProductProps,
    productIndex: '상품4',
    productName: '큰 규모숙박업',
    value: product3Id,
    roomLimit: '룸 20개 이상',
    roomCondition: '(공유민박, 소규모 숙소)',
    price: '별도협의',
    specifications: [
      '직접 세팅이 가능한 숙소 홈페이지',
      '실시간 예약 시스템',
      '다국어 하우스 메뉴얼',
      '객실관리 IOT 시스템 연동',
      '맞춤제작 별도 문의',
    ],
    isSelected: selectedProductTypeId === product3Id,
    isCurrent: currentProductTypeId === product3Id,
  };

  useEffect(() => {
    setSelectedProductTypeId(currentProductTypeId);
  }, [currentProductTypeId]);

  return (
    <div id="products" className="container">
      {redirect ? <Redirect push to="/middleServer/ready" /> : null}
      <div className="docs-section">
        <h3>서비스 선택</h3>
        <div className="docs-section__box">
          {loading ? (
            <Preloader />
          ) : (
            <div className="flex-grid flex-grid-grow products__productWrap">
              <div className="flex-grid__col col--wmd-0">
                <Product {...product0} />
              </div>
              <div className="flex-grid__col col--wmd-0">
                <Product {...product1} />
              </div>
              <div className="flex-grid__col col--wmd-0">
                <Product {...product2} />
              </div>
              <div className="flex-grid__col col--wmd-0">
                <Product {...product3} />
              </div>
              {/* MD 사이즈 이하 디바이스에서 슬라이더 */}
              <div className="flex-grid__col col--wmd-6 col--full-0">
                <Slider infinite={false}>
                  <div className="JDslider__slide-wrap">
                    <div className="JDslider__slide">
                      <Product {...product0} value={`${product0.value}--slider`} slider />
                    </div>
                  </div>
                  <div className="JDslider__slide-wrap">
                    <div className="JDslider__slide">
                      <Product {...product1} value={`${product1.value}--slider`} slider />
                    </div>
                  </div>
                  <div className="JDslider__slide-wrap">
                    <div className="JDslider__slide">
                      <Product {...product2} value={`${product2.value}--slider`} slider />
                    </div>
                  </div>
                  <div className="JDslider__slide-wrap">
                    <div className="JDslider__slide">
                      <Product {...product3} value={`${product3.value}--slider`} slider />
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          )}
          <p>
            {isEmpty(selectedHouse) ? (
              <span className="JDlarge-warring-text">현재 생성된 숙소가 없습니다.</span>
            ) : (
              <Fragment>
                {'* 선택하신 상품은 숙소 '}
                <span className="JDpoint-text">{selectedHouse.name}</span>
                {' 에 적용됩니다.'}
              </Fragment>
            )}
          </p>
          <Mutation
            mutation={BUY_PRODUCTS}
            variables={{
              houseId: selectedHouse._id,
              productTypeId: selectedProductTypeId && selectedProductTypeId.replace('--slider', ''),
            }}
            refetchQueries={[{ query: GET_USER_INFO }]}
            onCompleted={({ BuyProduct }) => {
              if (BuyProduct.ok) {
                toast.success('서비스 적용 완료');
                // 체험상품을 선택했을경우에
                if (testProductId === selectedProductTypeId) {
                  toast('서비스 사용 메뉴얼 다운로드');
                  download('https://stayjanda.com/docs/홈페이지 사용 메뉴얼--legacy-0.90.hwp', 'superWallaby').then(
                    data => console.log(data),
                  );
                  demoOpen();
                  return;
                }
                setRedirect(true);
                // 통신에러
              } else {
                console.error(BuyProduct.error);
                toast.warn('구매절차에 문제가 발생했습니다. 별도 문의 바랍니다.');
              }
            }}
            onError={(buyProductErr) => {
              console.log(buyProductErr);
              toast.warn('구매절차에 문제가 발생했습니다. 별도 문의 바랍니다.');
            }}
          >
            {(mutation) => {
              const checkMutation = () => {
                if (!selectedProductTypeId) {
                  toast.warn('상품을 선택 해주세요.');
                  return false;
                }
                if (loading) {
                  toast.warn('상품을 재선택한후 다시 시도해주세요.');
                  return false;
                }
                mutation();
                return false;
              };
              return (
                <Button
                  onClick={checkMutation}
                  disabled={isEmpty(selectedHouse)}
                  thema="primary"
                  label="선택완료"
                  mode="large"
                />
              );
            }}
          </Mutation>
          {/* 상품해지 버튼 */}
          {currentProduct._id && (
            <Button onClick={refundOpen} disabled={isEmpty(selectedHouse)} thema="warn" label="상품해지" mode="large" />
          )}
        </div>
      </div>
      {/* 무료상품 시작 */}
      <Modal appElement={document.getElementById('root')} center onRequestClose={demoClose} isOpen={demo}>
        <h5>JANDA</h5>
        <h6> 서비스체험을 시작합니다.</h6>
        <div className="ReactModal__EndSection">
          <h6>
            <a href="http://janda-tmp.com" className="JDanchor">
              {'체험시작'}
            </a>
          </h6>
        </div>
      </Modal>
      {/* 리펀트 시작 */}
      <Modal appElement={document.getElementById('root')} onRequestClose={refundClose} center isOpen={refund}>
        <h6>서비스 해지</h6>
        <p>
          {`Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam a asperiores libero nam sunt! Ducimus ipsam
          obcaecati ipsum earum delectus molestiae, accusantium, minima asperiores ex ab esse impedit at omnis. Sequi
          quos atque eligendi fugiat sunt quidem aliquid accusantium debitis quia consectetur sapiente possimus ut nobis
          deserunt quibusdam natus totam quaerat, optio distinctio facilis accusamus recusandae quae repellendus! Porro,
          debitis? Similique nobis, magnam provident numquam, maxime laborum aut, vero non quod excepturi at sapiente
          consequuntur veritatis nesciunt cupiditate soluta aliquid eum ab dolores praesentium velit? Atque temporibus
          consequuntur non nesciunt.`}
        </p>
        <div className="ReactModal__EndSection">
          {/* Mutation : 상품해지 뮤테이션 */}
          <Mutation
            mutation={REFUND_PRODUCT}
            variables={{
              houseId: selectedHouse._id,
              productId: currentProduct._id,
            }}
            refetchQueries={[{ query: GET_USER_INFO }]}
            onCompleted={({ RefundProduct: { ok, error } }) => {
              if (ok) {
                toast.success('상품해지 완료');
                refundClose();
              } else {
                console.error(error);
                toast.error(error);
              }
            }}
          >
            {refundMutation => (
              <Button
                onClick={refundMutation}
                disabled={isEmpty(selectedHouse)}
                thema="warn"
                label="상품해지"
                mode="flat"
              />
            )}
          </Mutation>
          <Button onClick={refundClose} label="닫기" mode="flat" />
        </div>
      </Modal>
    </div>
  );
};

Products.prototype = {
  currentProduct: PropTypes.object,
  isPhoneVerified: PropTypes.bool,
};

Products.defaultProps = {
  currentProduct: {},
  isPhoneVerified: false,
};

export default ErrProtecter(graphql(GET_All_PRODUCTS_TYPES)(Products));
