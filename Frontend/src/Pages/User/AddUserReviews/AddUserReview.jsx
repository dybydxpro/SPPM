import React, { useState } from "react";
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field } from 'formik';
import TextFields from '../AddUserReviews/TextFields';
import * as Yup from 'yup';
import './add.css'
import { Select, Textarea, TextInput } from "@mantine/core";
import { serverUrl } from '../../../Config';
import { addUserReview} from './Adduserreview.helper';
import { useEffect } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";


export default function AddUserReview() {
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
        name: Yup.string().required('required'),
        rating: Yup.number().required('required').min(1, 'invalid rating').max(10, 'invalid rating').positive('Invalid Rating'),
        description: Yup.string().required('required'),
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
                                rating: '',
                                description: '',

                            }}
                            validationSchema={validate}
                        >
                            {formik => {
                                console.log(formik.values);
                                return (
                                    <div>
                                        <h1 className="my-4 font-weight-bold-display-4">Add User Review</h1>
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
                                            <TextFields label="User Rating 1 - 10" name="rating" type="number" />
                                            <TextFields label="Add User Review" name="description" type="text" />
                                            {/* <Field name="description">
                                                {({
                                                    field,// { name, value, onChange, onBlur }
                                                    form: { touched, errors, }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                    meta,
                                                }) => (

                                                    <Textarea
                                                        error={errors['description']}
                                                        label="Add User Review"
                                                        placeholder="Add a discription about user"
                                                        onChange={(v) => {
                                                            formik.setFieldValue('description',v)
                                                        }}
                                                    />
                                                )}
                                            </Field> */}

                                            <button className="add"
                                                onClick={() => {
                                                    addUserReview(formik.values)
                                                        .then(() => {
                                                            formik.resetForm()
                                                            window.alert('User Review Added Successfully')
                                                            navigate('/viewuserreview')
                                                        })
                                                        .catch((err) => {
                                                            window.alert('Failed to add User Review')
                                                        })
                                                }}
                                            >Add User Review</button>
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
