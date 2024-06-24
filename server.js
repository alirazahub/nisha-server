import express from 'express'
import connectDB from './config/db.js'
import cors from 'cors'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import user from './routes/user.js'
import product from './routes/product.js'

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors())
dotenv.config()
connectDB();
app.use(cookieParser());
app.use(express.json())
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

//  backend api routes
app.get('/api', (req, res) => {
  res.send('Welcome to Backend')
})
app.use('/api', user)
app.use('/api/product', product)



const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running on port ${PORT}`))