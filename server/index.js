const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

dotenv.config();

// Server Setup
const app = express();
const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log(`Server started on Port: ${PORT}`));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
}));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// MongoDB connect
mongoose.connect(process.env.MDB_CONNECT,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
    }, 
    (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
});

// Router Setup
app.use("/auth", require("./routers/userRouter"));  
app.use("/api/files", require("./routers/filesRouter"));  
app.use("/files", require("./routers/showRouter"));  
app.use("/list", require("./routers/listRouter"));   
app.use("/team", require("./routers/teamRouter"));   