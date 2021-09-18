require("dotenv").config();
const express = require("express");
const app = express();
const dbConnection = require('./db');

app.use(express.json());
app.use(require("./middleware/validate-jwt"));
app.use(require('./middleware/headers'))

const controllers = require('./controllers');

    app.use("/user", controllers.userController);
    app.use("/gallery", controllers.galleryController);
    app.use("/journal", controllers.journalController);

    
    dbConnection
    .authenticate()
        .then(() => dbConnection.sync())
        .then(() => {
          app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on ${process.env.PORT}`);
          });
        })
    .catch((err) => {
          console.log(`[Server]: Server crashed.Error = ${err}`);
        });
    