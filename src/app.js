import express from "express"
import cors from "cors"


const app = express()

app.use(express.json())

app.use(cors({
    origin:process.env.CROSS_ORIGIN || "http://localhost:3000",
    methods:["GET","POST","PUT","DELETE","PATCH"],
    credentials:true,
    allowedHeaders:["Content-Type","Authorization"]
}))

app.listen(process.env.PORT || 3000 ,()=>{
    console.log(`The express running the port ${process.env.PORT || 3000}`)
})

export default app;