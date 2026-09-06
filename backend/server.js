import "dotenv/config";
import express from "express";
import cors from 'cors';
import pool from "./query/pg.js";
import { findUser, createUser } from "./query/user-query.js";
import bcrypt from "bcrypt";
import { generateJWT, verifyJWT } from './jwt.js';
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(express.json());
app.use(cookieParser());
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

app.post("/login", async (req, res) => {
    let { email, password } = req.body;
    try {
        let response = await findUser(email);
        if (response.length > 0) {

            let user = response[0];
            let isPasswordMatch = await bcrypt.compare(password, user.password_hash);
            let payload = {
                email: user.email,
                id: user.id,
                role: user.role
            }

            if (isPasswordMatch) {
                const accessToken = generateJWT(payload, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXPIRE);
                const refreshToken = generateJWT(payload, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXPIRE);

                const expireDays = parseInt(process.env.REFRESH_TOKEN_EXPIRE, 10);
                const maxAgeInMilliseconds = expireDays * 1000;
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true, // Prevents JavaScript (XSS) from reading the cookie
                    secure: process.env.NODE_ENV === 'production', // Requires HTTPS in production
                    sameSite: 'lax', // Protects against Cross-Site Request Forgery (CSRF)
                    maxAge: maxAgeInMilliseconds, //always taken in milliseconds
                    path: "/refresh"
                });

                res.status(200).json({
                    accessToken: accessToken,
                    data: { email: user.email, id: user.id, role: user.role }
                });

            } else {
                res.status(400).json({ message: "Invalid email id or password." });
            }

        } else {
            res.status(400).json({ message: "User not found." });
            return;
        }
    } catch (err) {
        res.status(500).json({ message: "Error while finding user." })
        console.log('Error', err);
        return;
    }
})

app.post("/refresh", (req, res) => {
    if (req.cookies) {
        let refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
            let payload = verifyJWT(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            if (payload) {
                let newPayload = {
                    email: payload.email,
                    id: payload.id,
                    role: payload.role
                }
                let accessToken = generateJWT(newPayload, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXPIRE);
                let refreshToken = generateJWT(newPayload, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXPIRE);

                const expireDays = parseInt(process.env.REFRESH_TOKEN_EXPIRE, 10);
                const maxAgeInMilliseconds = expireDays * 1000;

                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true, // Prevents JavaScript (XSS) from reading the cookie
                    secure: process.env.NODE_ENV === 'production', // Requires HTTPS in production
                    sameSite: 'lax', // Protects against Cross-Site Request Forgery (CSRF)
                    maxAge: maxAgeInMilliseconds, //always taken in milliseconds
                    path: "/refresh"
                });

                res.status(200).json({
                    accessToken: accessToken,
                    data: { email: payload.email, id: payload.id, role: payload.role }
                });
            }
        } else {
            res.status(401).json({ message: "Invalid token" })
        }
    } else {
        res.status(400).json({ message: "Token not found" });
    }
})

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})