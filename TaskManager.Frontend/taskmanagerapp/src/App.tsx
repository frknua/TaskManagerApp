import { useState, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import WorkList from './components/WorkList';
import ApiServices from './services/ApiServices';
import { User } from './models/User';
const apiServices = new ApiServices();

function App() {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const login = async (email:string, password:string) => {
    console.log("email",email);
    console.log("password",password);
    let loginUser: User = {Email:email,Password:password};
    apiServices
        .GetUser(loginUser)
        .then((data:any) => {
          console.log('Users : ', data);
          if(data.status == 200)
          {
              window.open("WorkList","_self");
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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login login={login} />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/WorkList" element={<WorkList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;