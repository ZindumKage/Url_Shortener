import express from 'express';
import cors from "cors";
import urlRoutes from "./routes/urlRoutes.js"
import { connectRedis } from './utils/redisCache.js';
import sequelize from './config/db.js';


const app = express(); 


app.use(express.json());
app.use(cors());

app.use("/api", urlRoutes);


await connectRedis();
try {
    await sequelize.authenticate();
    console.log("Database Connected");

    await sequelize.sync();
} catch (err) {
    console.error("DB error:", err)
}





export default app;