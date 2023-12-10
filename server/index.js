const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payment");

require("dotenv").config();

const { dbConnection } = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 4000;

dbConnection();
cloudinaryConnect();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        // origin: "http://localhost:3000",
        origin: "*",
        credentials: true,
    })
)

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running"
    })
})

app.listen(PORT, () => {
    console.log("App is runnig...")
})