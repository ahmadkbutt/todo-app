import bcrypt from "bcrypt-nodejs";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import passport from "passport";
import "../auth/passportHandler";
import { User } from "../models/user";
import { JWT_SECRET } from "../util/secrets";


export class UserController {

    public async registerUser(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;
        const isUserPresent = await User.findOne({ username });
        if (isUserPresent) {
            res.status(400).send({ message: 'user already exists' });
        }
        await User.create({
            username,
            password
        });
        const token = jwt.sign({ username, scope: req.body.scope }, JWT_SECRET);
        res.status(200).send({ token: token });
    }

    public async authenticateUser(req: Request, res: Response, next: NextFunction) {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(user){
            const isPasswordCorrect = (bcrypt.compareSync(password, user.password));
            if(isPasswordCorrect){
                const token = jwt.sign({ username, scope: req.body.scope }, JWT_SECRET);
                res.status(200).send({ token: token });
            } else res.status(401).send({message: "Invalid Credentials"})
        }
        res.status(400).send({message: 'Unauthorized'});
    }
}