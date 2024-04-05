import React, { useState } from "react";
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form } from 'formik';
import TextFields from './TextFields';
import * as Yup from 'yup';
import './add.css'
import { serverUrl } from "../../../Config"
import { addBank } from './Addbank.helper';
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AddBank() {

  const [bank, setbank] = useState([]);
  const fetch = () => {
    axios
      .get(`${serverUrl}/bank`)
      .then(res => {
        console.log(res)
        setbank(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetch()
  }, [])

  const validate = Yup.object({
    accountNumber: Yup.string().required('required'),
    accountName: Yup.string().required('required'),
    bankName: Yup.string().required('required'),
    branchName: Yup.string().required('required'),
  })
  return (
    <>
      <Navbar />
      <div className="container mt-3" >
        <div className="row">
          <div className="col md-5" >
            <Formik
              initialValues={{
                accountNumber: '',
                accountName: '',
                bankName: '',
                branchName: ''
              }}
              validationSchema={validate}
            >
              {formik => {
                console.log(formik);
                return (
                  <div>
                    <h1 className="my-4 font-weight-bold-display-4">Add Bank</h1>
                    <Form>
                      <TextFields label="Account Number" name="accountNumber" type="text" />
                      <TextFields label="Account Name" name="accountName" type="text" />
                      <TextFields label="Bank Name" name="bankName" type="text" />
                      <TextFields label="Branch Name" name="branchName" type="text" />
                      <button className="add" onClick={() => {
                        addBank(formik.values)
                          .then(() => {
                            formik.resetForm()
                            fetch()
                            window.alert('Bank account was added Successfully')
                          })
                          .catch((err) => {
                            window.alert('Failed to Add Bank account')
                          })
                      }}>Add Bank</button>
                      <button className="reset" type='reset'>Reset</button>
                      <Link to={'/'}>
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
                  <th scope="col">Account Number</th>
                  <th scope="col">Account Name</th>
                  <th scope="col">Bank Name</th>
                  <th scope="col">Branch Name</th>
                </tr>
              </thead>
              <tbody>
                {
                  bank.map(getb => (
                    <tr key={getb.id}>
                      <td>{getb.accountNumber}</td>
                      <td>{getb.accountName}</td>
                      <td>{getb.bankName}</td>
                      <td>{getb.branchName}</td>
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
