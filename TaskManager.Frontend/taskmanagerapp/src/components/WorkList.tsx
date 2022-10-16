import React, { Component, useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ApiServices from '../services/ApiServices';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { User } from '../models/User';
import AddWork from './AddWork';
import { Work } from '../models/Work';
const apiServices = new ApiServices();

const WorkList = (props:any) => {
  const [works, setWorks] = useState([]);
  const [user, setUser] = useState();  
  const [showModal, setModal] = useState(false);
  useEffect(() => {
    joinRoom();
    getWorks();
    setUser(props.currentUser);
  }, []);

  const getWorks = async () => 
  {
    try {
      apiServices.GetAllWorks()
        .then((data:any) => {
          console.log('Works : ', data);
          setWorks(data.data);
        })
        .catch((error: any) => {
          console.log('Error : ', error);      
        })      
    } catch (e) {
      console.log('Error: ', e);
    }
  }

  const joinRoom = async () => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7282/works")
        .configureLogging(LogLevel.Information)
        .build();
      
      connection.on("SendWorksToUsers", (works) => {
        setWorks(works);
        console.log(works);
      });

      await connection.start().then(() => console.log('Connection started!'));
      await connection.invoke("SendWorksToUsers", works);
    } catch (e) {
      console.log(e);
    }
  }
  const saveWork = (work: Work) => {
    console.log("saved work:",work);
    //work.Owner = {UserId: props.currentUser.id, UserName: props.currentUser.name};
    work.Owner = {};
    try {
      apiServices.SaveWork(work)
        .then((data:any) => {
          console.log('saved Work! : ', data);
          getWorks();
        })
        .catch((error: any) => {
          console.log('Error : ', error);      
        })      
    } catch (e) {
      console.log('Error: ', e);
    }
  }
  const deleteWork = (id:string) => {
    apiServices.DeleteWork(id)
        .then((data:any) => {
          console.log('deleted Work! : ', data);
          getWorks();
        })
        .catch((error: any) => {
          console.log('Error : ', error);      
        })  
  }
  return (
    <div>
    {   
    <div className="container">
      <nav className="navbar navbar-dark bg-dark">
      <div className="container">
      <span className="navbar-brand mb-0 h1">{props.currentUser.name + " " + props.currentUser.surname + ", " + props.currentUser.userType}</span>
  </div>
    </nav>
      <br/>
      <table className="table table-hover table-bordered">
      <thead>
        <tr>        
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Create Date</th>
          <th scope="col">Deadline Date</th>
          <th scope="col">Responsible User</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
      {
        works.map((item:any, index:any) =>
              <tr key={index}>          
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.createDate}</td>
              <td>{item.deadLineDate}</td>
              <td>{item.owner.userName}</td>
              <td>
                {
                  !item.owner.userName && props.currentUser.userType!="Admin" &&
                  <button className="btn btn-primary btn-sm" type="submit">Assign Me</button>
                }
                {
                  props.currentUser.userType=="Admin" && 
                  <button className="btn btn-danger btn-sm" type="button" onClick={() => deleteWork(item.id)}>Delete</button>
                }
                </td>
            </tr>           
        )}
      </tbody>
    </table>
    <button className="btn btn-success btn-sm" type="submit" onClick={(e) => setModal(true)}>Add New</button>
    </div>}
    <AddWork show={showModal} setModal={setModal} saveWork={saveWork} />
    </div>
  )
}
export default WorkList;
