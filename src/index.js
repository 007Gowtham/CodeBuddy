import app from './app.js'
import dotenv from "dotenv"
import connectDB from './db/index.js'

dotenv.config({
    path:'./.env'
})

connectDB()
.then(db=>console.log("Database is running"))
.catch(err=>{
    console.log("Database failed to connect")
    process.exit(1)
})

