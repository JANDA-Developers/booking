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
  GET_All_PRODUCTS, BUY_PRODUCTS, GET_USER_INFO, REFUND_PRODUCT,
} from '../../../queries';
import {
  ErrProtecter, download, toast, isEmpty,
} from '../../../utils/utils';
import './Products.scss';

const Products = ({ data: { GetAllProducts, loading }, currentProduct, selectedHouse } = {}) => {
  const products = GetAllProducts && GetAllProducts.products;
  const [selectedProduct, setSelectedProduct] = useRadio(currentProduct._id);
  const [redirect, setRedirect] = useState(false);
  const [demo, demoOpen] = useModal(false);
  const [refund, refundOpen, refundClose] = useModal(false);


  const handleSelectProduct = value => setSelectedProduct(value.replace('--slider', ''));

  const testProductId = products && products.filter(product => product.name === '상품1')[0]._id;
  const product0 = {
    productIndex: '상품1',
    productName: '데모 상품',
    value: testProductId,
    roomLimit: '',
    roomCondition: '(무료체험 서비스)',
    price: '무료체험',
    specification: [
      '숙소홈페이지 셋팅 체험',
      '실시간 예약 체험',
      '하우스메뉴얼 체험',
      <span className="JDpoint-text">본상품은 예약이 불가능합니다.</span>,
    ],
    setRadio: handleSelectProduct,
    isSelected: selectedProduct === testProductId,
    isCurrent: currentProduct._id === testProductId,
  };

  const product1Value = products && products.filter(product => product.name === '상품2')[0]._id;

  console.log(currentProduct);
  console.log(product1Value);
  const product1 = {
    productIndex: '상품2',
    productName: '작은숙소',
    value: product1Value,
    roomLimit: '룸 7개이하',
    roomCondition: '(공유민박, 소규모 숙소)',
    price: '설치비 무료',
    specification: ['직접 세팅이 가능한 숙소 홈페이지', '실시간 예약 시스템', '다국어 하우스 메뉴얼'],
    setRadio: handleSelectProduct,
    isSelected: selectedProduct === product1Value,
    isCurrent: currentProduct._id === product1Value,
  };

  const product2Value = products && products.filter(product => product.name === '상품3')[0]._id;
  const product2 = {
    productIndex: '상품3',
    productName: '중간 규모숙박업',
    value: product2Value,
    roomLimit: '룸 8 ~ 20개',
    roomCondition: '(게스트하우스, 펜션)',
    price: '30.000 /월',
    specification: ['직접 세팅이 가능한 숙소 홈페이지', '실시간 예약 시스템', '다국어 하우스 메뉴얼(월 1만원 추가)'],
    setRadio: handleSelectProduct,
    isSelected: selectedProduct === product2Value,
    isCurrent: currentProduct._id === product2Value,
  };

  const product3Value = products && products.filter(product => product.name === '상품4')[0]._id;
  const product3 = {
    productIndex: '상품4',
    productName: '큰 규모숙박업',
    value: product3Value,
    roomLimit: '룸 20개 이상',
    roomCondition: '(공유민박, 소규모 숙소)',
    price: '별도협의',
    specification: [
      '직접 세팅이 가능한 숙소 홈페이지',
      '실시간 예약 시스템',
      '다국어 하우스 메뉴얼',
      '객실관리 IOT 시스템 연동',
      '맞춤제작 별도 문의',
    ],
    setRadio: handleSelectProduct,
    isSelected: selectedProduct === product3Value,
    isCurrent: currentProduct._id === product3Value,
  };

  useEffect(() => {
    const newScript = document.createElement('script');
    const newScript2 = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript2.type = 'text/javascript';
    newScript.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
    newScript2.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.5.js';
    document.body.appendChild(newScript);
    document.body.appendChild(newScript2);

    return () => {
      console.log('didUnMount');
    };
  }, []);

  useEffect(() => {
    setSelectedProduct(currentProduct._id);
  }, [currentProduct]);

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
              productId: selectedProduct && selectedProduct.replace('--slider', ''),
            }}
            refetchQueries={[{ query: GET_USER_INFO }]}
            onCompleted={({ BuyProduct }) => {
              if (BuyProduct.ok) {
                toast.success('서비스 구매 완료');

                // 체험상품을 선택했을경우에
                if (testProductId === selectedProduct) {
                  toast('서비스 사용 메뉴얼 다운로드');
                  download('https://stayjanda.com/docs/홈페이지 사용 메뉴얼--legacy-0.90.hwp', 'superWallaby').then(
                    data => console.log(data),
                  );
                  demoOpen();
                  return;
                }
                console.log('redirect?');
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
                if (!selectedProduct) {
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
      <Modal appElement={document.getElementById('root')} center isOpen={demo}>
        <h5>JANDA</h5>
        <h6> 서비스체험을 시작합니다.</h6>
        <a href="http://janda-tmp.com" className="JDanchor JDlarge-text">
          {'체험시작'}
        </a>
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
          <Mutation
            mutation={REFUND_PRODUCT}
            variables={{
              houseId: selectedHouse._id,
              productId: currentProduct._id,
            }}
            refetchQueries={[{ query: GET_USER_INFO }]}
            onCompleted={({ RefundProduct }) => {}}
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
};

Products.defaultProps = {
  currentProduct: { _id: '' },
};

export default ErrProtecter(graphql(GET_All_PRODUCTS)(Products));
