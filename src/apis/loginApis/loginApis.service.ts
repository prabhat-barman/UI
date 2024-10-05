import { URLS } from "../../constants";
import apiClient from "../clients";

const loginApi = {
  userLogin: (values: any) =>
    apiClient.post(URLS.login, {
      data: {
        username: values?.email,
        password: values?.password,
      },
    }),
  userLogout: () =>
    apiClient.post(URLS.logout, {
      data: {},
    }),
};

export default loginApi;
