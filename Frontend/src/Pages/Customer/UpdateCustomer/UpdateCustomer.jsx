import React, { useState } from "react";
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field } from 'formik';
import TextFields from './TextFields';
import * as Yup from 'yup';
import './add.css'
import { serverUrl } from '../../../Config';
import { updateCustomer } from './UpdateCustomer.helper';
import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";


export default function UpdateCustomer(props) {

  const [updatecustomer, setUpdateCustomer] = useState([]);
  const {cid}=useParams();
  const navigate = useNavigate() 
  
  const fetch = () => {
    axios
      .get(`${serverUrl}/customer`, {
        headers: {
          "authorization": localStorage.getItem("token")
        },
      })
      .then(res => {
        setUpdateCustomer(res.data)
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
    customer_id: '',
    name: '',
    email: '',
    mobile: '',
    loyalty_points: ''
  })

  //-----------------------------------------------------------------------------------
 
  const fetchini = () => {
    setInitialValues({
      customer_id:cid,
      name: '',
      email: '',
      mobile: '',
      loyalty_points: ''
    })
  }

  useEffect(() => {
    fetchini()
  }, [])


  const validate = Yup.object({
    customer_id :  Yup.string().required('required'),
    name: Yup.string().required('required'),
    email: Yup.string().required('email is required').email('Email is invalid'),
    mobile: Yup.string().required('required'),
    loyalty_points: Yup.number().required('required'),
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
                    <h1 className="my-4 font-weight-bold-display-4">Update customer</h1>
                    <Form>
                      <TextFields label="customer ID" name="customer_id" type="text" readOnly={true} />
                      <TextFields label="Update customer Name" name="name" type="text" />
                      <TextFields label="Update customer Email" name="email" type="text" />
                      <TextFields label="Update customer contact number" name="mobile" type="text" />
                      <TextFields label="Update customer loyalty points" name="loyalty_points" type="text" />
                      <button className="add" onClick={() => {
                        updateCustomer(formik.values)
                          .then(() => {
                            formik.resetForm()
                            fetch()
                            window.alert('customer Updated Sucessfully')
                            navigate('/viewcustomer')
                            
                          })
                          .catch((err) => {
                            // setNotification('Error')
                            window.alert('Error Updating customer')
                          })
                      }}>Update customer</button>
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
                  <th scope="col">customer contact number</th>
                  <th scope="col">customer Loyalty Points</th>
                </tr>
              </thead>
              <tbody>
                {
                  updatecustomer.map(gets => (
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
