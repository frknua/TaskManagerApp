import React, { Component, useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ApiServices from '../services/ApiServices';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { User } from '../models/User';
import AddWork from './AddWork';
import { Work } from '../models/Work';
import { Configurations } from '../configurations/Configurations';
const apiServices = new ApiServices();

const WorkList = (props:any) => {
  const [works, setWorks] = useState([]);
  const [showModal, setModal] = useState(false);
  useEffect(() => {
    joinRoom();
    getWorks();
  }, []);

  const getWorks = async () => 
  {
    try {
      apiServices.GetAllWorks()
        .then((data:any) => {       
          setWorks(data.data);
        })
        .catch((error: any) => {})      
    } catch (e) {}
  }

  const joinRoom = async () => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl(Configurations.Hub)
        .configureLogging(LogLevel.Information)
        .build();
      
      connection.on("SendWorksToUsers", (works) => {
        setWorks(works);
      });

      await connection.start().then(() => console.log('Connection started!'));
      await connection.invoke("SendWorksToUsers", works);
    } catch (e) {
      console.log(e);
    }
  }
  const saveWork = (work: Work) => {
    work.Owner = {};
    try {
      apiServices.SaveWork(work)
        .then((data:any) => {
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
          getWorks();
        })
        .catch((error: any) => {
          console.log('Error : ', error);      
        })  
  }
  const assignWork = (work:Work) => {
    work.Owner = {UserId: props.currentUser.id, UserName: props.currentUser.name};
    apiServices.UpdateWork(work)
    .then(() => getWorks())
    .catch((error: any) => {
      alert(error.response.data);     
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
                  <button className="btn btn-primary btn-sm" type="button" onClick={() => assignWork(item)}>Assign Me</button>
                }
                {
                  props.currentUser.userType=="Admin" && 
                  <button className="btn btn-danger btn-sm" type="button" onClick={() => deleteWork(item.id)}>Delete</button>
                }
                {
                   item.owner.userId == props.currentUser.id && props.currentUser.userType=="Worker" &&
                  <button className="btn btn-secondary btn-sm" type="button" onClick={() => deleteWork(item.id)}>Done</button>
                }
                </td>
            </tr>           
        )}
      </tbody>
    </table>
    {
      props.currentUser.userType == "Admin" &&
      <button className="btn btn-success btn-sm" type="submit" onClick={(e) => setModal(true)}>Add New</button>
    }
    </div>}
    <AddWork show={showModal} setModal={setModal} saveWork={saveWork} />
    </div>
  )
}
export default WorkList;
