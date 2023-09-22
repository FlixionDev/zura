const express = require("express");
const app = express();
const { connection } = require("./configs/db")
const cors = require("cors")
const { usersRouter } = require("./Routes/Users.routes")
const { projectRouter } = require("./Routes/Projects.routes")
const {isLoginCheck} =require("./middleware/isLogin.middleware")
const {podcastRouter} =require("./Routes/Podcast.routes")
app.use(express.json());
const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200,
 }
 
app.use(cors(corsOptions))
app.get("/", async (req, res) => {
    res.send("Welcome")
})
app.use("/register", usersRouter);
app.use(isLoginCheck)
app.use("/project", projectRouter);
app.use("/podcast",podcastRouter)

app.listen(process.env.port, async () => {
    console.log("Connecting to Database")
    try {
        await connection
        console.log("Connected to Database")
    } catch (err) {
        console.log(err);
        console.log("Failed to connect with Database")
    }
    console.log(`Server is running on port number ${process.env.port}`)
})