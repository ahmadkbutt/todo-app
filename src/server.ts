import express from "express";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";
import { MONGODB_URI, BASE_URL, PORT } from "./util/secrets";
import { UserRoutes } from "./routes/userRoutes";
import {TodoRoutes} from "./routes/todoRoutes";

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.mongo();
    }

    public routes(): void {
        this.app.use("/api/user", new UserRoutes().router);
        this.app.use("/api/todos", new TodoRoutes().router);
    }

    public config(): void {
        this.app.set("port", PORT || 3000);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(compression());
        this.app.use(cors());
    }

    private mongo() {
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("Mongo Connection Established");
        });
        connection.on("reconnected", () => {
            console.log("Mongo Connection Reestablished");
        });
        connection.on("disconnected", () => {
            console.log("Mongo Connection Disconnected");
            console.log("Trying to reconnect to Mongo ...");
            setTimeout(() => {
                mongoose.connect(MONGODB_URI, {
                    keepAlive: true,
                    socketTimeoutMS: 3000,
                    connectTimeoutMS: 3000,
                });
            }, 3000);
        });
        connection.on("close", () => {
            console.log("Mongo Connection Closed");
        });
        connection.on("error", (error: Error) => {
            console.log("Mongo Connection ERROR: " + error);
        });

        const run = async () => {
            await mongoose.connect(MONGODB_URI, {
                keepAlive: true,
            });
        };
        run().catch((error) => console.error(error));
    }

    public start(): void {
        const port = this.app.get("port");
        this.app.listen(port, () => {
            console.log(
                `API is running at ${BASE_URL}:${port}`
            );
        });
    }
}

const server = new Server();

server.start();
