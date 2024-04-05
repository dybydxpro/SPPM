import React, { useState } from "react";
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form } from 'formik';
import TextFields from './TextFields';
import * as Yup from 'yup';
import './add.css'
import * as AiIcons from "react-icons/ai";
import { serverUrl } from '../../../Config';

import { addSupplier } from './Addsupplier.helper';
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AddSupplier() {

  const [supplier, setsupplier] = useState([]);
  const fetch = () => {
    axios
      .get(`${serverUrl}/supplier` , {
        headers: {
          "authorization": localStorage.getItem("token")
        },
      })
      .then(res => {
        console.log(res)
        setsupplier(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetch()
  }, [])

  const validate = Yup.object({
    supplierId: Yup.string().required('required'),
    supplierName: Yup.string().required('required'),
    supplierEmail: Yup.string().required('email is required').email('Email is invalid'),
    supplierAddress: Yup.string().required('required'),
    supplierContactNumber: Yup.string().required('required'),
  })
  return (
    <>
      <Navbar />
      <div className="container mt-3" >
        <div className="row">
          <div className="col md-5" >
            <Formik
              initialValues={{
                supplierId: '',
                supplierName: '',
                supplierEmail: '',
                supplierAddress: '',
                supplierContactNumber: ''
              }}
              validationSchema={validate}
            >
              {formik => {
                console.log(formik);
                return (
                  <div>
                    <h1 className="my-4 font-weight-bold-display-4">Add Supplier</h1>
                    <Form>
                      <TextFields label="Add Supplier ID" name="supplierId" type="text" />
                      <TextFields label="Add Supplier Name" name="supplierName" type="text" />
                      <TextFields label="Add Supplier Email" name="supplierEmail" type="text" />
                      <TextFields label="Add Supplier Address" name="supplierAddress" type="text" />
                      <TextFields label="Add Supplier Contact Number" name="supplierContactNumber" type="text" />
                      <button className="add" onClick={() => {
                        addSupplier(formik.values)
                          .then(() => {
                            formik.resetForm()
                            fetch()
                            window.alert('Supplier Added Successfully')
                          })
                          .catch((err) => {
                            window.alert('Failed to Add Supplier')
                            console.log(err)
                          })
                      }}>Add Supplier</button>
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
                  <th scope="col">Supplier Name</th>
                  <th scope="col">Supplier Email</th>
                  <th scope="col">Supplier Address</th>
                  <th scope="col">Supplier Contact Number</th>
                </tr>
              </thead>
              <tbody>
                {
                  supplier.map(gets => (
                    <tr key={gets.id}>
                      <td>{gets.supplierId}</td>
                      <td>{gets.supplierName}</td>
                      <td>{gets.supplierEmail}</td>
                      <td>{gets.supplierAddress}</td>
                      <td>{gets.supplierContactNumber}</td>
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
