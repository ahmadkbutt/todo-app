import { Document, Schema, Model, model, Error } from "mongoose";

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



export const Product: Model<ITodo> = model<ITodo>("Todo", todoSchema);