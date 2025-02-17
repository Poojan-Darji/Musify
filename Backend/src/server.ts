import express from "express";
import cors from "cors";
import "dotenv/config";
import songRouter from "./routes/songRoutes";
import connectDB from "./config/mongodb";
import connectCloudinary from "./config/cloudinary";
import albumRouter from "./routes/albumRoutes";

//app config
const app = express();
const port = process.env.PORT || 3000;
connectDB();
connectCloudinary();

//middelwares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);

app.listen(port, () => console.log(`server started on port ${port}`));
