import express from "express"
import cors from "cors"
import roomRouter from "./routes/roomRoute.js";
import teamRouter from "./routes/teamRoute.js";
import playerRouter from "./routes/playerRouter.js";
import roomTopicRouter from "./routes/roomTopicRouter.js";
import questionRouter from "./routes/questionRoute.js";

const app = express()
app.use(cors({
  origin: "http://localhost:3000", 
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true, 
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json())

app.use('/rooms',roomRouter);
app.use('/teams',teamRouter);
app.use('/players',playerRouter);
app.use('/topics',roomTopicRouter);
app.use('/questions',questionRouter);

app.get('/',(req,res)=>{
    res.json("Hello")
})


app.listen(process.env.PORT || 3000 ,()=>{
    console.log(`The express running the port ${process.env.PORT || 3000}`)
})

export default app;