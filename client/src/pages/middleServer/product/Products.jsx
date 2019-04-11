/* eslint-disable no-underscore-dangle */
import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Product from './components/Product';
import Button from '../../../atoms/button/Button';
import Preloader from '../../../atoms/preloader/Preloader';
import Modal from '../../../atoms/modal/Modal';
import Slider from '../../../components/slider/Slider';
import { isEmpty } from '../../../utils/utils';
import Tooltip, { ReactTooltip } from '../../../atoms/tooltip/Tooltip';
import { RefundPolicyNode } from '../../../docs/refundPolicy';
import './Products.scss';

// currentProduct : 현재 적용중인 상품
const Products = ({
  refundMutation,
  productMutation,
  productLoading,
  arrProducts,
  checkMutation,
  selectedHouse,
  currentProduct,
  refundModal,
  demoModal,
}) => {
  const [product1, product2, product3, product4] = arrProducts;
  useEffect(() => {
    ReactTooltip.rebuild();
  });
  const closeTooltip = () => {
    ReactTooltip.hide();
  };

  return (
    <div id="products" className="container">
      <div className="docs-section">
        <h3>서비스 선택</h3>
        <div className="docs-section__box">
          {productLoading ? (
            <Preloader />
          ) : (
            <div className="flex-grid flex-grid-grow products__productWrap">
              <div className="flex-grid__col col--wmd-0">
                <Product {...product1} />
              </div>
              <div className="flex-grid__col col--wmd-0">
                <Product {...product2} />
              </div>
              <div className="flex-grid__col col--wmd-0">
                <Product {...product3} />
              </div>
              <div className="flex-grid__col col--wmd-0">
                <Product {...product4} />
              </div>
              <div className="flex-grid__col col--wmd-6 col--full-0">
                <Slider onSwipe={closeTooltip} infinite={false}>
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
                  <div className="JDslider__slide-wrap">
                    <div className="JDslider__slide">
                      <Product {...product4} value={`${product4.value}--slider`} slider />
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
                <span className="JDtextColor--secondary">{selectedHouse.name}</span>
                {' 에 적용됩니다.'}
              </Fragment>
            )}
          </p>
          <Button
            onClick={() => {
              checkMutation(productMutation);
            }}
            disabled={isEmpty(selectedHouse)}
            thema="primary"
            label="선택완료"
            mode="large"
          />
          {/* 상품해지 버튼 */}
          {currentProduct._id && (
            <Button
              onClick={refundModal.openModal}
              disabled={isEmpty(selectedHouse)}
              thema="warn"
              label="상품해지"
              mode="large"
            />
          )}
        </div>
      </div>
      {/* 무료상품 시작 */}
      <Modal
        appElement={document.getElementById('root')}
        center
        onRequestClose={demoModal.modalOpen}
        isOpen={demoModal.isOpen}
      >
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
      <Modal
        appElement={document.getElementById('root')}
        onRequestClose={refundModal.closeModal}
        center
        isOpen={refundModal.isOpen}
      >
        <h6>서비스 해지</h6>
        <p>
          <RefundPolicyNode />
        </p>
        <div className="ReactModal__EndSection">
          <Button
            onClick={refundMutation}
            disabled={isEmpty(selectedHouse)}
            thema="warn"
            label="상품해지"
            mode="flat"
          />
          <Button onClick={refundModal.closeModal} label="닫기" mode="flat" />
        </div>
      </Modal>
      {/* 툴팁  : disabled */}
      <Tooltip
        getContent={isCurrent => (isCurrent !== 'false' ? <span>현재 적용된 서비스</span> : <span>핸드폰 인증후 사용가능</span>)
        }
        class="JDtooltip"
        clickable
        id="tooltip__disabled"
        effect="solid"
      />
    </div>
  );
};

Products.prototype = {
  currentProduct: PropTypes.object,
  isPhoneVerified: PropTypes.bool,
  arrProducts: PropTypes.array,
};

Products.defaultProps = {
  currentProduct: {},
  isPhoneVerified: false,
  arrProducts: [],
};

export default Products;
