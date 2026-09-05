// import crypto from 'crypto';

// let token = crypto.randomBytes(30).toString("hex");

// console.log(token);

import bcrypt from "bcrypt";

bcrypt.hash('admin123', 10).then(hash => console.log(hash));