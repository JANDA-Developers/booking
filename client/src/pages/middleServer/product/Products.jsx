/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import { Mutation, graphql } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import Product from './components/Product';
import { useRadio, useModal } from '../../../actions/hook';
import Button from '../../../atoms/button/Buttons';
import Modal from '../../../atoms/modal/Modal';
import Slider from '../../../components/slider/Slider';
import { GET_All_PRODUCTS, BUY_PRODUCTS } from '../../../queries';
import { ErrProtecter, download, toast } from '../../../utils/utils';
import './Products.scss';

const Products = ({ data: { GetAllProducts, loading }, selectedHouse } = {}) => {
  const products = GetAllProducts && GetAllProducts.products;
  const [selectedProduct, setSelectedProduct] = useRadio();
  const [redirect, setRedirect] = useState(false);
  const [isOpen, openModal] = useModal(false);

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
      <span className="product__specification-li--warring">본상품은 예약이 불가능합니다.</span>,
    ],
    setRadio: setSelectedProduct,
  };

  const product1 = {
    productIndex: '상품2',
    productName: '작은숙소',
    value: products && products.filter(product => product.name === '상품2')[0]._id,
    roomLimit: '룸 7개이하',
    roomCondition: '(공유민박, 소규모 숙소)',
    price: '설치비 무료',
    specification: ['직접 세팅이 가능한 숙소 홈페이지', '실시간 예약 시스템', '다국어 하우스 메뉴얼'],
    setRadio: setSelectedProduct,
  };

  const product2 = {
    productIndex: '상품3',
    productName: '중간 규모숙박업',
    value: products && products.filter(product => product.name === '상품3')[0]._id,
    roomLimit: '룸 8 ~ 20개',
    roomCondition: '(게스트하우스, 펜션)',
    price: '30.000 /월',
    specification: ['직접 세팅이 가능한 숙소 홈페이지', '실시간 예약 시스템', '다국어 하우스 메뉴얼(월 1만원 추가)'],
    setRadio: setSelectedProduct,
  };

  const product3 = {
    productIndex: '상품4',
    productName: '큰 규모숙박업',
    value: products && products.filter(product => product.name === '상품4')[0]._id,
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
    setRadio: setSelectedProduct,
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
  }, []);

  return (
    <div id="products" className="container">
      {redirect ? <Redirect push to="/middleServer/ready" /> : null}
      <div className="docs-section">
        <h3>서비스 선택</h3>
        <div className="docs-section__box">
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
          <Mutation
            mutation={BUY_PRODUCTS}
            variables={{
              houseId: selectedHouse,
              productId: selectedProduct && selectedProduct.replace('--slider', ''),
            }}
            onCompleted={({ BuyProduct }) => {
              if (BuyProduct.ok) {
                toast.success('서비스 구매 완료');

                // 체험상품을 선택했을경우에
                if (testProductId === selectedProduct) {
                  openModal();
                  toast('서비스 사용 메뉴얼 다운로드');
                  download('https://stayjanda.com/docs/홈페이지 사용 메뉴얼--legacy-0.90.hwp', 'superWallaby').then(
                    data => console.log(data),
                  );
                  return false;
                }
                setRedirect(true);

                // 통신에러
              } else {
                console.error(BuyProduct.error);
                toast.warn('구매절차에 문제가 발생했습니다. 별도 문의 바랍니다.');
              }
              return false;
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
              return <Button onClick={checkMutation} thema="primary" label="선택완료" mode="large" />;
            }}
          </Mutation>
        </div>
      </div>

      <Modal center isOpen={isOpen}>
        <h5>JANDA</h5>
        <h6> 서비스체험을 시작합니다.</h6>
        <a href="http://janda-tmp.com" className="JDanchor large-text">
          {'체험시작'}
        </a>
      </Modal>
    </div>
  );
};

export default ErrProtecter(graphql(GET_All_PRODUCTS)(Products));
