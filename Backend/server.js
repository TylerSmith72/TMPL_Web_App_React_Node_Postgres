import https from "https";
import fs from "fs";
import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

// Load SSL/TLS certificates
// const sslOptions = {
//     key: fs.readFileSync("HTTPS/server.key"), // Path to private key
//     cert: fs.readFileSync("HTTPS/server.cert"), // Path to certificate
// };

app.use(express.json());
app.use(cors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization'],
}));

// app.use(function (req, res, next) {

//     const allowedOrigin = 'https://localhost:3000'; 
//     const origin = req.headers.origin;

//     console.log("Request Origin: " + origin);
//     // Check if the origin is allowed

//     if(origin !== allowedOrigin){
//         return res.status(403).json({
//             error: 'CORS policy violation: Origin not allowed'
//         });
//     }
//     res.setHeader('Access-Control-Allow-Origin', allowedOrigin)
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
//     res.setHeader('Access-Control-Allow-Credentials', true);
    
//     next();
// });

// ----- Routes ----- //
app.get('/', (req, res) => {
    res.send('Nothing to see here');
});
app.use("/auth", AuthRouter);


app.use((req, res) => {
    console.log(`Bad Request on route: ${req.originalUrl}`);
    res.status(400).send("Bad Request. Route not found");
});

app.listen(port, () => {
    console.log(`Backend server started on port ${port}`);
});

// https.createServer(sslOptions, app).listen(port, () => {
//     console.log(`Backend server started on https://localhost:${port}`);
// });