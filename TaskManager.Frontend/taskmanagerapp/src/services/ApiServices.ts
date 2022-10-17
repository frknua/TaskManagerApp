import AxiosServices from './AxiosServices';
import {Configurations} from '../configurations/Configurations';
import { User } from '../models/User';
import { Work } from '../models/Work';

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
  
  SaveWork(work: Work)
  {
    return axiosServices.post(Configurations.Work, work);
  }

  DeleteWork(id: string)
  {
    return axiosServices.delete(Configurations.Work + "/"+id,{});
  }
  
  UpdateWork(work: Work)
  {
    return axiosServices.put(Configurations.Work, work);
  }
}
