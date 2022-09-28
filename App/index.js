const express = require("express");
const mongoose = require("mongoose");
const app = express ();//servidor 

require("dotenv").config();
//conexión con tilde
const URI = process.env.APP_URI;
const port = process.env.PORT || 5000;

//config
app.set("port", port);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin.X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());

//Routes
app.use("/api/RayosCosmicos", require("./routes/RayosCosmicos.routes"));

//conexion
mongoose
.connect(URI)
.then((db) => console.log("Base de datos conectada"))
.catch((err) => console.error(err));

//Initialize the server
app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
});
