import React from 'react';
import InputText from '../../atoms/forms/InputText';
import Textarea from '../../atoms/forms/Textarea';
import Radio from '../../atoms/forms/Radio';
import Button from '../../atoms/Buttons';
import './SignUp.scss';

const SignUp = () => (
  <div id="signUpPage" className="container">
    <div className="docs-section">
      <h3>회원가입</h3>
      <div className="flex-grid docs-section__box">
        <div className="flex-grid__col col--full-12 col--md-12">
          <InputText label="성함" />
        </div>
        <div className="flex-grid__col col--full-12 col--md-12">
          <InputText type="password" label="비밀번호" />
        </div>
        <div className="flex-grid__col col--full-12 col--md-12">
          <InputText type="password" label="비밀번호 확인" />
        </div>
        <div className="flex-grid__col col--full-12 col--md-12">
          <InputText type="password" label="이메일" />
        </div>
        <div className="flex-grid__col col--full-12 col--md-12">
          <Textarea
            value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex tempora, corrupti, iure magnam pariatur vero atque esse ipsum delectus, suscipit amet! Modi commodi libero maxime dignissimos dolor aspernatur similique consectetur.
            Inventore ab nisi assumenda ullam excepturi! Quidem veritatis tempore minima dolores rem cum nesciunt, corporis praesentium facere nihil laudantium neque tenetur fugit labore facilis minus adipisci cumque incidunt mollitia in?
            Quibusdam inventore quas similique maxime a magnam, repellat ducimus officiis beatae! Voluptas amet id aliquam quidem necessitatibus harum delectus consequatur exercitationem, totam error temporibus illum, veritatis nulla beatae iusto at!
            Quo vero ratione suscipit cumque ex tenetur repellat dolorum ipsam maxime, tempora similique magni beatae aperiam fuga veniam debitis possimus a nisi tempore amet? Omnis debitis nostrum inventore animi quisquam.
            Ratione consequuntur enim optio corrupti non, cum officia ab maxime facere cupiditate odit laborum quas consequatur quasi inventore velit. Temporibus sed non eligendi inventore cupiditate quibusdam tempore officia velit! Veniam.
            Necessitatibus natus veniam provident sequi reprehenderit voluptate corporis, quas aliquam. Inventore consequuntur quos a cum voluptate placeat vel fugit quas! In eos excepturi tenetur. Ipsam esse distinctio quae exercitationem expedita.
            Cum blanditiis, numquam deleniti illum beatae quidem qui voluptatibus officiis eligendi nam nobis maxime accusamus modi odio porro tenetur laborum ex quae eveniet et exercitationem ut debitis quam? Modi, nostrum.
            Nihil harum repellat dolore dolor omnis tempora ullam, qui laborum facere voluptatem quo reiciendis distinctio ad odit. Provident nulla magni eum dolor mollitia ea, deleniti quibusdam, adipisci expedita temporibus minima?
            Sequi, sunt? Magni, harum quae! Totam laborum modi excepturi ducimus, officia maiores distinctio ipsum harum nobis? Accusamus dolores iste odit magnam magni, quod sapiente molestiae ipsum! Perferendis sapiente porro consectetur!
            Laboriosam in praesentium quis ipsum modi rem odit inventore incidunt dolor saepe? Maxime, mollitia. Ipsam culpa at itaque cupiditate amet. Quae distinctio aspernatur odit sit amet praesentium delectus obcaecati cum!"
            label="개인정보 이용동의"
            readOnly
            scroll
          />
        </div>
        <div className="flex-grid__col col--full-12 col--md-12">
          <Radio label="동의" checked id="RD1--1" groupName="Agree" />
          <Radio label="동의안함" id="RD1--2" groupName="Agree" />
        </div>
      </div>
      <div>
        <Button label="가입완료" mode="large" />
      </div>
    </div>
  </div>
);

export default SignUp;
