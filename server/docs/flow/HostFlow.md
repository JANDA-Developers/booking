# Host - 가입 & 오프라인 숙소 등록

## 1. JandaBooking 회원가입

-   회원가입 - **EmailSignUp**

    -   **Params**

        | 데이터                                       | 변수타입            | 비고               |
        | -------------------------------------------- | ------------------- | ------------------ |
        | **name**                                     | Name(String)        | Validated          |
        | **password**                                 | Password(String)    | Validated          |
        | **phoneNumber**                              | PhoneNumber(String) | Validated          |
        | **agreePrivacyPolicy**                       | Boolean             | default = FALSE    |
        | userRoles                                    | UserRole[]          | default = ["HOST"] |
        | userRole<br/>(<small>**Deprecated**</small>) | UserRole(enum)      | default = "HOST"   |

    -   **Users** 컬렉션에 데이터 생성

-   전화번호 인증

    -   StartPhoneVerification => CompletePhoneVerification
    -   인증 성공 시 **Verification** 컬렉션에 데이터 추가 & Users.isPhoneVerified = true
    -   인증이 성공해야만 숙소 생성 가능

-   숙소 생성 - **CreateHouse**

    -   **Params**

        | 데이터        | 변수타입        | 비고        |
        | ------------- | --------------- | ----------- |
        | **name**      | String          |             |
        | **HouseType** | String(enum)    |             |
        | **Location**  | _address_       | 주소 (필수) |
        |               | _addressDetail_ | 상세 주소   |
        |               | _lat_           | 위도        |
        |               | _lng_           | 경도        |

    -   **Houses** 컬렉션에 데이터 생성 _(**Users**.houses 배열에 ID값 추가)_
    -   **SmsInfos** 컬렉션 데이터 생성 (sender, receivers => Users.phoneNumber 데이터 물고감)

-   상품 구입 - **BuyProduct**

    -   **Params**

        | 데이터        | 변수타입               | 비고                |
        | ------------- | ---------------------- | ------------------- |
        | houseId       | ID                     |                     |
        | productTypeId | ID                     |
        | params        | _layoutType(enum)_     | Layout_A, Layout_B  |
        |               | _requestedUrl(String)_ | 유저가 희망하는 Url |

    -   **Products** 컬렉션에 데이터 추가(Houses.product 필드에 ID값 설정)
