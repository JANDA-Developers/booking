/* eslint-disable react/forbid-prop-types */
import React from 'react';
import './Grid.scss';
import JDlabel from '../../atoms/label/JDLabel';

const Grid = () => (
  <div className="container PageGrid">
    <div className="docs-section">
      <h2>Flex-Grid</h2>
      <div className="docs-section__box">
        <h6>Flex-grid</h6>
        <div className="flex-grid">
          <div className="flex-grid__col">Flex-grid__col</div>
          <div className="flex-grid__col">Flex-grid__col</div>
          <div className="flex-grid__col">Flex-grid__col</div>
        </div>
        <p>● Flex-grid 는 display:gird 기반으로 설계되어 기본 space-bwtwwen 정렬을 합니다.</p>
      </div>

      <div className="docs-section__box">
        <h6>Flex-grid--around</h6>
        <div className="flex-grid flex-grid--around">
          <div className="flex-grid__col">Flex-grid__col</div>
          <div className="flex-grid__col">Flex-grid__col</div>
          <div className="flex-grid__col">Flex-grid__col</div>
        </div>
        <p>● 수정자 --around 를 사용하여 그사이 space-around 속성을 줄수 있습니다.</p>
      </div>

      <div className="docs-section__box">
        <h6>flex-grid--[size]</h6>
        <JDlabel txt="flex-grid--sm" />
        <div className="flex-grid--sm flex-grid-grow">
          <div className="flex-grid__col">Flex-grid__col</div>
          <div className="flex-grid__col">Flex-grid__col</div>
          <div className="flex-grid__col">Flex-grid__col</div>
        </div>
        <JDlabel txt="flex-grid--md" />
        <div className="flex-grid--md flex-grid-grow">
          <div className="flex-grid__col">Flex-grid__col</div>
          <div className="flex-grid__col">Flex-grid__col</div>
          <div className="flex-grid__col">Flex-grid__col</div>
        </div>
        <JDlabel txt="flex-grid--wmd" />
        <div className="flex-grid--wmd flex-grid-grow">
          <div className="flex-grid__col">Flex-grid__col</div>
          <div className="flex-grid__col">Flex-grid__col</div>
          <div className="flex-grid__col">Flex-grid__col</div>
        </div>
        <p>
          {`● row 에 해당하는 flex-grid 에 수정자 사이즈를 주면 해당사이즈 보다 작을때 display:blcok
        속성으로 변환됩니다`}
        </p>
      </div>

      <div className="docs-section__box">
        <h6>Flex-grid col--[size]-[number]</h6>
        <JDlabel txt="col--full-4" />
        <div className="flex-grid">
          <div className="flex-grid__col col--full-4 col--md-1">col--md-1</div>
          <div className="flex-grid__col col--full-4">block</div>
          <div className="flex-grid__col col--full-4">block</div>
        </div>
        <JDlabel txt="col--full-3" />
        <div className="flex-grid">
          <div className="flex-grid__col col--full-3  col--sm-0">col--sm-0</div>
          <div className="flex-grid__col col--full-3">col--grow3</div>
          <div className="flex-grid__col col--full-3">col--grow3</div>
        </div>
        <JDlabel txt="col--full-4 col--md-2 col--md-4 col--md-6" />
        <div className="flex-grid">
          <div className="flex-grid__col col--full-4 col--md-2">block</div>
          <div className="flex-grid__col col--full-4 col--md-4">block</div>
          <div className="flex-grid__col col--full-4 col--md-6">block</div>
        </div>
        <p>● col 에 수정자를 넣어 해당 해상도에 사이즈 조절 할수 있습니다.</p>
        <p>● 가장 일반적으로 사용되어야 할 그리드 이며 아주 높은 확장성을 가집니다.</p>
      </div>

      <h2>Flex-Grid-Grow</h2>
      <div className="docs-section__box">
        <h6>Flex-grid-grow</h6>
        <div className="flex-grid-grow">
          <div className="flex-grid__col">Flex-grid__col</div>
          <div className="flex-grid__col">Flex-grid__col</div>
          <div className="flex-grid__col">Flex-grid__col</div>
        </div>
        <p>● Flex-Grid-Grow는 기본적으로 남는 여백을 매우려 하고 공간을 나눠 가지려 합니다.</p>
      </div>

      <div className="docs-section__box">
        <h6>Flex-grid-grow col--grow-[number]</h6>
        <div className="flex-grid-grow">
          <div className="flex-grid__col col--grow-4">col-grow-4</div>
          <div className="flex-grid__col col--grow-1">col-grow-1</div>
          <div className="flex-grid__col col--grow-1">col-grow-1</div>
        </div>
        <div className="flex-grid-grow">
          <div className="flex-grid__col col--grow-3">col-grow-3</div>
          <div className="flex-grid__col col--grow-3">col-grow-3</div>
          <div className="flex-grid__col col--grow-4">col-grow-4</div>
        </div>
        <div className="flex-grid-grow">
          <div className="flex-grid__col col--grow-1">col-grow-1</div>
          <div className="flex-grid__col col--grow-1">col-grow-1</div>
          <div className="flex-grid__col col--grow-1">col-grow-1</div>
          <div className="flex-grid__col col--grow-1">col-grow-1</div>
          <div className="flex-grid__col col--grow-1">col-grow-1</div>
          <div className="flex-grid__col col--grow-6">col-grow-6</div>
        </div>
        <div className="flex-grid-grow">
          <div className="flex-grid__col col--grow-2">col-grow-2</div>
          <div className="flex-grid__col col--grow-2">col-grow-2</div>
        </div>
        <p>● 그로우 에 넘버를 넣어 해당 비율로 확장하게 만들수 있습니다.</p>
      </div>

      <h2>Grid</h2>
      <div className="row">
        <div className="block col col--1"> col--1 </div>
        <div className="block col col--2"> col--2 </div>
        <div className="block col col--3"> col--3 </div>
      </div>
      <div className="row">
        <div className="block col col--6"> col--6 </div>
        <div className="block col col--6"> col--6 </div>
      </div>
      <div className="row">
        <div className="block col col--3"> col--3 </div>
        <div className="block col col--3"> col--3 </div>
        <div className="block col col--3"> col--3 </div>
        <div className="block col col--3"> col--3 </div>
      </div>
      <p>● float 기반의 grid 입니다. 좌측 정렬을 기본으로 합니다.</p>
    </div>
  </div>
);

export default Grid;
