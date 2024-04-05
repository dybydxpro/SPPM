import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form } from 'formik';
import TextFields from './TextFields';
import * as Yup from 'yup';
import './add.css'
import * as AiIcons from "react-icons/ai";
import { addbatch } from './Addbatch.helper';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { serverUrl } from '../../../Config';
import moment from "moment"

export default function AddBatch() {

  const [batch, setbatch] = useState([]);
  const fetch = () => {
    axios
      .get(`${serverUrl}/batches`,{
        headers:{
          "authorization":localStorage.getItem("token")
        },
      })
      .then(res => {
        console.log(res)
        setbatch(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetch()
  }, [])
//-------------------------------------------delete----------------------
const [remove, setdelete] = useState([]);
const deleting = (bNo) => {
  axios
    .delete(`${serverUrl}/batches/` + bNo,{
      headers:{
        "authorization":localStorage.getItem("token")
      },
    })
    .then((res) => {

      setdelete(res.data)

    })
    .catch((err) => console.log(err))
}
//------------------------------------------------------------
  const validate = Yup.object({
    productId: Yup.string().required('required'),
    batchNo: Yup.string().required('required'),
    ManufacturerBNo: Yup.string().required('required'),
    mfDate: Yup.date().required('required'),
    exDate: Yup.date().required('required'),
    buyingPrice: Yup.number().positive('Invalid Price').required('required').typeError('Invalid Input Type'),
    sellingPrice: Yup.number().positive('Invalid Price').required('required').typeError('Invalid Input Type'),
  })
  return (
    <>
      <Navbar />
      <div className="container mt-3 mb-3">
        <div className="row">
          <div className="col md-5">
            <Formik
              initialValues={{
                productId: '',
                batchNo: '',
                ManufacturerBNo: '',
                mfDate: '',
                exDate: '',
                buyingPrice: '',
                sellingPrice: ''
              }}
              validationSchema={validate}
            >
              {formik => (
                <div>
                  <h1 className="my-4 font-weight-bold-display-4">Add New Batch</h1>
                  <Form>
                    <TextFields label="Product ID" name="productId" type="text" />
                    <TextFields label="Batch Number" name="batchNo" type="text" />
                    <TextFields label="Manufacturer Batch Number" name="ManufacturerBNo" type="text" />
                    <TextFields label="Manufacture Date" name="mfDate" type="date" />
                    <TextFields label="Expire Date" name="exDate" type="date" />
                    <TextFields label="Buying Price" name="buyingPrice" type="text" />
                    <TextFields label="Selling Price" name="sellingPrice" type="text" />
                    <button className="add" onClick={() => {
                      addbatch(formik.values)
                        .then(() => {
                          formik.resetForm()
                          fetch()
                          window.alert('Batch Added Sucessfully')
                        })
                        .catch((err) => {
                          window.alert('Batch Adding Unsucessfull')
                        })
                    }}>Add Batch</button>
                    <button className="reset" type='reset'>Reset</button>
                      <Link to={'/stock'}>
                        <button className="back">Back</button>
                      </Link>
                  </Form>
                </div>
              )}
            </Formik>
          </div>
          <div className="col md-7 " style={{
            height: 600,
            overflowY: 'scroll',
            marginTop: 105
          }}>
            <table className="table table-striped table-dark">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Product ID</th>
                  <th scope="col">Batch Number</th>
                  <th scope="col">Manufacture Date</th>
                  <th scope="col">Expire Date</th>
                  <th scope="col">Buying Price</th>
                  <th scope="col">Selling Price</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {
                  batch.map(getbatch => (
                    <tr key={getbatch.id}>
                      <td>{getbatch.productId}</td>
                      <td>{getbatch.batchNo}</td>
                      <td>{moment.utc(getbatch.mfDate).format('DD/MM/YYYY')}</td>
                      <td>{moment.utc(getbatch.exDate).format('DD/MM/YYYY')}</td>
                      <td>{getbatch.buyingPrice}</td>
                      <td>{getbatch.sellingPrice}</td>
                      <td>
                          <Link to={'/addbatch'}>
                            <button className="btn btn-danger"
                              onClick={() => {
                                deleting(getbatch.batchNo)
                                window.alert('Batch Deleted Sucessfully')
                                fetch()
                              }}
                            ><AiIcons.AiFillDelete /></button>
                          </Link>
                        </td>
                    </tr>
                  ))
                }

              </tbody>
            </table>
          </div>
        </div>
      </div>


    </>
  )
}
