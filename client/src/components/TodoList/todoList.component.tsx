import { CardHeader, Col, Container, Input, ListGroup, ListGroupItem, Row } from "reactstrap"

interface ITodo {
    todo: string,
    status: boolean
}

interface ITodoListProps {
    todos: ITodo[]
}

const TodoList = (props: ITodoListProps) => {
    const todoList = props.todos.map((todo) => {
        return <ListGroupItem color="info">
            <Row>
                <Col>
                    <Input type='checkbox' />
                </Col>
                <Col>
                    <div>{todo.todo}</div>
                </Col>
            </Row>
        </ListGroupItem>
    })
    return <Container className="bg-light border">
        <CardHeader>Card title</CardHeader>
        <ListGroup>
            {todoList}
        </ListGroup>
    </Container>
}

export default TodoList