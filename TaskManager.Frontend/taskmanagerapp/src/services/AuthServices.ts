import AxiosServices from './AxiosServices';
import {Configurations} from '../configurations/Configurations';

const axiosServices = new AxiosServices()

export default class AuthServices {
  GetAllUsers()
  {
    return axiosServices.get(Configurations.User, {});
  }

  GetUser(id: string)
  {
    return axiosServices.get(Configurations.User + "/" + id,{});
  }
}
