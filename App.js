// 200 - success, 401 - token expire, 403 - bad request(expire otp), 409 - duplicate record, 500 - unknown error occured

const express = require('express')
const connectDB = require('./src/Mongoose/index')
// const createDOC = require('./src/Models/Student')
const web = require('./src/routes/index')
const cors = require('cors')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const app = express();
const DB_Url = process.env.DB_Url || "mongodb://localhost:27017";
const port = 3000;
 
connectDB(DB_Url);
// createDOC();

app.use(cors());   // froentend and backend run on different localhost, so making their origin same
app.use(bodyParser.json()) //req.body data is undefined, so getting json data in json format on backend
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/uploads"
}))

// Load routing
app.use('/',web);

app.listen(port,() => {
    console.log(`Server listen at ${port} port`);
});