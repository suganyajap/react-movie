import React, { useState } from 'react';
 import "./Login.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik } from "formik";
import { useHistory,Link } from 'react-router-dom';
import { ErrorMessage } from "./Utils.js"
import { API_URL } from "./global-constants"


function Login() {
    let history = useHistory();               
    let [error, setError] = useState(null)      

    //function to validate the input given by user
    const validateForm = (values) => {
        const errors = {};
        if (values.email.length < 3) {
            errors.email = "Please provide a valid email"
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid Email address";
        }
        if (values.password.length < 1) {
            errors.password = "Please provide a password"
        }
        else if (values.password.length < 6) {
            errors.password = "Invalid Password"
        }
        if (values.password.length > 18) {
            errors.password = "Password is too long!";
        }
        return errors;
    }

    //function to check credentials is on the database
    const onSubmit = async (values) => {
        await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: values.email,
                password: values.password
            })
        }).then(data => data.json())
            .then(data => {
                setError(data.message)
                if (data.message === "Success") {
                    localStorage.setItem('token', data.token);
                    return history.push('/MovieList')
                }

            })

    }

    //Form validation using Formik package
    const { handleBlur, handleChange, handleSubmit, values, touched, errors, isValid } = useFormik({
        initialValues: { email: '', password: '' },
        validate: validateForm,
        onSubmit
    });


    return (
        <div class="wrapper">
            
            <div class="text-center mt-4 name"> Login </div>
            <form onSubmit={handleSubmit}>
                <Box sx={{ '& .MuiTextField-root': { m: 1, width: '34ch', maxWidth: '90%' }, }}>
                    {error ? (<ErrorMessage>{error} </ErrorMessage>) : ""}
                    <div >
                        <TextField type="text" id="email" name="email" label="Email" variant="standard" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                        <ErrorMessage>{errors.email && touched.email && errors.email}</ErrorMessage>
                        <TextField type="password" id="password" name="password" label="Password" variant="standard" value={values.password} onChange={handleChange} onBlur={handleBlur} />
                        <ErrorMessage>{errors.password && touched.password && errors.password}</ErrorMessage>

                        <button type="submit" disabled={!isValid} class="btn mt-3" >Login</button>
                    </div>
                </Box>
            </form>
            <div class="text-center mt-2"> <Link to="/forgot-password">Forgot password?</Link></div>
            <div class="text-center mt-2"> <Link to="/sign-up">Sign Up </Link></div>
        </div>
    )
}

export default Login