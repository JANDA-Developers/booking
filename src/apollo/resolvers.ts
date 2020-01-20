// 클라이언트 사이드 리솔버
const resolvers = {
  Query: {
    lastSelectedHouse: () => {
      const result = {
        __typename: "House",
        value: localStorage.getItem("selectHouseId"),
        label: localStorage.getItem("selectHouseLabel")
      };

      return result;
    },
    auth: () => {
      return {
        __typename: "Auth",
        isLogIn: localStorage.getItem("jwt")
      };
    }
  },
  Mutation: {
    // resolvers: 로그인
    LogUserIn: (_: any, { token }: any, { cache }: any) => {
      localStorage.setItem("jwt", token);
      cache.writeData({
        data: {
          auth: {
            __typename: "Auth",
            isLogIn: true
          }
        }
      });
      return null;
    },
    // resolvers: 로그아웃
    LogUserOut: (_: any, __: any, { cache }: any) => {
      localStorage.removeItem("jwt");
      cache.reset();
      cache.writeData({
        data: {
          auth: {
            ...cache.data.auth,
            __typename: "Auth",
            isLogIn: false
          }
        }
      });
      return null;
    },
    // resolvers: 숙소선택
    selectHouse: (_: any, args: any, { cache }: any) => {
      try {
        cache.writeData({
          data: {
            lastSelectedHouse: {
              __typename: "House",
              value: args.selectedHouse.value,
              label: args.selectedHouse.label
            }
          }
        });
        localStorage.setItem("selectHouseId", args.selectedHouse.value);
        localStorage.setItem("selectHouseLabel", args.selectedHouse.label);
        return {
          __typename: "House",
          ok: true,
          erorr: null
        };
      } catch (error) {
        return {
          __typename: "House",
          ok: false,
          error: error.message
        };
      }
    }
  }
};

export default resolvers;
