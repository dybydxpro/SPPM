import React, { useState } from "react";
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form } from 'formik';
import TextFields from './TextFields';
import * as Yup from 'yup';
import './add.css'
import { serverUrl } from '../../../Config';
import { addcustomer } from './addcustomer.helper';
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AddCustomer() {

  const [customer, setCustomer] = useState([]);
  const fetch = () => {
    axios
      .get(`${serverUrl}/customer` , {
        headers: {
          "authorization": localStorage.getItem("token")
        },
      })
      .then(res => {
        console.log(res)
        setCustomer(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetch()
  }, [])

  const validate = Yup.object({
    customer_id: Yup.string().required('required'),
    name: Yup.string().required('required'),
    email: Yup.string().required('email is required').email('Email is invalid'),
    mobile: Yup.string().required('required'),
  })
  return (
    <>
      <Navbar />
      <div className="container mt-3" >
        <div className="row">
          <div className="col md-5" >
            <Formik
              initialValues={{
                customer_id: '',
                name: '',
                email: '',
                mobile: '',
              }}
              validationSchema={validate}
            >
              {formik => {
                console.log(formik);
                return (
                  <div>
                    <h1 className="my-4 font-weight-bold-display-4">Add customer</h1>
                    <Form>
                      <TextFields label="Add customer ID" name="customer_id" type="text" />
                      <TextFields label="Add customer Name" name="name" type="text" />
                      <TextFields label="Add customer Email" name="email" type="text" />
                      <TextFields label="Add customer Contact Number" name="mobile" type="text" />
                      <button className="add" onClick={() => {
                        console.log(formik.values)
                        addcustomer(formik.values)
                          .then(() => {
                            formik.resetForm()
                            fetch()
                            window.alert('customer Added Successfully')
                          })
                          .catch((err) => {
                            window.alert('Failed to Add customer')
                            console.log(err)
                          })
                      }}>Add customer</button>
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
          <div className="col md-7" style={{
            height: 300,
            overflowY: 'scroll',
            marginTop: 105
          }}>
            <table className="table table-striped table-dark">
              <thead className="thead-light">
                <tr>
                  <th scope="col">customer ID</th>
                  <th scope="col">customer Name</th>
                  <th scope="col">customer Email</th>
                  <th scope="col">customer Address</th>
                  <th scope="col">customer Loyalty Points</th>
                </tr>
              </thead>
              <tbody>
                {
                  customer.map(gets => (
                    <tr key={gets.id}>
                      <td>{gets.customer_id}</td>
                      <td>{gets.name}</td>
                      <td>{gets.email}</td>
                      <td>{gets.mobile}</td>
                      <td>{gets.loyalty_points}</td>
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
