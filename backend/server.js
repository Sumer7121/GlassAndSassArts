import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// App Config
const app = express()
const port = process.env.PORT || 4000

// middlewares
app.use(express.json())
const allowedOrigins = new Set([
    ...(process.env.CORS_ORIGINS || '').split(',').map((origin) => origin.trim()).filter(Boolean),
    process.env.FRONTEND_URL,
    process.env.ADMIN_URL,
    'http://localhost:5173',
    'http://localhost:5174'
].filter(Boolean))
app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.has(origin)) return callback(null, true)
        return callback(new Error('Origin is not allowed by CORS'))
    },
    allowedHeaders: ['Content-Type', 'token'],
    methods: ['GET', 'POST', 'OPTIONS']
}))

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.get('/healthz', (req, res) => {
    const databaseReady = mongoose.connection.readyState === 1
    res.status(databaseReady ? 200 : 503).json({ status: databaseReady ? 'ok' : 'not-ready' })
})

const start = async () => {
    await connectDB()
    await connectCloudinary()
    app.listen(port, '0.0.0.0', () => console.log('Server started on PORT : ' + port))
}

start().catch((error) => {
    console.error('API startup failed:', error.message)
    process.exit(1)
})
