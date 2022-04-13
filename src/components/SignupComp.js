import React, { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/alerts/AlertContext';



export default function SignupComp(props) {
    const context = useContext(alertContext);


    const [creds, setCreds] = useState({ name: "", username: "", password: "", cpassword: "" });
    const { name, username, password, cpassword } = creds;

    let navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

        if (password !== cpassword) {
            context.showAlert('warning',"Password & Confirm Password should be same");
            return;
        }

        // Api Call
        let url = `https://cloud-notes-backend1.vercel.app/api/auth/createuser`;
        let params = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ name, username, password })
        }
        const response = await fetch(url, params);
        //   eslint-disable-next-line
        const json = await response.json();

        // Resolution
        if (json.success) {
            localStorage.setItem("authToken", json.authToken);
            await props.getUser();
            navigate("/");
            context.showAlert('success','Signup Successful.');
        }
        else {
            context.showAlert('danger',json.error);

        }

    }

    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
    }

    return (
        <Form className='container mt-2' style={{ width: "32rem" }} onSubmit={onSubmit}>
            <h2 className='d-flex justify-content-center'>Signup</h2>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={creds.name} onChange={onChange} placeholder="Name" minLength={4} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" value={creds.username} onChange={onChange} placeholder="Username" minLength={4} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={creds.password} onChange={onChange} placeholder="Password" minLength={8} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" name="cpassword" value={creds.cpassword} onChange={onChange} placeholder="Confirm Password" minLength={8} required />
            </Form.Group>
            <Button disabled={creds.name.length === 0 || creds.username.length === 0 || creds.password.length === 0 || creds.cpassword.length === 0} variant="primary" type="submit">
                Signup
            </Button>
        </Form>
    )
}
