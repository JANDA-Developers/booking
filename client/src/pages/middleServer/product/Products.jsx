/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import Product from './components/Product';
import { useRadio } from '../../../actions/hook';
import Button from '../../../atoms/button/Buttons';
import Slider from '../../../components/slider/Slider';
import './Products.scss';

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useRadio('');

  const product1 = {
    productIndex: '상품1',
    productName: '작은숙소',
    productId: 'PD1',
    value: 'PD1',
    roomLimit: '룸 7개이하',
    roomCondition: '(공유민박, 소규모 숙소)',
    price: '설치비 무료',
    specification: ['직접 세팅이 가능한 숙소 홈페이지', '실시간 예약 시스템', '다국어 하우스 메뉴얼'],
    setRadio: setSelectedProduct,
  };

  const product2 = {
    productIndex: '상품2',
    productName: '중간 규모숙박업',
    productId: 'PD2',
    value: 'PD2',
    roomLimit: '룸 8 ~ 20개',
    roomCondition: '(게스트하우스, 펜션)',
    price: '30.000 /월',
    specification: ['직접 세팅이 가능한 숙소 홈페이지', '실시간 예약 시스템', '다국어 하우스 메뉴얼(월 1만원 추가)'],
    setRadio: setSelectedProduct,
  };

  const product3 = {
    productIndex: '상품3',
    productName: '큰 규모숙박업',
    productId: 'PD3',
    value: 'PD3',
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

  const product0 = {
    productIndex: '상품0',
    productName: '데모 상품',
    productId: 'PD0',
    value: 'PD0',
    roomLimit: '',
    roomCondition: '(무료체험 서비스)',
    price: '무료체험',
    specification: ['숙소홈페이지 셋팅 체험', '실시간 예약 체험', '하우스메뉴얼 체험'],
    setRadio: setSelectedProduct,
  };

  // TODO: do dot env secrety
  const subscribePayment = () => {
    window.IMP.init('imp64811998');

    const param = {
      // param
      pg: 'inicis',
      pay_method: 'card',
      merchant_uid: 'ORD20180131-0000014',
      name: 'asd1',
      amount: 1000,
      buyer_name: '김민재',
      buyer_tel: '01052374492',
    };

    window.IMP.request_pay(param, (rsp) => {
      console.log(rsp);
    });

    // // TODO: get this cod from secrety
    // const iamporter = new Iamporter({
    //   apiKey: '0182358903159595',
    //   secret: '2oZDI9zKlo1EYSE1dKxajtIYSw71q3UtrT6a3FVp3X42PI32tBdN5WLYsTZSXUmpOsAS7vhbsmdi4hky',
    // });

    // iamporter
    //   .getToken()
    //   .then((result) => {
    //     const token = result.data.access_token;
    //   })
    //   .catch((err) => {
    //     if (err instanceof IamporterError) console.log(err);
    //   });
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
      <div className="docs-section">
        <h3>서비스 선택</h3>
        <div className="docs-section__box">
          <div className="flex-grid flex-grid-grow products__productWrap">
            <div className="flex-grid__col col--wmd-0">
              <Product value="111" {...product0} />
            </div>
            <div className="flex-grid__col col--wmd-0">
              <Product value="222" {...product1} />
            </div>
            <div className="flex-grid__col col--wmd-0">
              <Product value="333" {...product2} />
            </div>
            <div className="flex-grid__col col--wmd-0">
              <Product value="444" {...product3} />
            </div>
            {/* MD 사이즈 이하 디바이스에서 슬라이더 */}
            <div className="flex-grid__col col--wmd-6 col--full-0">
              <Slider infinite={false}>
                <div className="JDslider__slide-wrap">
                  <div className="JDslider__slide">
                    <Product {...product0} value="1111" slider />
                  </div>
                </div>
                <div className="JDslider__slide-wrap">
                  <div className="JDslider__slide">
                    <Product {...product1} value="2222" slider />
                  </div>
                </div>
                <div className="JDslider__slide-wrap">
                  <div className="JDslider__slide">
                    <Product {...product2} value="3333" slider />
                  </div>
                </div>
                <div className="JDslider__slide-wrap">
                  <div className="JDslider__slide">
                    <Product {...product3} value="4444" slider />
                  </div>
                </div>
              </Slider>
            </div>
          </div>
          <Button onClick={subscribePayment} thema="primary" label="선택완료" mode="large" />
        </div>
      </div>
    </div>
  );
};

export default Products;
