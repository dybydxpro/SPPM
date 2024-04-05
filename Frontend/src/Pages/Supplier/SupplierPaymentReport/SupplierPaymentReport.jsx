import React, { useState , useRef } from "react";
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field } from 'formik';
import TextFields from '../AddSupplierPayments/TextFields';
import * as Yup from 'yup';
import './add.css'
import { Select, TextInput } from "@mantine/core";
import { serverUrl } from '../../../Config';
import { useEffect } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ReactToPrint from 'react-to-print';


export default function SupplierPaymentReport() {

  const ref=useRef()

  const [Supplier, setsupplier] = useState([]);
  const [supplierreport , setsupplierreport] = useState([]) ;

  const fetchsupplier = () => {
    axios
      .get(`${serverUrl}/supplier`, {
        headers: {
          "authorization": localStorage.getItem("token")
        },
      })
      .then(res => {
        // console.log(res)
        setsupplier(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const paymentreport = (data,formik) => {
    axios
      .post(`${serverUrl}/supplier_payments/byid/` , data,{
        headers:{
          "authorization":localStorage.getItem("token")
        },
      })

      .then(res => {
        setsupplierreport(res.data)
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
    fetchsupplier()
  }, [])

 
  //-------------------------------------------------------------------------------------------
  const validate = Yup.object({
    supplierId: Yup.string().required('required'),
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
                supplierId: '',
                startDate: '',
                endDate: '',
              }}
              validationSchema={validate}
            >
              {formik => {
                console.log(formik.values);
                return (
                  <div>
                    <h1 className="my-4 font-weight-bold-display-4">Supplier Payment Report</h1>
                    <Form>
                      <Field name="supplierId">
                        {({
                          field,// { name, value, onChange, onBlur }
                          form: { touched, errors, }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                          meta,
                        }) => {
                          console.log(errors);
                          return (
                            <Select
                              error={errors['supplierId']}
                              required
                              onChange={(v) => {
                                formik.setFieldValue('supplierId', v)
                              }}
                              label="supplier ID"
                              placeholder="Select a Supplier ID"
                              data={Supplier.map(sid => (
                                { value: sid.supplierId, label: sid.supplierId }
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
                            paymentreport(formik.values,formik)
                            // formik.resetForm()
                        }}
                      >Generate Supplier Payment Report</button>
                      <button className="reset" type='reset'>Reset</button>
                      <Link to={'/viewsupplier'}>
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
            <h1 style={{ backgroundColor: "blue", color: "white" ,marginTop:50,padding:5}}>Supplier Payment Report</h1>
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">Payment ID</th>
                  <th scope="col">Supplier ID</th>
                  <th scope="col">Supplier Name</th>
                  <th scope="col">Supplier Email</th>
                  <th scope="col">Payement Description</th>
                  <th scope="col">Account Number</th>
                  <th scope="col">payment Amount</th>
                </tr>
              </thead>
              <tbody>
                {
                  supplierreport.map(getr => (
                    <tr key={getr.id}>
                      <td>{getr.paymentId}</td>
                      <td>{getr.supplierId}</td>
                      <td>{getr.supplierName}</td>
                      <td>{getr.supplierEmail}</td>
                      <td>{getr.paymentDescription}</td>
                      <td>{getr.accountNumber}</td>
                      <td>{getr.paymentAmount}</td>
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
