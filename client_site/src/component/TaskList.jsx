import React, {useEffect, useState} from 'react';
import {deleteTaskRequest, listTaskRequest} from "../apiRequest/apiRequest.js";
import {toast, Toaster} from "react-hot-toast";
import {Link} from "react-router-dom";
import { Table } from 'react-bootstrap';

const TaskList = () => {

    let [data,setData]=useState([]);
    let [change,setChange]=useState(0);

    useEffect(() => {
        (async ()=>{
          let res= await listTaskRequest();
          setData(res);
        })()
    }, [change]);

    const onDelete =async(id) => {
       let res= await deleteTaskRequest(id);
       if(res){
           toast.success("Delete completed");
           setChange(new Date().getTime())
       }else {
           toast.error("Delete fail")
       }
    }


    if(data.length===0){
        return (
            <div>
                <h1>Loading.....</h1>
            </div>
        );
    }
    else {
        return (
            <div className="container">
                <div className="row mt-lg-5">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <Table className="table text-center"  striped bordered hover size="sm">
                                <thead>
                                      <tr>
                                      <th>#</th>
                                          <th>FirstName</th>
                                          <th>LastName</th>
                                          <th>Gender</th>
                                          <th>DateOfBirth</th>
                                          <th>Nationality</th>
                                          <th>Address</th>
                                          <th>Email</th>
                                          <th>Phone</th>
                                          <th>AdmissionDate</th>
                                          <th>Courses</th>
                                          <th>Action</th>
                                      </tr>
                                </thead>
                                <tbody>
                                     {
                                         data.map((item,i)=>{
                                             return(
                                                 <tr key={i}>
                                                    <td>{i}</td>
                                                     <td>{item['firstName']}</td>
                                                     <td>{item['lastName']}</td>
                                                     <td>{item['gender']}</td>
                                                     <td>{item['dateOfBirth']}</td>
                                                     <td>{item['nationality']}</td>
                                                     <td>{item['address']}</td>
                                                     <td>{item['email']}</td>
                                                     <td>{item['phone']}</td>
                                                     <td>{item['admissionDate']}</td>
                                                     <td>{item['courses']}</td>
                                                     <td>
                                                         <button onClick={()=>{onDelete(item['_id'])}} className="btn btn-danger">Delete</button>
                                                         <Link className="btn mx-2 btn-success" to={"/save?id="+item['_id']}>Edit</Link>
                                                     </td>
                                                 </tr>
                                             )
                                         })
                                     }

                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
                <Toaster position="bottom-center" />
            </div>
        );
    }
};

export default TaskList;