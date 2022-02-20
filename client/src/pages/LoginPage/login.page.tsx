import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Col, Label, Row } from 'reactstrap';
import axios from 'axios';

interface LoginProps {
    username?: string,
    password?: string
    touched?: ElementProps,
    errors?: ElementProps
}

interface ElementProps {
    username?: string,
    password?: string
}

const LoginPage = (props: LoginProps) => {
    const loginPageStyle = {
        margin: "32px auto 37px",
        maxWidth: "530px",
        background: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.15)"
    };
    const { touched, errors } = props;
    console.log(process.env);
    return (
        <React.Fragment>
            <div className="container">
                <div className="login-wrapper" style={loginPageStyle}>
                    <h2>Login Page</h2>
                    <Form className="form-container">
                        <Row>
                            <Col>
                                <div className="form-group">
                                    <Label htmlFor="username">username</Label>
                                    <Field type="text" name="username" className={"form-control"} placeholder="username" />
                                    {touched?.username && errors?.username && <span className="help-block text-danger">{errors?.username}</span>}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="form-group">
                                    <Label htmlFor="password">Password</Label>
                                    <Field type="password" name="password" className={"form-control"} placeholder="Password" />
                                    {touched?.password && errors?.password && <span className="help-block text-danger">{errors?.password}</span>}
                                </div>
                            </Col>
                        </Row>
                        <Row className='mt-2 text-center'>
                            <Col>
                                <Button type="submit" className="btn btn-primary">Login</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </React.Fragment>
    );
}

const LoginFormik = withFormik({
    mapPropsToValues: (props: LoginProps) => {
        return {
            username: props.username || '',
            password: props.password || ''
        }
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().required('username is required'),
        password: Yup.string().required('Password is required')
    }),
    handleSubmit: (values) => {
        const {REACT_APP_API_URL} = process.env;
        axios.post(`http://localhost:3000/api/login`,values)
        .then(data => console.log)
    }
})(LoginPage);

export default LoginFormik