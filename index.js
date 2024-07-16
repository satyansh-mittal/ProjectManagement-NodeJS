const express = require("express");
require('dotenv').config()
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const sequelize = require("./utils/database")
const adminRoutes = require('./routes/admin_route');
const userRoutes = require('./routes/user_route');
//require('./utils/associations');


const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());


sequelize.sync({ force: true }).then(() => {
    console.log("Sync ran successfully")
  }).catch((err) => {console.log(err)});


app.use('/api', adminRoutes);
app.use('/api', userRoutes);

app.use('/uploads', express.static('uploads'))


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
