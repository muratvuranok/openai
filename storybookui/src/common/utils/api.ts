import axios from "axios";
import qs from "qs";
import AppConsts from "../../library/appconsts";
import {
  requestInterceptor,
  requestErrorInterceptor,
  responseInterceptor,
  responseErrorInterceptor,
} from "./interceptors";

const createHttpClient = () => {
  const token = sessionStorage.getItem("token"); 
  
  const httpClient = axios.create({
    baseURL: AppConsts.remoteServiceBaseUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { encode: false });
    },
  });

  httpClient.interceptors.request.use(
    requestInterceptor,
    requestErrorInterceptor
  );
  httpClient.interceptors.response.use(
    responseInterceptor,
    responseErrorInterceptor
  );

  return httpClient;
};

const http = createHttpClient();

export default http;
