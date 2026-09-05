import "dotenv/config";
import express from "express";
import cors from 'cors';
import pool from "./query/pg.js";
import { findUser, createUser } from "./query/user-query.js";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }))
app.use(express.json());
const port = 8000;

app.get('/', async (req, res) => {
    res.end("Hello");
})

app.post("/signup", async (req, res) => {
    let {
        name,
        email,
        password_hash,
        phone,
        address,
        role
    } = req.body;

    try {
        let response = await findUser(email);
        if (response.length > 0) {

        } else {
            try {
                let response = await createUser({
                    name,
                    email,
                    password_hash,
                    phone,
                    address,
                    role
                });

                if (response) {
                    console.log('user created', response);
                    res.status(201).json({ data: response });
                    return;
                }
            } catch (error) {
                res.status(500).json({ message: "Internal server error while creating user" });
                console.log("Error", error);
                return;
            }
        }
    } catch (error) {

    }
    res.end("hello")
})
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})