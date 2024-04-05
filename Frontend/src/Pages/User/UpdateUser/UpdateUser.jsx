import React, { useState } from "react";
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field } from 'formik';
import TextFields from './TextFields';
import * as Yup from 'yup';
import './add.css'
import { serverUrl } from '../../../Config';
import { updateUser } from './UpdateUser.helper';
import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";


export default function UpdateUser(props) {

  const [updateuser, setupdateuser] = useState([]);
  const {uid}=useParams();
  const navigate = useNavigate() 


  
  const fetch = () => {
    axios
      .get(`${serverUrl}/user`, {
        headers: {
          "authorization": localStorage.getItem("token")
        },
      })
      .then(res => {
        setupdateuser(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetch()
  }, [])
  //---------------------------------------------------------------------------

  const [initialValues, setInitialValues] = useState({
    user_id: '',
    name: '',
    email: '',
    mobileNo: '',
    address : '',
    userLevel : '',
    password : '',
    DOB : ''
  })

  //-----------------------------------------------------------------------------------
 
  const fetchini = () => {
    setInitialValues({
      user_id:uid,
      name: '',
      email: '',
      mobileNo: '',
      address : '',
      userLevel : '',
      password : '',
      DOB : ''
    })
  }

  useEffect(() => {
    fetchini()
  }, [])


  const validate = Yup.object({
    user_id: Yup.string().required('required'),
    name: Yup.string().required('required'),
    mobileNo: Yup.number().required('required'), //check
    email: Yup.string().required('email is required').email('Email is invalid'), //checked
    address: Yup.string().required('required'),
    userLevel: Yup.number().positive('Invalid user level').required('required').typeError('Invalid Input Type'),
    password: Yup.string().required('password is required').min(6,'Password must be at least 6 characters'),
    confirm_password: Yup.string().required('password is required').oneOf([Yup.ref('password'),null],'Password must match'),
    DOB: Yup.date().required('required'),
  })
  return (
    <>
      <Navbar />
      <div className="container mt-3" >
        <div className="row">
          <div className="col md-5" >
            <Formik
              initialValues={initialValues}
              enableReinitialize
              validationSchema={validate}
            >
              {formik => {
                console.log(formik);
                return (
                  <div>
                    <h1 className="my-4 font-weight-bold-display-4">Update User</h1>
                    <Form>
                      <TextFields label="User ID" name="user_id" type="text" readOnly={true} />
                      <TextFields label="Update User Name" name="name" type="text" />
                      <TextFields label="Update User Email" name="email" type="email" />
                      <TextFields label="Update User Contact number" name="mobileNo" type="text" />
                      <TextFields label="Update User Address" name="address" type="text" />
                      <TextFields label="Update User Level" name="userLevel" type="text" />
                      <TextFields label="Update User Password" name="password" type="password" />
                      <TextFields label="Confirm Password" name="confirm_password" type="password" />
                      <TextFields label="Update User Date Of Birth" name="DOB" type="date" />
                      <button className="add" onClick={() => {
                        updateUser(formik.values)
                          .then(() => {
                            formik.resetForm()
                            fetch()
                            window.alert('User Updated Sucessfully')
                            navigate('/viewuser')
                            
                          })
                          .catch((err) => {
                            // setNotification('Error')
                            window.alert('Unable to Update User')
                          })
                      }}>Update User</button>
                      <button className="reset" type='reset'>Reset</button>
                      <Link to={'/viewuser'}>
                        <button className="back">Back</button>
                      </Link>
                    </Form>
                  </div>
                )
              }}
            </Formik>
          </div>
          <div className="col md-7" style={{
            height: 300,
            overflowY: 'scroll',
            marginTop: 105
          }}>
            <table className="table table-striped table-dark">
              <thead className="thead-light">
                <tr>
                  <th scope="col">User ID</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Address</th>
                  <th scope="col">User Level</th>
                  <th scope="col">Date Of Birth</th>
                </tr>
              </thead>
              <tbody>
                {
                  updateuser.map(getu => (
                    <tr key={getu.id}>
                      <td>{getu.user_id}</td>
                      <td>{getu.name}</td>
                      <td>{getu.email}</td>
                      <td>{getu.address}</td>
                      <td>{getu.userLevel}</td>
                      <td>{getu.DOB}</td>
                    </tr>
                  ))
                }

              </tbody>
            </table>
          </div>
        </div>
      </div>


    </>
  );
};
