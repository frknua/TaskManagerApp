import React, { Component, useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ApiServices from '../services/ApiServices';
const apiServices = new ApiServices();

const WorkList = () => {
  const [works, setWorks] = useState([]);
  useEffect(() => {
    getWorks();
  }, []);

  const getWorks = async () => 
  {
    try {
      apiServices
        .GetAllWorks()
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

  return (
    <div className="container">
      <nav className="navbar navbar-dark bg-dark">
      <div className="container">
      <span className="navbar-brand mb-0 h1">User Name(Role)</span>
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
              <td>{
                  !item.owner.userName && 
                  <button className="btn btn-primary btn-sm" type="submit">Assign Me</button>
                }</td>
            </tr>           
        )}
      </tbody>
    </table>
    <button className="btn btn-success btn-sm" type="submit">Add New</button>
    <ul className="list-group fixed-bottom container" style={{"width":"20rem"}}>
      <li className="list-group-item list-group-item-dark">Worker1</li>
      <li className="list-group-item list-group-item-dark">Worker2</li>
    </ul>
    </div>
  )
}
export default WorkList;
