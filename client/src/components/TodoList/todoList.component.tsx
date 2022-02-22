import {  useState } from "react";
import { Button, CardHeader, Col, Container, Input, ListGroup, ListGroupItem, Row } from "reactstrap"
import AddTodo from "../AddTodo/addTodo.component";
import axios, { AxiosPromise, AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import { RefetchOptions } from "axios-hooks";

interface ITodo {
    todo: string,
    status: boolean,
    _id: string
}

interface ITodoListProps {
    todos: ITodo[],
    refetch: (config?: AxiosRequestConfig<any> | undefined, options?: RefetchOptions | undefined) => AxiosPromise<any>
}

const TodoList = (props: ITodoListProps) => {
    const [isModalOpen, toggleModal] = useState(false);
    const addTodoProps = {
        isModalOpen,
        toggleModal,
        refetch: props.refetch
    }
    const handleDeleteProp = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const element = event.target as HTMLElement;
        const { REACT_APP_API_URL } = process.env;
        const bearerToken = localStorage.getItem('bearerToken');
        axios.delete(`${REACT_APP_API_URL}/todos`, {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            },
            data: {
                id: element.id
            }
        })
            .then(res => {
                if (res?.data) {
                    toast(res.data.response);
                    props.refetch();
                }
            });
    }

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const element = event.target as HTMLElement;
        const { REACT_APP_API_URL } = process.env;
        const todo = JSON.parse(element.id);
        const bearerToken = localStorage.getItem('bearerToken');
        axios.put(`${REACT_APP_API_URL}/todos`,{
            id: todo['_id'],
            status: event.target.checked,
            todo: todo['todo']
        }, {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        })
            .then(res => {
                if (res?.data) {
                    toast(res.data.message);
                    props.refetch();
                }
            });
    }
    const todoList = props.todos.map((todo, i) => {
        return <ListGroupItem color="info" key={todo['_id']}>
            <Row>
                <Col md={1}>
                    <Input type='checkbox' id={JSON.stringify(todo)} onChange={(e) => handleChange(e)} checked={todo?.status || false}/>
                </Col>
                <Col md={10}>
                    <div style={{textDecoration: todo.status ? 'line-through' : ''}}>{todo.todo}</div>
                </Col>
                <Col md={1}>
                    <Button id={todo['_id']} onClick={(e) => handleDeleteProp(e)}>x</Button>
                </Col>
            </Row>
        </ListGroupItem>
    })
    return <Container>
        <CardHeader>
            <Row>
                <Col md={11}>
                    <h2>Todos</h2>
                </Col>
                <Col md={1}>
                    <Button onClick={() => toggleModal(true)}>+</Button>
                    <AddTodo {...addTodoProps}/>
                </Col>
            </Row>
        </CardHeader>
        <ListGroup>
            {todoList}
        </ListGroup>
    </Container>
}

export default TodoList