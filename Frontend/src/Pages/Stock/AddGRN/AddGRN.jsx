import React, { useState } from "react";
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form } from 'formik';
import TextFields from './TextFields';
import * as Yup from 'yup';
import './add.css'

import { addgrn, updateoutStanding} from './AddGRN.helper';
import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { serverUrl } from "../../../Config";



export default function AddStock() {
  const navigate = useNavigate() 
  const [initialValues, setInitialValues] = useState({
    grnID: '',
    productId: '',
    warehouseID: '',
    supplierID: '',
    batchNo: '',
    quantity: '',
    totalBuyingPrice: '',
  })
  const [grn, setgrn] = useState([]);
  const fetch = () => {
    axios
      .get(`${serverUrl}/grn`,{
        headers:{
          "authorization":localStorage.getItem("token")
        },
      })
      .then(res => {
        console.log(res)
        setgrn(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const [loadstock, setstock] = useState([]);
  const fetchstock = (formik) => {
    axios
      .get(`${serverUrl}/stock/loadstock/`,{
        headers:{
          "authorization":localStorage.getItem("token")
        },
      })
      .then((res) => {
        // console.log({res}, 'asdasd');
        // setstock(res.data)
        setInitialValues({
          productId: res.data.productId,
          warehouseID: res.data.warehouseID,
          batchNo: res.data.batchNo,
          quantity: res.data.quantity,
          totalBuyingPrice: res.data.buyingPrice * res.data.quantity,

        })

      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetch()
    fetchstock()
  }, [])

  const validate = Yup.object({
    grnID: Yup.string().required('required'),
    productId: Yup.string().required('required'),
    warehouseID: Yup.string().required('required'),
    supplierID: Yup.string().required('required'),
    batchNo: Yup.string().required('required'),
    quantity: Yup.string().required('required'),
    totalBuyingPrice: Yup.string().required('required'),
  })
  return (
    <>
      <Navbar />
      <div className="container mt-3" >
        <div className="row">
          <div className="col md-5" >
            <Formik
              // onSubmit={(values) =>{
              //   addProduct(values)
              // }}
              initialValues={initialValues}
              enableReinitialize
              validationSchema={validate}
            >
              {formik => {
                console.log(formik);
                return (
                  <div>
                    <h1 className="my-4 font-weight-bold-display-4">Add New GRN</h1>
                    <Form>
                      <TextFields label="GRN ID" name="grnID" type="text" />
                      <TextFields label="Product ID" name="productId" type="text" />
                      <TextFields label="Warehouse ID" name="warehouseID" type="text" />
                      <TextFields label="Supplier ID" name="supplierID" type="text" />
                      <TextFields label="Batch Number" name="batchNo" type="text" />
                      <TextFields label="Quantity" name="quantity" type="text" />
                      <TextFields label="Total Buying Price (Rs.)" name="totalBuyingPrice" type="text" />
                      <button className="add"
                        onClick={() => {
                          addgrn(formik.values)
                            .then(() => {
                              updateoutStanding(formik.values)
                              formik.resetForm()
                              fetch()
                              window.alert('GRN Added Sucessfully')
                              navigate('/stock')
                            })
                            .catch((err) => {
                              window.alert('GRN Adding Unsucessfull')
                            })
                        }}
                      >Add Product to Stock</button>
                      <button className="reset" type='reset'>Reset</button>
                    </Form>
                  </div>
                )
              }}
            </Formik>
          </div>
          <div className="col md-7" style={{
            height: 600,
            overflowY: 'scroll',
            marginTop: 105
          }}>
            <table className="table table-striped table-dark">
              <thead className="thead-light">
                <tr>
                  <th scope="col">GRN ID</th>
                  <th scope="col">Product ID</th>
                  <th scope="col">Warehouse ID</th>
                  <th scope="col">Supplier ID</th>
                  <th scope="col">Batch Number</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total Buying Price</th>
                </tr>
              </thead>
              <tbody>
                {
                  grn.map(getg => (
                    <tr key={getg.id}>
                      <td>{getg.grnID}</td>
                      <td>{getg.productId}</td>
                      <td>{getg.warehouseID}</td>
                      <td>{getg.supplierID}</td>
                      <td>{getg.batchNo}</td>
                      <td>{getg.quantity}</td>
                      <td>{getg.totalBuyingPrice}</td>
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
