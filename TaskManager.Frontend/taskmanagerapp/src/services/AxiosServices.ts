import axios from "axios";

export default class AxiosServices {
  get(url:string, data: any) {
    return axios.get(url, data);
  }
  post(url:string, data: any) {
    return axios.post(url, data);
  }
  put(url:string, data: any) {
    return axios.put(url, data);
  }
  delete(url:string, data: any) {
    return axios.delete(url, data);
  }
}
