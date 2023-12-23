import express from 'express';
import ConnectToDB from './db/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import dotenv from 'dotenv';


const app = express()
dotenv.config()
ConnectToDB()
app.use(express.json())


app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)


const port = process.env.PORT || 5000;


app.listen(port,()=> {
    console.log(`server is running on port ${port}`);
})