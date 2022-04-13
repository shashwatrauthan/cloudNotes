import React, { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/alerts/AlertContext';


export default function LoginComp(props) {
    const context = useContext(alertContext);

    const [creds, setCreds] = useState({ username: "", password: "" });

    let navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

        // Api Call
        let url = `http://localhost:5000/api/auth/login`;
        let params = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(creds)
        }
        const response = await fetch(url, params);
        //   eslint-disable-next-line
        const json = await response.json();

        // Resolution
        if (json.success) {
            localStorage.setItem("authToken", json.authToken);
            await props.getUser();
            navigate("/");
            context.showAlert('success','Login Successful.');
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
            <h2 className='d-flex justify-content-center'>Login</h2>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" value={creds.username} onChange={onChange} placeholder="Username" minLength={4} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={creds.password} onChange={onChange} placeholder="Password" minLength={8} required />
            </Form.Group>
            <Button disabled={creds.username.length === 0 || creds.password.length === 0} variant="primary" type="submit">
                Login
            </Button>
        </Form>
    )
}
