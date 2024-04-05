import React, { useState } from "react";
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field } from 'formik';
import TextFields from './TextFields';
import * as Yup from 'yup';
import './add.css'
import { serverUrl } from '../../../Config';
import { updateSupplier } from './UpdateSupplier.helper';
import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";


export default function UpdateSupplier(props) {

  const [updatesupplier, setupdatesupplier] = useState([]);
  const {sid}=useParams();
  const navigate = useNavigate() 


  
  const fetch = () => {
    axios
      .get(`${serverUrl}/supplier`, {
        headers: {
          "authorization": localStorage.getItem("token")
        },
      })
      .then(res => {
        setupdatesupplier(res.data)
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
    supplierId: '',
    supplierName: '',
    supplierEmail: '',
    suppleirAddress: '',
    supplierContactNumber: ''
  })

  //-----------------------------------------------------------------------------------
 
  const fetchini = () => {
    setInitialValues({
      supplierId:sid,
      supplierName: '',
      supplierEmail: '',
      suppleirAddress: '',
      supplierContactNumber: ''
    })
  }

  useEffect(() => {
    fetchini()
  }, [])




  const validate = Yup.object({
    supplierId: Yup.string().required('required'),
    supplierName: Yup.string().required('required'),
    supplierEmail: Yup.string().required('email is required').email('Email is invalid'),
    suppleirAddress: Yup.string().required('required'),
    supplierContactNumber: Yup.string().required('required'),
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
                    <h1 className="my-4 font-weight-bold-display-4">Update Supplier</h1>
                    <Form>
                      <TextFields label="Supplier ID" name="supplierId" type="text" readOnly={true} />
                      <TextFields label="Update Supplier Name" name="supplierName" type="text" />
                      <TextFields label="Update Supplier Email" name="supplierEmail" type="text" />
                      <TextFields label="Update Supplier Address" name="supplierAddress" type="text" />
                      <TextFields label="Update Supplier Contact number" name="supplierContactNumber" type="text" />
                      <button className="add" onClick={() => {
                        updateSupplier(formik.values)
                          .then(() => {
                            formik.resetForm()
                            fetch()
                            window.alert('Supplier Updated Sucessfully')
                            navigate('/viewsupplier')
                            
                          })
                          .catch((err) => {
                            // setNotification('Error')
                            window.alert('Error Updating Supplier')
                          })
                      }}>Update Supplier</button>
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
                  updatesupplier.map(gets => (
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
