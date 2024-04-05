import React, { useState } from "react";
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field } from 'formik';
import TextFields from '../AddRequestNote/TextFields';
import * as Yup from 'yup';
import './add.css'
import { Select, TextInput } from "@mantine/core";
import { serverUrl } from '../../../Config';
import { addRequestNote } from './Addrequestnote.helper';
import { useEffect } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";


export default function AddRequestNote() {
  const navigate = useNavigate() 

  const [Supplier, setsupplier] = useState([]);
  const [Product, setproduct] = useState([]) ;

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

  const fetchsupplierdetails = (sid , formik) => {
    axios
      .get(`${serverUrl}/supplier/byid/`+sid, {
        headers: {
          "authorization": localStorage.getItem("token")
        },
      })
      .then(res => {
        // console.log(res)
        formik.setFieldValue('supplierName', res.data.supplierName)
        formik.setFieldValue('supplierEmail', res.data.supplierEmail)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const fetchproduct = () => {
    axios
        .get(`${serverUrl}/product`, {
            headers: {
                "authorization": localStorage.getItem("token")
            },
        })
        .then(res => {
            // console.log(res)
            setproduct(res.data)
        })
        .catch(err => {
            console.log(err)
        })
  }

  const fetchproductdetails = (pid , formik) => {
    axios
      .get(`${serverUrl}/product/byid/`+pid, {
        headers: {
          "authorization": localStorage.getItem("token")
        },
      })
      .then(res => {
        // console.log(res)
        formik.setFieldValue('productName', res.data.productName)
      })
      .catch(err => {
        console.log(err)
      })
  }

  
  useEffect(() => {
    fetchsupplier()
    fetchproduct()
  }, [])


  //-------------------------------------------------------------------------------------------
  const validate = Yup.object({
    requestId: Yup.string().required('required'),
    supplierId: Yup.string().required('required'),
    supplierName: Yup.string().required('required'),
    suppleirEmail: Yup.string().required('required'),
    productId: Yup.string().required('required'),
    productName: Yup.string().required('required'),
    quantity: Yup.number().required('required'),
  })

  return (
    <>
      <Navbar />
      <div className="container mt-3" >
        <div className="row">
          <div className="col md-5" >
            <Formik
              initialValues={{
                requestId: '',
                supplierId: '',
                supplierName: '',
                supplierEmail:'',
                productId: '',
                productName: '',
                quantity: '',
                date: '',
              }}
              validationSchema={validate}
            >
              {formik => {
                console.log(formik.values);
                return (
                  <div>
                    <h1 className="my-4 font-weight-bold-display-4">Add Request Note</h1>
                    <Form>
                    <TextFields label="Add Request ID" name="requestId" type="text" />
{/* ----------------------------------------------------------------------------------------------------------- */}
                      <Field name="supplier ID">
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
                                fetchsupplierdetails(v, formik)
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
                      <TextFields label="Supplier Name" name="supplierName" type="text" readOnly={true} />
                      <TextFields label="Supplier Email" name="supplierEmail" type="text" readOnly={true} />
{/* ----------------------------------------------------------------------------------------------------------- */}
                      <Field name="Product ID">
                        {({
                          field,// { name, value, onChange, onBlur }
                          form: { touched, errors, }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                          meta,
                        }) => {
                          console.log(errors);
                          return (
                            <Select
                              error={errors['productId']}
                              required
                              onChange={(v) => {

                                formik.setFieldValue('productId', v)
                                fetchproductdetails(v, formik)
                              }}
                              label="Product ID"
                              placeholder="Select a Product ID"
                              data={Product.map(pid => (
                                { value: pid.productId, label: pid.productId }
                              ))}
                            />
                          )
                        }}
                      </Field>
                      <TextFields label="Product Name" name="productName" type="text" readOnly={true} />
                      <TextFields label="Add Quantity" name="quantity" type="text" />
                      <TextFields label="Select Requesting Date" name="date" type="date" />

                      <button className="add"
                        onClick={() => {
                            console.log(formik.values)
                          addRequestNote(formik.values)
                            .then(() => {
                              formik.resetForm()
                              fetch()
                              window.alert('Request Note Added')
                              navigate('/viewrequestnote')
                            })
                            .catch((err) => {
                              window.alert('Failed to Add Request Note')
                            })
                        }}
                      >Add Request Note</button>
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
          <div className="col md-7" style={{
            height: 300,
            overflowY: 'scroll',
            marginTop: 105
          }}>
            <table className="table table-striped table-dark">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Supplier ID</th>
                  <th scope="col">supplier Name</th>
                </tr>
              </thead>
              <tbody>
                {
                  Supplier.map(gets => (
                    <tr key={gets.id}>
                      <td>{gets.supplierId}</td>
                      <td>{gets.supplierName}</td>
                    </tr>
                  ))
                }

              </tbody>
            </table>
          </div>
          <div className="col md-7" style={{
            height: 300,
            overflowY: 'scroll',
            marginTop: 105
          }}>
            <table className="table table-striped table-dark">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Product Id</th>
                  <th scope="col">Product name</th>
                </tr>
              </thead>
              <tbody>
                {
                  Product.map(getp => (
                    <tr key={getp.id}>
                      <td>{getp.productId}</td>
                      <td>{getp.productName}</td>
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
