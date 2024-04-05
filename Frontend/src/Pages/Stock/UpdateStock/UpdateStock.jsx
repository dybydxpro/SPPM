import React, { useState } from "react";
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field } from 'formik';
import TextFields from './TextFields';
import * as Yup from 'yup';
import './add.css'
import * as AiIcons from "react-icons/ai";

import { updateProduct } from './UpdateStock.helper';
import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Select } from "@mantine/core";
import { serverUrl } from "../../../Config";


export default function AddStock(props) {

  const [updateproduct, setupdateproduct] = useState([]);
  const {bno}=useParams();
  const navigate = useNavigate() 


  
  const fetch = () => {
    axios
      .get(`${serverUrl}/stock`, {
        headers: {
          "authorization": localStorage.getItem("token")
        },
      })
      .then(res => {
        setupdateproduct(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetch()
  }, [])
  //---------------------------------------------------------------------------
  const [warehouse, setwarehouse] = useState([]);
  const [initialValues, setInitialValues] = useState({
    batchNo: '',
    warehouseID: '',
    quantity: ''
  })

  //-----------------------------------------------------------------------------------
  const fetchWarehouse = () => {
    axios
      .get(`${serverUrl}/warehouse`, {
        headers: {
          "authorization": localStorage.getItem("token")
        },
      })
      .then(res => {
        // console.log(res)
        setwarehouse(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
//-----------------------------------------------------------
  const fetchini = () => {
    setInitialValues({
      batchNo:bno,
      warehouseID: '',
      quantity: ''
    })
  }


  useEffect(() => {
    fetchini()
    fetchWarehouse()
  }, [])




  const validate = Yup.object({
    batchNo: Yup.string().required('required'),
    warehouseID: Yup.string().required('required'),
    quantity: Yup.string().required('required'),
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
                    <h1 className="my-4 font-weight-bold-display-4">Stock Update</h1>
                    <Form>
                      <TextFields label="Batch Number" name="batchNo" type="text" />
                      <Field name="warehouseID">
                        {({
                          field,// { name, value, onChange, onBlur }
                          form: { touched, errors, }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                          meta,
                        }) => {
                          console.log(errors);
                          return (
                            <Select
                              error={errors['warehouseID']}
                              required
                              onChange={(v) => {

                                formik.setFieldValue('warehouseID', v)
                              }}
                              label="Stock Transfer"
                              placeholder="Select a Warehouse"
                              data={warehouse.map(gwh => (
                                { value: gwh.warehouseID, label: gwh.warehouseID }
                              ))}
                            />
                          )
                        }}
                      </Field>
                      {/* <TextFields label="Stock Transfer" name="warehouseID" type="text" /> */}
                      <TextFields label="Update Quantity" name="quantity" type="text" />
                      <button className="add" onClick={() => {
                        updateProduct(formik.values)
                          .then(() => {
                            formik.resetForm()
                            fetch()
                            // setNotification('Success')
                            window.alert('Stock Updated Sucessfully')
                            navigate('/stock')
                            
                          })
                          .catch((err) => {
                            // setNotification('Error')
                            window.alert('Stock Update Unsucessfull')
                          })
                      }}>Update Product</button>
                      <button className="reset" type='reset'>Reset</button>
                      <Link to={'/stock'}>
                        <button className="back">Back</button>
                      </Link>
                      {/* {notification} */}
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
                  <th scope="col">Product ID</th>
                  <th scope="col">Warehouse</th>
                  <th scope="col">Batch Number</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Buying Price (Rs.)</th>
                  <th scope="col">Selling Price (Rs.)</th>
                </tr>
              </thead>
              <tbody>
                {
                  updateproduct.map(getb => (
                    <tr key={getb.id}>
                      <td>{getb.productId}</td>
                      <td>{getb.warehouseID}</td>
                      <td>{getb.batchNo}</td>
                      <td>{getb.quantity}</td>
                      <td>{getb.buyingPrice}</td>
                      <td>{getb.sellingPrice}</td>
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
