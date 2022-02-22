import axios, { AxiosPromise, AxiosRequestConfig } from "axios";
import { RefetchOptions } from "axios-hooks";
import { Field, withFormik, Form } from "formik";
import { toast } from "react-toastify";
import { Button, Modal, ModalHeader, ModalBody, Col, Label, Row } from "reactstrap"
import * as Yup from 'yup';


interface AddTodoProps {
    todo?: string
    touched?: ElementProps,
    errors?: ElementProps,
    isModalOpen: boolean,
    toggleModal: (value: boolean | ((prevVar: boolean) => boolean)) => void,
    refetch: (config?: AxiosRequestConfig<any> | undefined, options?: RefetchOptions | undefined) => AxiosPromise<any>
}


interface ElementProps {
    todo: string
}

const AddTodo = (props: AddTodoProps) => {
    const { touched, errors, isModalOpen, toggleModal } = props;
    return (
        <div>
            <Modal isOpen={isModalOpen}>
                <ModalHeader >
                    <Row>
                        <Col md={10}>
                            Add Todo
                        </Col>
                        <Col md={2}>
                            <Button outline onClick={() => toggleModal(false)} size="sm">
                                x
                            </Button>
                        </Col>
                    </Row>
                </ModalHeader>
                <ModalBody>
                    <Form className="form-container">
                        <Row>
                            <Col>
                                <div className="form-group">
                                    <Label htmlFor="todo">Todo Description</Label>
                                    <Field type="text" name="todo" className={"form-control"} placeholder="todo" />
                                    {touched?.todo && errors?.todo && <span className="help-block text-danger">{errors?.todo}</span>}
                                </div>
                            </Col>
                        </Row>
                        <Row className='mt-2 d-inline-block'>
                            <Col>
                                <Button type="submit" className="btn btn-primary">Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

const AddTodoFormik = withFormik({
    mapPropsToValues: (props: AddTodoProps) => {
        return {
            todo: props.todo || ''
        }
    },
    validationSchema: Yup.object().shape({
        todo: Yup.string().required('TODO description is required'),
    }),
    handleSubmit: (values, {props}) => {
        const { REACT_APP_API_URL } = process.env;
        const bearerToken = localStorage.getItem('bearerToken');
        axios.post(`${REACT_APP_API_URL}/todos`, values, {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        })
            .then(res => {
                if (res?.data) {
                    toast(res.data.message);
                    props.toggleModal(false);
                    props.refetch();
                }
            });
    }
})(AddTodo);

export default AddTodoFormik;