const express = require("express");
const userRoute = require("./routes/userRoute");
const todoRoute = require("./routes/todoRoute");

const errorMiddleware = require("./middlewares/error");
const notFoundMiddleWare = require("./middlewares/notfound");

const app = express();

const port = 8003;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// REST API: handle resource Todos
// CREATE, UPDATE, DELETE, GETALL, GETBYID
app.use("/todos", todoRoute);

// REST API: handle resource Users
// CREATE, UPDATE
app.use("/users", userRoute);

app.use(notFoundMiddleWare);
app.use(errorMiddleware);

app.listen(port, () => console.log(`server running on port: ${port}`));
