require("dotenv").config();
const express = require("express");
const controllers = require('./controllers');
const app = express();
const port = 3000

startApp = async () => {
    app.use(express.json());
    app.use("/user", controllers.userController);
    app.use("/gallery", controllers.galleryController);
    app.use("/journal", controllers.journalController);
    app.use(require("./middelware/validate-jwt"));
    app.listen(port, () => {
        console.log(`[Server]: App is listening on localhost:${port}.`);
    });
}

