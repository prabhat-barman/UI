import { URLS } from "../../constants";
import apiClient from "../clients";

const loginApisCall = {
  loginApiCall: () => {
    return apiClient.post(URLS.LoginUrl, {
      data: {},
    });
  },
};

export default loginApisCall;
