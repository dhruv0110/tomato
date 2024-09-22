import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRoute from "./routes/userRoute.js";
import "dotenv/config"
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import authMiddleware from "./middleware/auth.js";
import userModel from "./models/userModel.js";



// app config
const app = express()
const port = 4000;

// middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();


// api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRoute)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("API Working!")
})

app.get("/get-user",authMiddleware,async(req,res)=>{
    const{user} = req.user;

    const isuser = await userModel.findOne({_id:user._id});

    if(!isuser){
        return res.sendStatus(401);
    }
    return res.json({
        user : {name : isuser.name,email:isuser.email,"_id":isuser._id},
        message : "",
    })
})


app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})