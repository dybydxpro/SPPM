import React, { useState } from "react";
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field } from 'formik';
import TextFields from '../AddLeaveNote/TextFields';
import * as Yup from 'yup';
import './add.css'
import { Select, Textarea, TextInput } from "@mantine/core";
import { serverUrl } from '../../../Config';
import { addLeaveNote, addUserReview} from './Addleavenote.helper';
import { useEffect } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";


export default function AddLeaveNote() {
    const navigate = useNavigate()

    const [user, setuser] = useState([]);
    const fetchuser = () => {
        axios
            .get(`${serverUrl}/user`, {
                headers: {
                    "authorization": localStorage.getItem("token")
                },
            })
            .then(res => {
                // console.log(res)
                setuser(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const [userdetails, setuserdetails] = useState([]);
    const fetchuserdetails = (uid, formik) => {
        axios
            .get(`${serverUrl}/user/byid/`+ uid,{
                headers: {
                    "authorization": localStorage.getItem("token")
                },
            })
            .then((res) => {
                setuserdetails(res.data)
                formik.setFieldValue('name', res.data.name)
                formik.setFieldValue('email', res.data.email)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchuser()
    }, [])

    //-------------------------------------------------------------------------------------------
    const validate = Yup.object({
        user_id: Yup.string().required('required'),
        date: Yup.string().required('required'),
        reason: Yup.string().required('required'),
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
                                user_id: '',
                                name: '',
                                email: '',
                                date: '',
                                reason: '',
                            }}
                            validationSchema={validate}
                        >
                            {formik => {
                                console.log(formik.values);
                                return (
                                    <div>
                                        <h1 className="my-4 font-weight-bold-display-4">Add User Leave Note</h1>
                                        <Form>
                                            <Field name="user_id">
                                                {({
                                                    field,// { name, value, onChange, onBlur }
                                                    form: { touched, errors, }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                    meta,
                                                }) => (

                                                    <Select
                                                        error={errors['user_id']}
                                                        onChange={(v) => {
                                                            console.log(v);
                                                            formik.setFieldValue('user_id', v)
                                                            fetchuserdetails(v, formik)
                                                        }}
                                                        label="User ID"
                                                        placeholder="Select User ID"
                                                        data={user.map(uid => (
                                                            { value: uid.user_id, label: uid.user_id }
                                                        ))}
                                                    />
                                                )}
                                            </Field>
                                            <TextFields label="User Name" name="name" type="text" readOnly={true} />
                                            <TextFields label="User Email" name="email" type="text" readOnly={true} />
                                            <TextFields label="Add Leave Date" name="date" type="date" />
                                            <TextFields label="Add The Reason" name="reason" type="text" />

                                            <button className="add"
                                                onClick={() => {
                                                    addLeaveNote(formik.values)
                                                        .then(() => {
                                                            formik.resetForm()
                                                            window.alert('Leave Note Submitted and Email sent')
                                                            navigate('/viewleavenote')
                                                        })
                                                        .catch((err) => {
                                                            window.alert('Failed to add the leavenote')
                                                        })
                                                }}
                                            >Add Leave Note</button>
                                            <button className="reset" type='reset'>Reset</button>
                                            <Link to={'/viewuser'}>
                                                <button className="back">Back</button>
                                            </Link>
                                        </Form>
                                    </div>
                                )
                            }}
                        </Formik>
                    </div>
                </div>
            </div>


        </>
    );
};
