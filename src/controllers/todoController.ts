
import { Request, Response } from "express";
import { ITodo, Todo } from "../models/todo";
import * as jwt from "jsonwebtoken";
import { ObjectId } from "bson";

export class TodoController {

    private getCurrentUser (req: Request) {
        const jwtToken = req.header('authorization').split(' ')[1];
        const user =  jwt.decode(jwtToken) as jwt.JwtPayload;
        return user.username;
    }

    public getTodos = async (req: Request, res: Response): Promise<void> => {
        const username = this.getCurrentUser(req);
        const todos = await Todo.find({username});
        res.send(todos);
    }

    public createTodo = async (req: Request, res: Response): Promise<void> => {
        const username = this.getCurrentUser(req);
        const newTodo: ITodo = new Todo({...req.body, status: false, username});
        const result = await newTodo.save();
        if(result){
            res.status(201).json({ status: 201, data: result, message: "A new todo is created" });
        }
    }

    public async updateTodo(req: Request, res: Response): Promise<void> {
        const {todo, status, id} = req.body;
        const isTodoUpdated = await Todo.findOneAndUpdate({ _id: new ObjectId(id) }, {todo, status});
        console.log(isTodoUpdated);
        if (isTodoUpdated ) {
            const updatedTodo = { todo, status, _id: id };
            res.json({ status: res.status, data: updatedTodo, message: "Todo updated successfully" });
        } else {
            res.sendStatus(404);
        }
    }

    public async deleteTodo(req: Request, res: Response): Promise<void> {
        const {id} = req.body;
        const todo = await Todo.findOneAndDelete({ _id: new ObjectId(id) });
        if (todo === null) {
            res.sendStatus(404);
        } else {
            res.json({ response: "Todo deleted successfully" });
        }
    }
}