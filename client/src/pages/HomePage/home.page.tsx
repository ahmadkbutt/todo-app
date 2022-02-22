import useAxios from "axios-hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";
import TodoList from "../../components/TodoList/todoList.component";


const HomePage = () => {
    const {REACT_APP_API_URL} = process.env;
    const bearerToken = localStorage.getItem('bearerToken');
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!bearerToken){
            navigate('/login');
        }
    })
    const [{ data: todos, loading, error }, refetch] = useAxios({url: `${REACT_APP_API_URL}/todos`, method: 'GET', headers: {
        Authorization: `bearer ${bearerToken}`
    }});
    const todoListProps = {
        refetch,
        todos
    }
    if (loading) return <Spinner/>
    if (error) return <p>Error!</p>
    return <TodoList {...todoListProps}/>
}

export default HomePage;