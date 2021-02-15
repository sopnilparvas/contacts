const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.json());

app.use("/api/contacts", require("./routes/contactsRouter"));
app.use("/api/users", require("./routes/usersRouter"));
app.use("/api/auth", require("./routes/authRouter"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
