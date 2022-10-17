import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
import WorkList from './components/WorkList';
import ApiServices from './services/ApiServices';
import { User } from './models/User';
const apiServices = new ApiServices();

function App() {   
  const [isLogin, setLogin] = useState(false);
  const [user, setUser] = useState();
  const login = async (email:string, password:string) => {
    let loginUser: User = {Email:email,Password:password};
    apiServices
        .GetUser(loginUser)
        .then((data:any) => {          
          if(data.status == 200)
          {
            setLogin(true);
            setUser(data.data);      
          }
          else
          {
            alert("User not found");
          }
        })
        .catch((error: any) => {
          console.log('Error : ', error);      
        })
  }
  return <div className='app'>   
    {!isLogin
      ? <Login login={login} />
      : <WorkList currentUser={user} />
      }
  </div>
}
export default App;