import { Router } from "express";
import { TodoController } from "../controllers/todoController";
import { AuthController } from "../controllers/authController";


export class TodoRoutes {

    public router: Router;
    public todoController: TodoController = new TodoController();
    public authController: AuthController = new AuthController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get("/",this.authController.authenticateJWT, this.todoController.getTodos);
        this.router.post("/", this.authController.authenticateJWT, this.todoController.createTodo);
        this.router.put("/", this.authController.authenticateJWT, this.todoController.updateTodo);
        this.router.delete("/", this.authController.authenticateJWT, this.todoController.deleteTodo);
    }
}