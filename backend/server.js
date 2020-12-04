const express = require("express");
const app = express();
const mongoose =require("mongoose");
const dotenv = require("dotenv");
const UserRoute = require("./routes/UserRoute");
dotenv.config();
//DB CONNECT
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`mongodb connected:${conn.connection.host}`);
  } catch (error) {
    console.error(`Errır:${error.message}`);
    process.exit(1);
  }
};
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
app.use(express.json());
app.use("/api/users", UserRoute);
