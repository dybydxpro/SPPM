import React, { useState , useRef } from "react";
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field } from 'formik';
import TextFields from './textFields';
import * as Yup from 'yup';
import './add.css'
import { Select, TextInput } from "@mantine/core";
import { serverUrl } from '../../../Config';
import { useEffect } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ReactToPrint from 'react-to-print';


export default function ServiceReviewReport() {

  const ref=useRef()

  const [customer, setCustomer] = useState([]);
  const [customerReport , setCustomerReport] = useState([]) ;

  const fetchcustomer = () => {
    axios
      .get(`${serverUrl}/customer`, {
        headers: {
          "authorization": localStorage.getItem("token")
        },
      })
      .then(res => {
        // console.log(res)
        setCustomer(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const reviewreport = (data,formik) => {
    axios
      .post(`${serverUrl}/servicereview/byid/` , data,{
        headers:{
          "authorization":localStorage.getItem("token")
        },
      })

      .then(res => {
        setCustomerReport(res.data)
        window.alert('Report Generated successfully')
        formik.resetForm()
        //fetch()
      })
      .catch(err => {
        console.log(err)
        window.alert('Failed to generate Report')
      })
  }

  useEffect(() => {
    fetchcustomer()
  }, [])

 
  //-------------------------------------------------------------------------------------------
  const validate = Yup.object({
    customerId: Yup.string().required('required'),
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
                customerId: '',
                startDate: '',
                endDate: '',
              }}
              validationSchema={validate}
            >
              {formik => {
                console.log(formik.values);
                return (
                  <div>
                    <h1 className="my-4 font-weight-bold-display-4">Service Review Report</h1>
                    <Form>
                      <Field name="customerId">
                        {({
                          field,// { name, value, onChange, onBlur }
                          form: { touched, errors, }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                          meta,
                        }) => {
                          console.log(errors);
                          return (
                            <Select
                              error={errors['customer_id']}
                              required
                              onChange={(v) => {
                                formik.setFieldValue('customer_id', v)
                              }}
                              label="customer ID"
                              placeholder="Select a customer ID"
                              data={customer.map(cid => (
                                { value: cid.customer_id, label: cid.customer_id }
                              ))}
                            />
                          )
                        }}
                      </Field>
                      <TextFields label="Select Start Date" name="startDate" type="date" />
                      <TextFields label="Select End Date" name="endDate" type="date" />

                      <button className="add"
                        onClick={() => {
                          // console.log(formik.values);
                          reviewreport(formik.values,formik)
                            // formik.resetForm()
                        }}
                      >Generate service Review Report</button>
                      <button className="reset" type='reset'>Reset</button>
                      <Link to={'/viewcustomer'}>
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
            <h1 style={{ backgroundColor: "blue", color: "white" ,marginTop:50,padding:5}}>Service Review Report</h1>
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">customer ID</th>
                  <th scope="col">customer Name</th>
                  <th scope="col">customer Email</th>
                  <th scope="col">mobile number</th>
                  <th scope="col">review</th>
                </tr>
              </thead>
              <tbody>
                {
                  customerReport.map(getr => (
                    <tr key={getr.id}>
                      <td>{getr.customer_id}</td>
                      <td>{getr.name}</td>
                      <td>{getr.email}</td>
                      <td>{getr.mobile}</td>
                      <td>{getr.review}</td>
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
          documentTitle='Payment Report'
          pageStyle="print"
          />
         </div>
      </div>
    </>
  );
};
