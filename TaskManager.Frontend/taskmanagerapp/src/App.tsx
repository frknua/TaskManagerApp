import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import AuthServices from '../src/services/AuthServices';
const authServices = new AuthServices();

function App() {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  
  const login = async (email:string, password:string) => {
    console.log("email",email);
    console.log("password",password);
    authServices
        .GetUser("634aad0b207b863158794a8e")
        .then((data:any) => {
          console.log('Users : ', data)
          
        })
        .catch((error: any) => {
          console.log('Error : ', error)        
        })
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth login={login} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App