import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import exp from 'constants';
import connectDB from './config/mdb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';



// App configuartion
const app = express();
const port = process.env.PORT || 3588;
connectDB();
connectCloudinary

//Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints 

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)

app.get('/', (req, res) => {
    res.status(200).send('Ellam ok alle boss')
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
