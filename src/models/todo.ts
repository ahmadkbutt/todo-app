import { Document, Schema, Model, model } from "mongoose";

export interface ITodo extends Document {
    todo: String,
    username: String,
    status: Boolean
}

export const todoSchema = new Schema({
    todo: String,
    username: String,
    status: Boolean
});



export const Todo: Model<ITodo> = model<ITodo>("Todo", todoSchema);