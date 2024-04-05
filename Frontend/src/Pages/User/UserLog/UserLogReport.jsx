import React, { useState , useRef } from "react";
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field } from 'formik';
import TextFields from '../UserLog/textFields';
import * as Yup from 'yup';
import './add.css'
import { serverUrl } from '../../../Config';
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ReactToPrint from 'react-to-print';
import moment from "moment"


export default function UserlogReport(){

  const ref=useRef()

  const [userlogreport , setuserlogreport] = useState([]) ;

  const genuserreport = (data,formik) => {
    axios
      .post(`${serverUrl}/user/bydate/` , data,{
        headers:{
          "authorization":localStorage.getItem("token")
        },
      })

      .then(res => {
        setuserlogreport(res.data)
        window.alert('User Log Report Generated successfully')
        formik.resetForm()
      })
      .catch(err => {
        console.log(err)
        window.alert('Failed to generate Report')
      })
  }

 
  //-------------------------------------------------------------------------------------------
  const validate = Yup.object({
    startDate: Yup.date().required('required'),
    endDate: Yup.date().required('required'),
  })

  // const isValid = validate.isValid(res.body)
  // const validatedData = validate.validate(res.body)

  return (
    <>
      <Navbar />
      <div className="container mt-3" >
        <div className="row">
          <div className="col md-5" >
            <Formik
              initialValues={{
                startDate: '',
                endDate: '',
              }}
              validationSchema={validate}
            >
              {formik => {
                console.log(formik.values);
                return (
                  <div>
                    <h1 className="my-4 font-weight-bold-display-4">User Log Report</h1>
                    <Form>
                      <TextFields label="Select Start Date" name="startDate" type="date" />
                      <TextFields label="Select End Date" name="endDate" type="date" />

                      <button className="add"
                        onClick={() => {
                          // console.log(formik.values);
                            genuserreport(formik.values,formik)
                            // formik.resetForm()
                        }}
                      >Generate User Log Report</button>
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
        </div>
        <div className="row">
        <div ref = {ref} className="col md-7" style={{
            height: '100%',
            //overflowY: 'scroll',
            marginTop: 105
          }}>
            <h1 style={{ backgroundColor: "green", color: "white" ,marginTop:50,padding:5}}>User Log Report</h1>
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">User ID</th>
                  <th scope="col">User Name</th>
                  <th scope="col">User Level</th>
                  <th scope="col">User Email</th>
                  <th scope="col">Login date</th>
                </tr>
              </thead>
              <tbody>
                {
                  userlogreport.map(getr => (
                    <tr key={getr.id}>
                      <td>{getr.user_id}</td>
                      <td>{getr.name}</td>
                      <td>{getr.userLevel}</td>
                      <td>{getr.email}</td>
                      <td>{moment.utc(getr.logTime).format('DD MM YYYY hh:mm:ss')}</td>
                    </tr>
                  ))
                }

              </tbody>
            </table>
          </div>
        </div>
        <div className="col">
         <ReactToPrint
          trigger={()=><button className='btn btn-primary mx-auto'>Print</button>}
          content={()=>ref.current}
          documentTitle='User Log Report'
          pageStyle="print"
          />
         </div>
      </div>
    </>
  );
};
