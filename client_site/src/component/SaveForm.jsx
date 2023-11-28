import React, {useEffect, useState} from 'react';
import {toast, Toaster} from "react-hot-toast";
import {createTaskRequest, taskByIDRequest, updateTaskRequest} from "../apiRequest/apiRequest.js";
import {useNavigate} from "react-router-dom";
const SaveForm = () => {

    let navigate=useNavigate();
    let [FormValue,SetFormValue]=useState({firstName:"", lastName:"", gender:"", dateOfBirth:"", nationality:"", address:"", email:"", phone:"", admissionDate:"", courses:""})
    let [UpdateID,SetUpdateID]=useState(null);


    useEffect(() => {
        (async ()=>{
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            SetUpdateID(id)
            if(id!==null){
               await FillForm(id)
            }
        })()
    }, []);
    
    const FillForm =async (id) => {
       let res= await taskByIDRequest(id)
       SetFormValue({
           firstName:res['firstName'],
           lastName:res['lastName'],
           gender:res['gender'],
           dateOfBirth:res['dateOfBirth'],
           nationality:res['nationality'],
           address:res['address'],
           email:res['email'],
           phone:res['phone'],
           admissionDate:res['admissionDate'],
           courses:res['courses']
       })
    }


    const InputOnChange = (name,value) => {
        SetFormValue((FormValue)=>({
            ...FormValue,
            [name]:value
        }))
    }

    const Save = async () => {
        if(FormValue.firstName.length===0){
            toast.error("Email Required !")
        }
        else if(FormValue.lastName.length===0){
            toast.error("Title Required !")
        }
        else if(FormValue.gender.length===0){
            toast.error("Description Required !")
        }
        else if(FormValue.dateOfBirth.length===0){
            toast.error("Status Required !")
        }
        else if(FormValue.nationality.length===0){
            toast.error("Status Required !")
        }  else if(FormValue.address.length===0){
            toast.error("Status Required !")
        }
        else if(FormValue.email.length===0){
            toast.error("Status Required !")
        }
        else if(FormValue.phone.length===0){
            toast.error("Status Required !")
        }
        else if(FormValue.admissionDate.length===0){
            toast.error("Status Required !")
        }
        else if(FormValue.courses.length===0){
            toast.error("Status Required !")
        }
        else{
            if(UpdateID==null){
                let res=await createTaskRequest(FormValue);
                if(res){
                    toast.success("Create Request Completed");
                    navigate("/");
                }
                else{
                    toast.error("Create Request Fail");
                }
            }
            else{
                let res=await updateTaskRequest(FormValue,UpdateID);
                if(res){
                    toast.success("Update Request Completed");
                    navigate("/");
                }
                else{
                    toast.error("Update Request Fail");
                }
            }


        }

    }


    return (
        <div className="container mt-5 bg-light py-5">
            <div className="row w-50 m-auto">
                <div className="col-md-6 p-2">
                    <label className="form-label">Your FirstName</label>
                    <input value={FormValue.firstName} onChange={(e)=>InputOnChange('firstName',e.target.value)} type="text" className="form-control" placeholder="firstName"/>
                </div>
                <div className="col-md-6 p-2">
                    <label className="form-label">Your LastName </label>
                    <input value={FormValue.lastName} onChange={(e)=>InputOnChange('lastName',e.target.value)} type="text" className="form-control" placeholder="lastName"/>
                </div>
                <div className="col-md-6 p-2">
                    <label className="form-label">Your Gender</label>
                    <input value={FormValue.gender} onChange={(e)=>InputOnChange('gender',e.target.value)} type="text" className="form-control" placeholder="gender"/>
                </div>
                <div className="col-md-6 p-2">
                    <label className="form-label">Your DateOfBirth</label>
                    <input value={FormValue.dateOfBirth} onChange={(e)=>InputOnChange('dateOfBirth',e.target.value)}  type="text" className="form-control" placeholder="dateOfBirth"/>
                </div>
                <div className="col-md-6 p-2">
                    <label className="form-label">Your nationality</label>
                    <input value={FormValue.nationality} onChange={(e)=>InputOnChange('nationality',e.target.value)}  type="text" className="form-control" placeholder="nationality"/>
                </div>
                <div className="col-md-6 p-2">
                    <label className="form-label">Your address</label>
                    <input value={FormValue.address} onChange={(e)=>InputOnChange('address',e.target.value)}  type="text" className="form-control" placeholder="address"/>
                </div>
                <div className="col-md-6 p-2">
                    <label className="form-label">Your email</label>
                    <input value={FormValue.email} onChange={(e)=>InputOnChange('email',e.target.value)}  type="text" className="form-control" placeholder="email"/>
                </div>
                <div className="col-md-6 p-2">
                    <label className="form-label">Your phone</label>
                    <input value={FormValue.phone} onChange={(e)=>InputOnChange('phone',e.target.value)}  type="text" className="form-control" placeholder="phone"/>
                </div>
                <div className="col-md-6 p-2">
                    <label className="form-label">Your admissionDate</label>
                    <input value={FormValue.admissionDate} onChange={(e)=>InputOnChange('admissionDate',e.target.value)}  type="text" className="form-control" placeholder="admissionDate"/>
                </div>
                <div className="col-md-6 p-2">
                    <label className="form-label">Your courses</label>
                    <input value={FormValue.courses} onChange={(e)=>InputOnChange('courses',e.target.value)}  type="text" className="form-control" placeholder="courses"/>
                </div>
                <div className="col-md-12 p-2">
                    <button onClick={Save} className="btn w-100 btn-success">Submit</button>
                </div>
            </div>
            <Toaster position="bottom-center" />
        </div>
    );
};

export default SaveForm;