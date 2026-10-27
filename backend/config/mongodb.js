import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected',() => {
        console.log("DB Connected");
    })

    const uri = process.env.MONGODB_URI
    if (!uri) {
        throw new Error('MONGODB_URI must be configured before the API can start.')
    }

    await mongoose.connect(uri, {
        dbName: process.env.MONGODB_DB_NAME || 'e-commerce'
    })

}

export default connectDB;
