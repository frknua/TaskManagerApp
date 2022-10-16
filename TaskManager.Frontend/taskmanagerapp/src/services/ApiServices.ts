import AxiosServices from './AxiosServices';
import {Configurations} from '../configurations/Configurations';
import { User } from '../models/User';

const axiosServices = new AxiosServices()

export default class ApiServices {
  GetAllUsers()
  {
    return axiosServices.get(Configurations.User, {});
  }

  GetUser(user: User)
  {
    return axiosServices.post(Configurations.User, user);
  }

  GetAllWorks()
  {
    return axiosServices.get(Configurations.Work, {});
  }
  
}
